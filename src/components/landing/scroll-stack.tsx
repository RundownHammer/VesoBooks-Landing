"use client";

import React, {
  useLayoutEffect,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// ---------------------------------------------------------------------------
// ScrollStackItem
// ---------------------------------------------------------------------------
export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
  id?: string;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = "",
  id,
}) => (
  <div
    id={id}
    className={cn(
      "scroll-stack-card relative w-full my-0 p-0 sm:p-6 md:p-8 lg:p-10 rounded-[18px] sm:rounded-[24px] md:rounded-[28px] box-border overflow-hidden bg-white border border-black/[0.08] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.06),0_24px_64px_-12px_rgba(0,18,60,0.08)]",
      itemClassName
    )}
  >
    {children}
  </div>
);

// ---------------------------------------------------------------------------
// ScrollStack — position:sticky for zero-lag pinning, GPU scale for stacking
// ---------------------------------------------------------------------------
// ponytail: translateY-based pinning causes 1-frame compositor desync (shake).
// position:sticky is compositor-driven, zero-lag.
// Stacking behavior:
// 1. Approaching cards start slightly bigger (entryScale e.g. 1.04).
// 2. As they reach stack pinning point, they contract to 1.00 (normal full page width).
// 3. Pinned cards pushed behind by subsequent cards scale down smoothly (behindScaleStep).
// 4. The last card lands cleanly at 1.00 and does NOT shrink, releasing gracefully.
// Works identically on desktop and mobile — no mobile exclusions or disablement.

export interface ScrollStackRef {
  scrollToIndex: (index: number) => void;
}

export interface ScrollStackProps {
  className?: string;
  innerClassName?: string;
  children: ReactNode;
  itemDistance?: number;
  entryScale?: number;
  behindScaleStep?: number;
  approachDistance?: number;
  itemStackDistance?: number;
  stackPosition?: string | number;
  endPadding?: string | number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
  onActiveIndexChange?: (index: number) => void;
  // Legacy / compatibility props
  itemScale?: number;
  baseScale?: number;
  scaleEndPosition?: string;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
}

