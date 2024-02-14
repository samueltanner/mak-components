import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { AnimatePresence, motion } from "framer-motion"
import { BiChevronUp } from "react-icons/bi"
import { mak, isObject, TypeProps } from "@mak-stack/mak-ui"
import ComponentWrapper from "../functions/componentWrapper"
import { DropdownElementTriggerProps, MenuPositions, Position } from "@/types"

const menuVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    x: 0,
    originX: 0,
    originY: 0,
    zIndex: -1000,
  },
  visible: {
    opacity: 1,
    height: "auto",
    zIndex: 30,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    height: 0,
    x: 0,
    originX: 0,
    originY: 0,
    zIndex: 30,
    transition: { duration: 0.2 },
  },
}

const LabelElement = ({
  onClick,
  label,
}: {
  onClick?: () => void
  label?: string | React.ReactNode
}) => {
  if (!label) return null
  if (typeof label === "string")
    return (
      <label className={`cursor-pointer`} onClick={onClick}>
        {label}
      </label>
    )
  if (typeof label === "object")
    return (
      <span className="cursor-pointer" onClick={onClick}>
        {label}
      </span>
    )
}

const DropdownMenu = ({
  children,
  className,
  makClassName,
  liClassName,
  liMakClassName,
}: {
  children?: React.ReactNode
  className?: string
  makClassName?: string
  liClassName?: string
  liMakClassName?: string
}) => {
  const { onChange, value, values, options, valueKey } = useDropdownContext()

  const isSelect = (option: any) => {
    if (typeof option === "string" && typeof value === "string") {
      return option.toLowerCase() === value.toLowerCase()
    } else if (typeof option === "number" && typeof value === "number") {
      return option === value
    } else if (isObject(option) && isObject(value)) {
      return JSON.stringify(option) === JSON.stringify(value)
    } else if (
      typeof option === "object" &&
      (typeof value === "string" || typeof value === "number")
    ) {
      return (
        option.label.toLowerCase() === value?.toString().toLowerCase() ||
        option.value.toLowerCase() === value?.toString().toLowerCase()
      )
    }

    return false
  }

  return (
    <mak.div
      makClassName={makClassName || "bg-dark-800"}
      className={className || "p-2 rounded-md drop-shadow-sm text-sm"}
    >
      <span className="h-full">
        {!children && (
          <>
            <ul className="flex flex-col gap-2">
              {options?.map((option: any, i: number) => {
                if (!i) {
                  i = Math.random()
                }
                return (
                  <mak.li
                    key={i}
                    className={
                      className ||
                      "flex cursor-pointer select-none items-center space-x-2 text-sm font-semibold"
                    }
                    makClassName={
                      makClassName || "text-primary hover:text-bg|secondary-300"
                    }
                  >
                    <mak.span
                      className={`w-full rounded-md px-4 py-1.5 fade-in-out`}
                      //hover:bg-${
                      //   simpleTheme.color.primary.base
                      // } hover:bg-opacity-50 ${
                      //   isSelect(option)
                      //     ? `bg-${simpleTheme.color.primary.base} bg-opacity-20 `
                      //     : " bg-opacity-20 hover:bg-opacity-30"
                      // }
                      onClick={() => {
                        if (onChange) {
                          if (valueKey && isObject(option)) {
                            onChange(option[valueKey])
                          } else {
                            onChange(option)
                          }
                          // onChange(option)
                        }
                      }}
                    >
                      {typeof option === "string" || typeof option === "number"
                        ? option
                        : option?.label}
                    </mak.span>
                  </mak.li>
                )
              })}
            </ul>
          </>
        )}
        {!!children && children}
      </span>
    </mak.div>
  )
}

DropdownMenu.displayName = "DropdownMenu"

