import type { SVGProps } from "react";

type VesoLogoProps = SVGProps<SVGSVGElement> & {
  size?: number | string;
};

/**
 * Veso Books brand mark.
 * The geometry and fills below are the official logo and must not be
 * recolored or redrawn. Only sizing (size/className) may be adjusted.
 */
export function VesoLogo({ size = 32, ...props }: VesoLogoProps) {
  return (
    <svg
      viewBox="0 0 300 300"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      {/* 1. Left Purple Chevron (V) */}
      <path d="M 40,40 L 142,40 L 142,260 L 40,260 L 142,150 Z" fill="#5835ea" />

      {/* 2. Dual Navy Fold Triangles (Symmetrical) */}
      <polygon points="142,40 216,95 142,150" fill="#002b8a" />
      <polygon points="142,150 216,205 142,260" fill="#002b8a" />

      {/* 3. Dual Mint Lobes (B) with True Circular Arcs */}
      {/* Upper Lobe */}
      <path
        d="M 142,40 L 205,40 A 55 55 0 0 1 205,150 L 142,150 L 216,95 Z"
        fill="#00dc96"
      />

      {/* Lower Lobe */}
      <path
        d="M 142,150 L 205,150 A 55 55 0 0 1 205,260 L 142,260 L 216,205 Z"
        fill="#00dc96"
      />
    </svg>
  );
}
