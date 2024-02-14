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

export type ButtonProps = TypeProps & {
  children?: React.ReactNode
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  form?: string
  className?: string
  makClassName?: string
}

export type Position = {
  top?: number
  left?: number
  right?: string | number
  bottom?: string | number
}
export type MenuPositions =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left"
  | "bottom-center"
  | "top-center"
  | "bottom-align-right"
  | "bottom-align-left"
  | "top-align-right"
  | "top-align-left"

export type DropdownElementTriggerProps = {
  icon?: React.ReactNode
  label?: string | React.ReactNode
  labelLeft?: boolean
  labelRight?: boolean
  options?:
    | Array<string | number>
    | Array<{
        label: string
        value: any
        onClick?: (props: any) => void
      }>
  selectedOption?: string | number | { label: string; value: string }
  onChange?: (value: { label: string; value: string } | string | number) => void
  menuPosition?: MenuPositions
  chevronLeft?: boolean
  chevronRight?: boolean
  dismissOnClick?: boolean
}

export type OptionObject = { label: string; value: string }
