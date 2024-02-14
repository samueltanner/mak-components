import {
  useMakUi,
  componentWrapperLogic,
} from "@mak-stack/mak-ui"
import { ComponentWrapperProps } from "../types"
import React from "react"

const ComponentWrapper = ({
  children,
  type,
  ...props
}: ComponentWrapperProps) => {
  const makUi = useMakUi()
  const response = componentWrapperLogic({
    props,
    makUi,
    type,
  })

  return (
    <>
      {typeof children === "function"
        ? children({
            ...response,
            ...props,
          })
        : children}
    </>
  )
}

export default ComponentWrapper
