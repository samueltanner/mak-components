import { TypeProps } from "@mak-stack/mak-ui"

export type ComponentWrapperProps = TypeProps & {
  children: ((props: any) => JSX.Element) | JSX.Element
  type?: string
}

export type LoaderPropsType = {
  loading?: boolean
  success?: boolean
  error?: boolean
  children?: React.ReactNode
  inline?: boolean
}


export type LoaderProps = TypeProps & {
  children?: React.ReactNode
  makClassName?: string
  className?: string
  loading?: boolean
  error?: boolean
  success?: boolean
  persistState?: boolean
  size?: "inline" | "screen" | "full"
  loadingIcon?: React.ReactNode
  errorIcon?: React.ReactNode
  successIcon?: React.ReactNode
  loadingState?: "default" | "loading" | "error" | "success" | undefined
  showIcon?: boolean
  backdropClassName?: string
  backdropMakClassName?: string

  onClose?: () => void
}