export const ScrollStack = forwardRef<ScrollStackRef, ScrollStackProps>(
  (
    {
      children,
      className = "",
      innerClassName = "",
      itemDistance = 180,
      entryScale = 1.04,
      behindScaleStep = 0.035,
      approachDistance = 280,
      itemStackDistance = 5,
      stackPosition = "176px",
      endPadding = "0px",
      onStackComplete,
      onActiveIndexChange,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLElement[]>([]);
    const naturalTopsRef = useRef<number[]>([]);
    const rafIdRef = useRef<number | null>(null);
    const lastKeyRef = useRef<Map<number, string>>(new Map());
    const lastActiveRef = useRef<number>(-1);
    const stackDoneRef = useRef<boolean>(false);

    const parsePx = useCallback(
      (value: string | number, vh: number): number => {
        if (typeof value === "number") return value;
        if (value.endsWith("%")) return (parseFloat(value) / 100) * vh;
        return parseFloat(value);
      },
      []
    );

    // Measure natural document-flow top of each card.
    // MUST be called when cards do NOT have position:sticky,
    // so getBoundingClientRect returns true unconstrained flow coordinate.
    const measureNaturalTops = useCallback(() => {
      const cards = cardsRef.current;
      if (!cards.length) return;
      const sy = window.scrollY;
      naturalTopsRef.current = cards.map(
        (c) => c.getBoundingClientRect().top + sy
      );
    }, []);

    // Apply sticky styles — call AFTER measuring natural tops.
    const applyStickyStyles = useCallback(() => {
      const vh = window.innerHeight;
      const stackPx = parsePx(stackPosition, vh);
      cardsRef.current.forEach((card, i) => {
        card.style.position = "sticky";
        card.style.top = (stackPx + i * itemStackDistance) + "px";
      });
    }, [itemStackDistance, parsePx, stackPosition]);

    // Remove sticky so we can re-measure natural flow positions.
    const removeStickyStyles = useCallback(() => {
      cardsRef.current.forEach((card) => {
        card.style.position = "";
        card.style.top = "";
      });
    }, []);

    // Precise scale calculation:
    // - Approaching: entryScale (1.04) -> 1.00 at pinStart
    // - Landed: 1.00 (exact normal width of page)
    // - Behind in stack: scales down smoothly by behindScaleStep for each card on top
    // - Last card: lands at 1.00 and stays at 1.00 (no cards behind it)
    const applyScales = useCallback(() => {
      const cards = cardsRef.current;
      const tops = naturalTopsRef.current;
      const n = cards.length;
      if (!n || tops.length !== n) return;

      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const stackPx = parsePx(stackPosition, vh);

      const pinStarts: number[] = [];
      for (let i = 0; i < n; i++) {
        const stickyTop = stackPx + i * itemStackDistance;
        pinStarts.push(tops[i] - stickyTop);
      }

      let activeIdx = 0;
      for (let i = 0; i < n; i++) {
        if (scrollY >= pinStarts[i] - 12) {
          activeIdx = i;
        }
      }

      // Exit translation: when all cards have arrived at the stack,
      // hold for holdThreshold pixels, then translate ALL cards up together in 100% sync
      const lastPinStart = pinStarts[n - 1];
      const holdThreshold = 180;
      const exitStart = lastPinStart + holdThreshold;
      const exitTranslateY = scrollY > exitStart ? Math.round(scrollY - exitStart) : 0;

      cards.forEach((card, i) => {
        const pinStart_i = pinStarts[i];
        let scale: number;

        if (scrollY < pinStart_i) {
          // Approaching stack: smoothly contract from entryScale down to 1.00
          const dist = pinStart_i - scrollY;
          if (dist >= approachDistance) {
            scale = entryScale;
          } else {
            const p = 1 - dist / approachDistance;
            scale = entryScale - p * (entryScale - 1.0);
          }
        } else {
          // Landed at or in the stack
          if (i === n - 1) {
            // Last card stays at 1.00 (normal full page width)
            scale = 1.0;
          } else {
            // Pushed behind by subsequent cards arriving
            let behindReduction = 0;
            for (let k = i + 1; k < n; k++) {
              const prevPin = k === i + 1 ? pinStart_i : pinStarts[k - 1];
              const curPin = pinStarts[k];
              const span = Math.max(curPin - prevPin, 1);
              if (scrollY >= curPin) {
                behindReduction += behindScaleStep;
              } else if (scrollY > prevPin) {
                const fraction = (scrollY - prevPin) / span;
                behindReduction += fraction * behindScaleStep;
              }
            }
            scale = 1.0 - behindReduction;
          }
        }

        const sc = Math.round(scale * 10000) / 10000;
        const key = `${sc}_${exitTranslateY}`;
        if (lastKeyRef.current.get(i) !== key) {
          lastKeyRef.current.set(i, key);
          card.style.transform =
            exitTranslateY > 0
              ? `translate3d(0, -${exitTranslateY}px, 0) scale(${sc})`
              : `scale(${sc})`;
        }
      });

      if (activeIdx !== lastActiveRef.current) {
        lastActiveRef.current = activeIdx;
        onActiveIndexChange?.(activeIdx);
      }

      // Stack-complete callback
      if (n > 0 && onStackComplete) {
        const lastPinStart = pinStarts[n - 1];
        const done = scrollY >= lastPinStart;
        if (done && !stackDoneRef.current) {
          stackDoneRef.current = true;
          onStackComplete();
        } else if (!done && stackDoneRef.current) {
          stackDoneRef.current = false;
        }
      }
    }, [
      approachDistance,
      behindScaleStep,
      entryScale,
      itemStackDistance,
      onActiveIndexChange,
      onStackComplete,
      parsePx,
      stackPosition,
    ]);

    const onScroll = useCallback(() => {
      if (rafIdRef.current !== null) return;
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        applyScales();
      });
    }, [applyScales]);

    useImperativeHandle(
      ref,
      () => ({
        scrollToIndex: (index: number) => {
          const tops = naturalTopsRef.current;
          if (tops[index] === undefined) return;
          const vh = window.innerHeight;
          const stickyTop = parsePx(stackPosition, vh) + itemStackDistance * index;
          window.scrollTo({ top: tops[index] - stickyTop + 2 });
        },
      }),
      [itemStackDistance, parsePx, stackPosition]
    );

    // Mount setup
    useIsomorphicLayoutEffect(() => {
      if (typeof window === "undefined" || window.innerWidth < 768) return;
      const root = containerRef.current;
      if (!root) return;

      const cards = Array.from(
        root.querySelectorAll(".scroll-stack-card")
      ) as HTMLElement[];
      cardsRef.current = cards;
      lastKeyRef.current.clear();

      // 1. Initial styles (without sticky, so flow positions can be measured)
      cards.forEach((card, i) => {
        card.style.position = "";
        card.style.top = "";
        card.style.marginBottom = i < cards.length - 1 ? itemDistance + "px" : "0";
        card.style.transformOrigin = "top center";
        card.style.willChange = "transform";
        card.style.zIndex = String(i + 1);
        card.style.transform = `scale(${entryScale})`;
      });

      // 2. Measure natural tops BEFORE setting sticky
      measureNaturalTops();

      // 3. Apply sticky positioning
      applyStickyStyles();

      // 4. Initial scale application
      applyScales();

      // 5. Native scroll listener
      window.addEventListener("scroll", onScroll, { passive: true });

      return () => {
        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
        window.removeEventListener("scroll", onScroll);
        cardsRef.current = [];
        lastKeyRef.current.clear();
        stackDoneRef.current = false;
        lastActiveRef.current = -1;
      };
    }, [
      itemDistance,
      entryScale,
      measureNaturalTops,
      applyStickyStyles,
      applyScales,
      onScroll,
    ]);

    // Window resize: un-sticky -> rAF -> re-measure -> re-sticky -> re-scale
    useIsomorphicLayoutEffect(() => {
      if (typeof window === "undefined") return;

      const onResize = () => {
        if (window.innerWidth < 768) {
          removeStickyStyles();
          cardsRef.current.forEach((c) => {
            c.style.transform = "none";
            c.style.position = "";
            c.style.top = "";
          });
          return;
        }
        lastKeyRef.current.clear();
        removeStickyStyles();
        cardsRef.current.forEach((c) => {
          c.style.transform = "scale(1)";
        });
        requestAnimationFrame(() => {
          measureNaturalTops();
          applyStickyStyles();
          applyScales();
        });
      };

      window.addEventListener("resize", onResize, { passive: true });
      return () => window.removeEventListener("resize", onResize);
    }, [measureNaturalTops, applyStickyStyles, removeStickyStyles, applyScales]);

    const formattedEndPadding =
      typeof endPadding === "number" ? `${endPadding}px` : endPadding;

    return (
      <div className={cn("relative w-full", className)} ref={containerRef}>
        <div className={cn("scroll-stack-inner", innerClassName)}>
          {children}
          {formattedEndPadding && formattedEndPadding !== "0px" && (
            <div
              className="scroll-stack-end-spacer w-full pointer-events-none select-none"
              style={{ height: formattedEndPadding }}
              aria-hidden="true"
            />
          )}
        </div>
      </div>
    );
  }
);

ScrollStack.displayName = "ScrollStack";
export default ScrollStack;
