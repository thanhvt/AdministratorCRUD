"use client"

import * as React from "react"
import { motion } from "framer-motion"

import { cn } from "../lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <motion.input
        type={type}
        className={cn(
          "peer flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        whileFocus={{ scale: 1.02, boxShadow: `0 0 0 2px hsl(var(--ring))` }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        {...(props as any)}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
