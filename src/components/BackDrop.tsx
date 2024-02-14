import { mak } from "@mak-stack/mak-ui"
import React from "react"

const BackDrop = ({
  children,
  onClose,
  className,
  makClassName,
}: {
  children?: React.ReactNode
  onClose?: () => void
  className?: string
  makClassName?: string
}) => {
  return (
    <mak.div
      key="blur"
      onClick={onClose}
      className={`absolute left-0 top-0 z-40 h-screen w-screen fade-in-out ${className}`}
      makClassName={makClassName}
      motion={{
        initial: {
          opacity: 0,
          width: "100%",
          height: "100%",
          zIndex: 10,
        },
        animate: {
          opacity: 1,
          width: "100%",
          height: "100%",
          zIndex: 10,
        },
        exit: {
          opacity: 0,
          width: "100%",
          height: "100%",
          zIndex: 10,
        },
        transition: { duration: 0.2 },
      }}
    >
      {children}
    </mak.div>
  )
}

export default BackDrop
