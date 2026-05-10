import * as React from "react"
import { cn } from "@/lib/utils"

function Badge({ className, variant = "default", ...props }) {
  let variantClass = ""
  if (variant === "default") {
    variantClass = "bg-[#EA7B7B]/20 text-[#FFEAD3] border-[#EA7B7B]/30 hover:bg-[#EA7B7B]/30"
  } else if (variant === "outline") {
    variantClass = "text-white border-white/20 hover:bg-white/10"
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variantClass,
        className
      )}
      {...props}
    />
  )
}

export { Badge }
