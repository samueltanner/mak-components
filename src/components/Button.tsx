import { ButtonProps } from "@/types"
import ComponentWrapper from "../functions/componentWrapper"
import { mak, ComponentWrapperResponse } from "@mak-stack/mak-ui";

const ButtonComponent = ({
  children,
  disabled,
  onClick,
  className,
  makClassName,
  _className,
  _makClassName,
  ...computedProps
}: ButtonProps & ComponentWrapperResponse) => {
  let { borderVariant, borderPx, hasBorderProps } = computedProps

  if (hasBorderProps && (borderPx === 0 || !borderPx)) {
    borderPx = 2
  }

  makClassName = [makClassName, _makClassName].join(" ").trim()
  className = [className, _className].join(" ").trim()

  return (
    <mak.button
      onClick={onClick}
      border={borderVariant}
      disabled={disabled}
      makClassName={makClassName}
      className={className}
      style={{ borderWidth: borderPx }}
    >
      {children}
    </mak.button>
  )
}

export const Button = (props: ButtonProps) => {
  return (
    <ComponentWrapper {...props} type="button">
      {(computedProps) => {
        return (
          <ButtonComponent
            {...computedProps}
            makClassName={props.makClassName}
            className={props.className}
          >
            {props.children}
          </ButtonComponent>
        )
      }}
    </ComponentWrapper>
  )
}
