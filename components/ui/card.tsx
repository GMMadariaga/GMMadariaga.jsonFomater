import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={`rounded-lg shadow-lg bg-gray-50 p-4 ${className}`}>
      {children}
    </div>
  )
}
