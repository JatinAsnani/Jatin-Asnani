import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  
  // Basic hand-coded variant system to avoid installing class-variance-authority if not strictly needed
  let baseClass = "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
  
  let variantClass = ""
  if (variant === "default" || !variant) {
    variantClass = "bg-[#EA7B7B] text-white hover:bg-[#D25353] glow-primary"
  } else if (variant === "outline") {
    variantClass = "border border-[#EA7B7B]/30 bg-transparent hover:bg-[#EA7B7B]/10 text-white"
  } else if (variant === "ghost") {
    variantClass = "hover:bg-white/10 hover:text-white text-white/70"
  } else if (variant === "secondary") {
    variantClass = "bg-white/10 text-white hover:bg-white/20"
  }

  let sizeClass = ""
  if (size === "default" || !size) sizeClass = "h-11 px-6 py-2"
  if (size === "sm") sizeClass = "h-9 rounded-md px-3"
  if (size === "lg") sizeClass = "h-14 rounded-2xl px-8 text-lg"
  if (size === "icon") sizeClass = "h-10 w-10"

  return (
    <Comp
      className={cn(baseClass, variantClass, sizeClass, className)}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
