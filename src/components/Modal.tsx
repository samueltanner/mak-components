import React, { useContext, createContext, useEffect, useRef } from "react"
import { AnimatePresence } from "framer-motion"
import { mak } from "@mak-stack/mak-ui"
import BackDrop from "./BackDrop"

const ModalContext = createContext<{
  onClose?: () => void
  onOpen?: () => void
  isOpen?: boolean | string | number
  isScrollable?: boolean
  showButton?: boolean
  scrollToBottom?: () => void
}>({})

const ModalBackDrop = BackDrop

export const ModalContent = ({
  children,
  className,
  makClassName,
}: {
  children: React.ReactNode
  className?: string
  makClassName?: string
}) => {
  return (
    <mak.div
      className={`flex h-full w-full overflow-auto ${className}`}
      makClassName={makClassName}
    >
      {children}
    </mak.div>
  )
}

export const ModalHeader = ({
  children,
  className,
  makClassName,
}: {
  hideClose?: boolean
  children: React.ReactNode
  className?: string
  makClassName?: string
}) => {
  const { onClose } = useContext(ModalContext)

  if (!onClose) {
    throw new Error("ModalHeader must be used within a Modal")
  }

  return (
    <mak.div className={className} makClassName={makClassName}>
      {children}
    </mak.div>
  )
}

export const ModalFooter = ({
  children,
  className,
  makClassName,
}: {
  children: React.ReactNode
  className?: string
  makClassName?: string
}) => {
  return (
    <mak.div className={className} makClassName={makClassName}>
      {children}
    </mak.div>
  )
}

const Modal = ({
  children,
  isOpen,
  onClose,
  onOpen,
  width,
  className,
  makClassName,
  backdropClassName,
  backDropMakClassName,
}: {
  children: React.ReactNode
  isOpen: boolean | string | number
  onClose: () => void
  onOpen?: () => void
  width?: "sm" | "md" | "lg" | "xl" | "2xl"
  className?: string
  makClassName?: string
  backdropClassName?: string
  backDropMakClassName?: string
}) => {
  const [showButton, setShowButton] = React.useState(true)

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => {
      window.removeEventListener("keydown", handleEscape)
    }
  }, [onClose])

  const handleScroll = () => {
    const container = containerRef.current
    if (container) {
      const isAtBottom =
        Math.ceil(container.scrollTop + container.clientHeight) >=
        container.scrollHeight
      setShowButton(!isAtBottom)
    }
  }

  const getModalDimensions = (multiplier?: number) => {
    switch (width) {
      case "sm":
        return {
          width: `${multiplier ? multiplier * 400 : 400}px`,
          maxWidth: "95%",
          height: "fit-content",
          maxHeight: "80%",
        }
      case "md":
        return {
          width: `${multiplier ? multiplier * 600 : 600}px`,
          maxWidth: "95%",
          height: "fit-content",
          maxHeight: "80%",
        }
      case "lg":
        return {
          width: `${multiplier ? multiplier * 800 : 800}px`,
          maxWidth: "90%",
          height: "fit-content",
          maxHeight: "80%",
        }
      case "xl":
        return {
          width: `${multiplier ? multiplier * 1000 : 1000}px`,
          maxWidth: "90%",
          height: "fit-content",
          maxHeight: "80%",
        }
      case "2xl":
        return {
          width: `${multiplier ? multiplier * 1200 : 1200}px`,
          maxWidth: "90%",
          height: "fit-content",
          maxHeight: "80%",
        }
      default:
        return {
          width: `${multiplier ? multiplier * 600 : 600}px`,
          maxWidth: "95%",
          height: "fit-content",
          maxHeight: "80%",
        }
    }
  }

  const modalVariants = {
    hidden: {
      scale: 0.9,
      opacity: 0,
      zIndex: 50,
      ...getModalDimensions(),
    },
    visible: {
      scale: 1,
      opacity: 1,
      zIndex: 50,
      ...getModalDimensions(),
    },
    exit: { opacity: 0, zIndex: 50, scale: 0.9, ...getModalDimensions() },
  }

  return (
    <ModalContext.Provider
      value={{
        onClose,
        onOpen,
        isOpen,
        showButton,
      }}
    >
      <AnimatePresence>
        {isOpen && (
          <div className="absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center">
            <mak.div
              className={`relative flex flex-col overflow-hidden ${className}`}
              makClassName={makClassName}
              motion={{
                initial: "hidden",
                animate: "visible",
                exit: "exit",
                variants: modalVariants,
                transition: { duration: 0.2 },
              }}
              ref={containerRef}
              onScroll={handleScroll}
            >
              {children}
            </mak.div>
            <ModalBackDrop
              onClose={onClose}
              className={backdropClassName}
              makClassName={backDropMakClassName}
            />
          </div>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  )
}

export default Modal
