import type { ReactNode } from 'react'

export const CenterLayout = ({
  children,
}: {
  children: ReactNode
}) => {
  return (
    <div
      className="mt-24"
    >
      {children}
    </div>
  )
}