import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-150 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive select-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border border-transparent shadow-sm hover:bg-primary-hover",
        primary:
          "bg-primary text-primary-foreground border border-transparent shadow-sm hover:bg-primary-hover",
        destructive:
          "bg-destructive text-destructive-foreground border border-transparent shadow-sm hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "border border-border bg-card hover:bg-muted text-foreground shadow-sm",
        secondary:
          "bg-secondary text-secondary-foreground border border-border/60 hover:bg-muted shadow-sm",
        ghost:
          "hover:bg-muted text-foreground",
        link: "text-primary underline-offset-4 hover:underline p-0 h-auto shadow-none",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3 text-sm font-medium",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5 text-xs font-medium",
        lg: "h-10 px-5 py-2.5 has-[>svg]:px-4 text-sm font-semibold",
        icon: "size-9 rounded-md",
        "icon-sm": "size-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  if (asChild) {
    return (
      <Slot
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </Slot>
    )
  }

  return (
    <button
      data-slot="button"
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {loading && <Loader2 className="animate-spin size-4" />}
      {children}
    </button>
  )
}

export { Button, buttonVariants }
