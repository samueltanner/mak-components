import { ComponentWrapper } from "./ComponentWrapper"
import { BiCheckCircle, BiErrorCircle, BiLoaderCircle } from "react-icons/bi"
import { mak } from "@mak-stack/mak-ui"
import React, { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { BackDrop } from "./BackDrop"
import { LoaderProps } from "@/types"

const iconVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
}

export const LoaderComponent = ({
  children,
  loading,
  error,
  success,
  loadingIcon = <BiLoaderCircle className="animate-spin size-4" />,
  errorIcon = <BiErrorCircle className="size-4" />,
  successIcon = <BiCheckCircle className="size-4" />,
  className,
  makClassName,
  persistState = false,
  showIcon = true,
  loadingState,
  size = "inline",
  backdropClassName,
  backdropMakClassName,

  onClose,
  ...computedProps
}: LoaderProps) => {
  const [state, setState] = useState<
    "default" | "loading" | "error" | "success" | undefined
  >(undefined)

  useEffect(() => {
    if (loadingState) {
      setState(loadingState)
    } else {
      if (loading) {
        setState("loading")
      }
      if (error) {
        setState("error")
      }
      if (success) {
        setState("success")
      }
    }
  }, [loadingState, loading, error, success])

  useEffect(() => {
    if (state === "loading" || persistState) return

    const timeoutId = setTimeout(() => {
      setState(undefined)
    }, 4000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [state])

  const iconMap = {
    loading: loadingIcon,
    error: errorIcon,
    success: successIcon,
  }

  const Icon = (
    <AnimatePresence mode="wait">
      {state && state !== "default" && (
        <mak.span
          key={`${state}`}
          className="flex"
          motion={{
            variants: iconVariants,
            initial: "hidden",
            animate: "visible",
            exit: "exit",
            transition: { duration: 0.5, delay: 0.5 },
          }}
        >
          {state === "loading" && loadingIcon}
          {state === "error" && errorIcon}
          {state === "success" && successIcon}
        </mak.span>
      )}
    </AnimatePresence>
  )

  if (size === "screen") {
    return (
      <BackDrop
        className={`${
          backdropClassName ||
          "items-center justify-center backdrop-blur-sm gap-2 *:flex *:gap-2 *:items-center *:justify-center"
        } h-screen w-screen absolute top-0 left-0 flex`}
        makClassName={backdropMakClassName || "bg-dark-900/50"}
        onClose={onClose}
      >
        <mak.span className={className} makClassName={makClassName}>
          {children && children}
          {showIcon && Icon}
        </mak.span>
      </BackDrop>
    )
  }
  return (
    <>
      <mak.span className={`${className}`} makClassName={makClassName}>
        {children && children}
        {showIcon && Icon}
      </mak.span>
    </>
  )
}

const Loader = (props: LoaderProps) => {
  return (
    <ComponentWrapper {...props}>
      {(computedProps) => (
        <LoaderComponent
          {...computedProps}
          makClassName={props.makClassName}
          className={props.className}
        >
          {props.children}
        </LoaderComponent>
      )}
    </ComponentWrapper>
  )
}

export { Loader }