const DropdownTrigger = ({
  icon,
  label,
  labelLeft,
  labelRight,
  chevronRight,
  chevronLeft,
}: DropdownElementTriggerProps) => {
  const { dropdownOpen, setDropdownOpen, triggerRef } = useDropdownContext()

  if (!labelLeft && !labelRight) {
    labelLeft = true
  }

  if (labelLeft && labelRight) {
    labelLeft = true
    labelRight = false
  }

  if (chevronLeft && chevronRight) {
    chevronLeft = true
    chevronRight = false
  }

  return (
    <div className="relative flex w-fit select-none" ref={triggerRef}>
      <div
        onClick={() => {
          setDropdownOpen(!dropdownOpen)
        }}
        className="relative flex h-fit items-center justify-center gap-1"
      >
        {chevronLeft && (
          <mak.span
            className="flex items-center"
            motion={{
              initial: { rotate: 0 },
              animate: { rotate: dropdownOpen ? 180 : 0 },
              transition: { duration: 0.2 },
            }}
          >
            <mak.span makClassName="text-primary">
              <BiChevronUp className={`size-4`} />
            </mak.span>
          </mak.span>
        )}
        {label && labelLeft && (
          <LabelElement
            onClick={() => {
              setDropdownOpen(!dropdownOpen)
            }}
            label={label}
          />
        )}
        <span className="flex cursor-pointer items-center gap-1">{icon}</span>
        {label && labelRight && (
          <LabelElement
            onClick={() => {
              setDropdownOpen(!dropdownOpen)
            }}
            label={label}
          />
        )}
        {chevronRight && (
          <motion.span
            initial={{ rotate: 0 }}
            animate={{ rotate: dropdownOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center"
          >
            <mak.span makClassName="text-primary">
              <BiChevronUp className={`size-4`} />
            </mak.span>
          </motion.span>
        )}
      </div>
    </div>
  )
}

type DropdownProps = TypeProps & {
  children?: React.ReactNode
  options?:
    | Array<string | number>
    | Array<{
        label: string
        value: any
      }>
  value?: string | number | { label: string; value: string }
  values?: Array<string | number | { label: string; value: string }>
  onChange?: (value: string | number | { label: string; value: string }) => void
  menuPosition?: MenuPositions
  icon?: React.ReactNode
  label?: string | React.ReactNode
  labelLeft?: boolean
  labelRight?: boolean
  chevronLeft?: boolean
  chevronRight?: boolean
  dismissOnClick?: boolean
  valueKey?: string
}

interface DropdownContextValue extends DropdownProps {
  dropdownOpen: boolean
  setDropdownOpen: (value: boolean) => void
  position: Position
  setPosition?: (value: Position) => void
  triggerRef: React.RefObject<HTMLDivElement> | null
  dropdownRef: React.RefObject<HTMLDivElement> | null
  hiddenDropdownRef: React.RefObject<HTMLDivElement> | null
}

const DropdownContext = createContext<DropdownContextValue | undefined>(
  undefined
)

const useDropdownContext = () => {
  const context = useContext(DropdownContext)
  if (!context) {
    throw new Error(
      "Dropdown compound components cannot be rendered outside the Dropdown component"
    )
  }
  return context
}

const DropdownComponent = ({
  children,
  options,
  value,
  values,
  onChange,
  menuPosition = "bottom-right",
  icon,
  label,
  labelLeft,
  labelRight,
  chevronRight,
  chevronLeft,
  valueKey,
}: DropdownProps) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
  const [position, setPosition] = useState<Position>({
    top: 0,
    right: 0,
  })

  const [dismissOnClick, setDismissOnClick] = useState<boolean>(true)
  const triggerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const hiddenDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!dropdownOpen) {
      return
    }
    const handleClickOutside = (event: any) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setDropdownOpen(false)
      }
    }
    const handleClickMenuItem = (event: any) => {
      if (
        dismissOnClick &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("click", handleClickMenuItem)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("click", handleClickMenuItem)
    }
  }, [dropdownOpen])

  useEffect(() => {
    if ((value || values) && dismissOnClick) {
      setDropdownOpen(false)
    }
  }, [value, values])

  const getDropdownPosition = () => {
    if (
      triggerRef.current &&
      dropdownRef.current &&
      hiddenDropdownRef.current
    ) {
      const triggerRect = triggerRef.current.getBoundingClientRect()
      const hiddenDropdownRect =
        hiddenDropdownRef.current.getBoundingClientRect()
      const menuHeight = hiddenDropdownRect.height
      const menuWidth = hiddenDropdownRect.width

      const triggerWidth = triggerRect.width
      const padding = 8
      let triggerLeft = triggerRect.left
      let triggerTop = triggerRect.top
      let triggerRight = triggerRect.right
      let triggerBottom = triggerRect.bottom
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      let menuTop = 0
      let menuLeft = 0

      if (menuPosition.includes("top")) {
        menuTop = triggerTop - menuHeight - padding
      }
      if (menuPosition.includes("bottom")) {
        menuTop = triggerBottom + padding
      }
      if (menuPosition.includes("left") && !menuPosition.includes("align")) {
        menuLeft = triggerLeft - menuWidth
      }
      if (menuPosition.includes("left") && menuPosition.includes("align")) {
        menuLeft = triggerLeft
      }
      if (menuPosition.includes("right") && !menuPosition.includes("align")) {
        menuLeft = triggerRight
      }
      if (menuPosition.includes("right") && menuPosition.includes("align")) {
        menuLeft = triggerRight - menuWidth
      }
      if (menuPosition.includes("center")) {
        menuLeft = triggerLeft + triggerWidth / 2 - menuWidth / 2
      }
      if (menuLeft + menuWidth > viewportWidth) {
        menuLeft = triggerLeft - menuWidth + triggerWidth
      }
      if (menuPosition.includes("top") && menuTop - menuHeight < 0) {
        menuTop = triggerBottom + padding
      }
      if (
        menuPosition.includes("bottom") &&
        menuTop + menuHeight > viewportHeight
      ) {
        menuTop = triggerTop - menuHeight - padding
      }
      if (menuPosition.includes("left") && menuLeft < 0) {
        menuLeft = triggerLeft
      }
      const position = { top: menuTop, left: menuLeft }

      setPosition(position)
    }
  }

  useEffect(() => {
    if (dropdownOpen) {
      getDropdownPosition()
    }
  }, [dropdownOpen])

  return (
    <DropdownContext.Provider
      value={{
        options,
        value,
        values,
        onChange,
        dropdownOpen,
        setDropdownOpen,
        position,
        triggerRef,
        dropdownRef,
        hiddenDropdownRef,
        valueKey,
      }}
    >
      <DropdownTrigger
        icon={icon}
        label={label}
        labelLeft={labelLeft}
        labelRight={labelRight}
        chevronLeft={chevronLeft}
        chevronRight={chevronRight}
      />
      <AnimatePresence>
        {dropdownOpen && (
          <mak.span
            className={`fixed z-30 flex w-fit p-2 h-full overflow-hidden rounded-lg`}
            makClassName="bg-dark-800"
            motion={{
              variants: menuVariants,
              initial: "hidden",
              animate: dropdownOpen ? "visible" : "exit",
              exit: "exit",
              style: position,
            }}
            ref={dropdownRef}
            key={`dropdown`}
          >
            {children ? children : <DropdownMenu />}
          </mak.span>
        )}
      </AnimatePresence>
      <div
        className="fixed left-[-9999px] top-[-9999px] z-[-1000] flex w-fit p-2 overflow-hidden rounded-lg"
        ref={hiddenDropdownRef}
        key={"dropdown-hidden"}
      >
        {children && (
          <DropdownMenu key="dropdown-children">{children}</DropdownMenu>
        )}
        {options && !children && <DropdownMenu key={"dropdown-options"} />}
      </div>
    </DropdownContext.Provider>
  )
}

const Dropdown = (props: DropdownProps) => {
  return (
    <ComponentWrapper {...props} type="dropdown">
      {(computedProps) => {
        return (
          <DropdownComponent
            {...computedProps}
            options={props.options}
            value={props.value}
            values={props.values}
            onChange={props.onChange}
            menuPosition={props.menuPosition}
            icon={props.icon}
            label={props.label}
            labelLeft={props.labelLeft}
            labelRight={props.labelRight}
            chevronLeft={props.chevronLeft}
            chevronRight={props.chevronRight}
            dismissOnClick={props.dismissOnClick}
            valueKey={props.valueKey}
          />
        )
      }}
    </ComponentWrapper>
  )
}
export { DropdownMenu, Dropdown }
