import { cva, type VariantProps } from 'class-variance-authority'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-white px-5 py-3 text-ink hover:-translate-y-0.5 hover:bg-cyan hover:shadow-[0_0_30px_rgba(96,230,255,.45)]',
        ghost: 'border border-white/20 px-5 py-3 text-white hover:border-cyan/60 hover:bg-white/5',
        dark: 'bg-ink px-6 py-3 text-white hover:bg-violet-700',
      },
    },
    defaultVariants: { variant: 'primary' },
  },
)

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, ...props }, ref) => (
  <button className={cn(buttonVariants({ variant }), className)} ref={ref} {...props} />
))
Button.displayName = 'Button'
