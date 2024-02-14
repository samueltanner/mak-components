import { mak, useMakUi, componentWrapperLogic, ensureUtilityClass, isObject } from '@mak-stack/mak-ui';
import React, { useContext, useRef, useEffect, createContext, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BiChevronUp, BiLoaderCircle, BiErrorCircle, BiCheckCircle } from 'react-icons/bi';

const BackDrop = ({
  children,
  onClose,
  className,
  makClassName
}) => {
  return /*#__PURE__*/React.createElement(mak.div, {
    key: "blur",
    onClick: onClose,
    className: `absolute left-0 top-0 z-40 h-screen w-screen fade-in-out ${className}`,
    makClassName: makClassName,
    motion: {
      initial: {
        opacity: 0,
        width: "100%",
        height: "100%",
        zIndex: 10
      },
      animate: {
        opacity: 1,
        width: "100%",
        height: "100%",
        zIndex: 10
      },
      exit: {
        opacity: 0,
        width: "100%",
        height: "100%",
        zIndex: 10
      },
      transition: {
        duration: 0.2
      }
    }
  }, children);
};

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}
typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const ComponentWrapper = _a => {
  var {
      children,
      type
    } = _a,
    props = __rest(_a, ["children", "type"]);
  const makUi = useMakUi();
  const response = componentWrapperLogic({
    props,
    makUi,
    type
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, typeof children === "function" ? children(Object.assign(Object.assign({}, response), props)) : children);
};

const ButtonComponent = _a => {
  var {
      children,
      disabled,
      onClick,
      className,
      makClassName,
      _className,
      _makClassName
    } = _a,
    computedProps = __rest(_a, ["children", "disabled", "onClick", "className", "makClassName", "_className", "_makClassName"]);
  let {
    borderVariant,
    borderPx,
    hasBorderProps
  } = computedProps;
  if (hasBorderProps && (borderPx === 0 || !borderPx)) {
    borderPx = 2;
  }
  makClassName = [makClassName, _makClassName].join(" ").trim();
  className = [className, _className].join(" ").trim();
  return /*#__PURE__*/React.createElement(mak.button, {
    onClick: onClick,
    border: borderVariant,
    disabled: disabled,
    makClassName: makClassName,
    className: className,
    style: {
      borderWidth: borderPx
    }
  }, children);
};
const Button = props => {
  return /*#__PURE__*/React.createElement(ComponentWrapper, _extends({}, props, {
    type: "button"
  }), computedProps => {
    return /*#__PURE__*/React.createElement(ButtonComponent, _extends({}, computedProps, {
      makClassName: props.makClassName,
      className: props.className
    }), props.children);
  });
};

const ModalContext = /*#__PURE__*/createContext({});
const ModalBackDrop = BackDrop;
const ModalContent = ({
  children,
  className,
  makClassName
}) => {
  return /*#__PURE__*/React.createElement(mak.div, {
    className: `flex h-full w-full overflow-auto ${className}`,
    makClassName: makClassName
  }, children);
};
const ModalHeader = ({
  children,
  className,
  makClassName
}) => {
  const {
    onClose
  } = useContext(ModalContext);
  if (!onClose) {
    throw new Error("ModalHeader must be used within a Modal");
  }
  return /*#__PURE__*/React.createElement(mak.div, {
    className: className,
    makClassName: makClassName
  }, children);
};
const ModalFooter = ({
  children,
  className,
  makClassName
}) => {
  return /*#__PURE__*/React.createElement(mak.div, {
    className: className,
    makClassName: makClassName
  }, children);
};
const Modal = ({
  children,
  isOpen,
  onClose,
  onOpen,
  width,
  className,
  makClassName,
  backdropClassName,
  backDropMakClassName
}) => {
  const [showButton, setShowButton] = React.useState(true);
  const containerRef = useRef(null);
  useEffect(() => {
    const handleEscape = e => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);
  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const isAtBottom = Math.ceil(container.scrollTop + container.clientHeight) >= container.scrollHeight;
      setShowButton(!isAtBottom);
    }
  };
  const getModalDimensions = multiplier => {
    switch (width) {
      case "sm":
        return {
          width: `${multiplier ? multiplier * 400 : 400}px`,
          maxWidth: "95%",
          height: "fit-content",
          maxHeight: "80%"
        };
      case "md":
        return {
          width: `${multiplier ? multiplier * 600 : 600}px`,
          maxWidth: "95%",
          height: "fit-content",
          maxHeight: "80%"
        };
      case "lg":
        return {
          width: `${multiplier ? multiplier * 800 : 800}px`,
          maxWidth: "90%",
          height: "fit-content",
          maxHeight: "80%"
        };
      case "xl":
        return {
          width: `${multiplier ? multiplier * 1000 : 1000}px`,
          maxWidth: "90%",
          height: "fit-content",
          maxHeight: "80%"
        };
      case "2xl":
        return {
          width: `${multiplier ? multiplier * 1200 : 1200}px`,
          maxWidth: "90%",
          height: "fit-content",
          maxHeight: "80%"
        };
      default:
        return {
          width: `${multiplier ? multiplier * 600 : 600}px`,
          maxWidth: "95%",
          height: "fit-content",
          maxHeight: "80%"
        };
    }
  };
  const modalVariants = {
    hidden: Object.assign({
      scale: 0.9,
      opacity: 0,
      zIndex: 50
    }, getModalDimensions()),
    visible: Object.assign({
      scale: 1,
      opacity: 1,
      zIndex: 50
    }, getModalDimensions()),
    exit: Object.assign({
      opacity: 0,
      zIndex: 50,
      scale: 0.9
    }, getModalDimensions())
  };
  return /*#__PURE__*/React.createElement(ModalContext.Provider, {
    value: {
      onClose,
      onOpen,
      isOpen,
      showButton
    }
  }, /*#__PURE__*/React.createElement(AnimatePresence, null, isOpen && /*#__PURE__*/React.createElement("div", {
    className: "absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center"
  }, /*#__PURE__*/React.createElement(mak.div, {
    className: `relative flex flex-col overflow-hidden ${className}`,
    makClassName: makClassName,
    motion: {
      initial: "hidden",
      animate: "visible",
      exit: "exit",
      variants: modalVariants,
      transition: {
        duration: 0.2
      }
    },
    ref: containerRef,
    onScroll: handleScroll
  }, children), /*#__PURE__*/React.createElement(ModalBackDrop, {
    onClose: onClose,
    className: backdropClassName,
    makClassName: backDropMakClassName
  }))));
};

const ToggleComponent = _a => {
  var {
      checked: checkedProp,
      disabled,
      onChange,
      toggleColor = "bg-light-200",
      toggleCheckedColor = toggleColor,
      bgColor = "bg-light-600",
      bgCheckedColor = bgColor,
      toggleBorderPx = 0,
      toggleBorder = "border-light-200",
      toggleHoverColor = "bg-primary-200"
    } = _a,
    computedProps = __rest(_a, ["checked", "disabled", "onChange", "toggleColor", "toggleCheckedColor", "bgColor", "bgCheckedColor", "toggleBorderPx", "toggleBorder", "toggleHoverColor"]);
  const {
    borderPx = 0,
    bgVariant,
    colorVariant,
    borderVariant
  } = computedProps;
  toggleColor = ensureUtilityClass("bg", colorVariant || toggleColor);
  toggleCheckedColor = ensureUtilityClass("bg", colorVariant || toggleCheckedColor);
  bgColor = ensureUtilityClass("bg", bgVariant || bgColor);
  bgCheckedColor = ensureUtilityClass("bg", bgVariant || bgCheckedColor);
  toggleBorder = ensureUtilityClass("border", borderVariant || toggleBorder);
  toggleHoverColor = ensureUtilityClass("bg", toggleHoverColor);
  return /*#__PURE__*/React.createElement("span", {
    className: "flex items-center"
  }, /*#__PURE__*/React.createElement("label", {
    className: "group relative inline-flex items-center cursor-pointer"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checkedProp,
    disabled: disabled,
    className: "sr-only peer",
    onChange: e => {
      onChange && onChange(e);
    }
  }), /*#__PURE__*/React.createElement(mak.span, {
    className: `relative w-12 h-6 rounded-full items-center flex fade-in-out ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`,
    makClassName: `${checkedProp ? bgColor : bgCheckedColor}`,
    style: {
      borderWidth: `${borderPx}px`,
      opacity: disabled ? 0.5 : 1
    }
  }, /*#__PURE__*/React.createElement(mak.span, {
    className: `size-[20px] flex rounded-full mx-0 transition duration-100 ease-in-out fade-in-out ${checkedProp && !disabled ? "translate-x-[26px]" : "translate-x-[2px]"} ${toggleBorderPx > 0 ? `${toggleBorder}` : ""}`,
    makClassName: `${checkedProp ? toggleColor : toggleCheckedColor} hover:${toggleHoverColor}`,
    style: {
      borderWidth: `${toggleBorderPx}px`
    }
  }))));
};
const Toggle = props => {
  return /*#__PURE__*/React.createElement(ComponentWrapper, props, computedProps => /*#__PURE__*/React.createElement(ToggleComponent, computedProps));
};

const menuVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    x: 0,
    originX: 0,
    originY: 0,
    zIndex: -1000
  },
  visible: {
    opacity: 1,
    height: "auto",
    zIndex: 30,
    transition: {
      duration: 0.2
    }
  },
  exit: {
    opacity: 0,
    height: 0,
    x: 0,
    originX: 0,
    originY: 0,
    zIndex: 30,
    transition: {
      duration: 0.2
    }
  }
};
const LabelElement = ({
  onClick,
  label
}) => {
  if (!label) return null;
  if (typeof label === "string") return /*#__PURE__*/React.createElement("label", {
    className: `cursor-pointer`,
    onClick: onClick
  }, label);
  if (typeof label === "object") return /*#__PURE__*/React.createElement("span", {
    className: "cursor-pointer",
    onClick: onClick
  }, label);
};
const DropdownMenu = ({
  children,
  className,
  makClassName,
  liClassName,
  liMakClassName
}) => {
  const {
    onChange,
    value,
    values,
    options,
    valueKey
  } = useDropdownContext();
  return /*#__PURE__*/React.createElement(mak.div, {
    makClassName: makClassName || "bg-dark-800",
    className: className || "p-2 rounded-md drop-shadow-sm text-sm"
  }, /*#__PURE__*/React.createElement("span", {
    className: "h-full"
  }, !children && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("ul", {
    className: "flex flex-col gap-2"
  }, options === null || options === void 0 ? void 0 : options.map((option, i) => {
    if (!i) {
      i = Math.random();
    }
    return /*#__PURE__*/React.createElement(mak.li, {
      key: i,
      className: className || "flex cursor-pointer select-none items-center space-x-2 text-sm font-semibold",
      makClassName: makClassName || "text-primary hover:text-bg|secondary-300"
    }, /*#__PURE__*/React.createElement(mak.span, {
      className: `w-full rounded-md px-4 py-1.5 fade-in-out`
      //hover:bg-${
      //   simpleTheme.color.primary.base
      // } hover:bg-opacity-50 ${
      //   isSelect(option)
      //     ? `bg-${simpleTheme.color.primary.base} bg-opacity-20 `
      //     : " bg-opacity-20 hover:bg-opacity-30"
      // }
      ,
      onClick: () => {
        if (onChange) {
          if (valueKey && isObject(option)) {
            onChange(option[valueKey]);
          } else {
            onChange(option);
          }
          // onChange(option)
        }
      }
    }, typeof option === "string" || typeof option === "number" ? option : option === null || option === void 0 ? void 0 : option.label));
  }))), !!children && children));
};
DropdownMenu.displayName = "DropdownMenu";
const DropdownTrigger = ({
  icon,
  label,
  labelLeft,
  labelRight,
  chevronRight,
  chevronLeft
}) => {
  const {
    dropdownOpen,
    setDropdownOpen,
    triggerRef
  } = useDropdownContext();
  if (!labelLeft && !labelRight) {
    labelLeft = true;
  }
  if (labelLeft && labelRight) {
    labelLeft = true;
    labelRight = false;
  }
  if (chevronLeft && chevronRight) {
    chevronLeft = true;
    chevronRight = false;
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "relative flex w-fit select-none",
    ref: triggerRef
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => {
      setDropdownOpen(!dropdownOpen);
    },
    className: "relative flex h-fit items-center justify-center gap-1"
  }, chevronLeft && /*#__PURE__*/React.createElement(mak.span, {
    className: "flex items-center",
    motion: {
      initial: {
        rotate: 0
      },
      animate: {
        rotate: dropdownOpen ? 180 : 0
      },
      transition: {
        duration: 0.2
      }
    }
  }, /*#__PURE__*/React.createElement(mak.span, {
    makClassName: "text-primary"
  }, /*#__PURE__*/React.createElement(BiChevronUp, {
    className: `size-4`
  }))), label && labelLeft && /*#__PURE__*/React.createElement(LabelElement, {
    onClick: () => {
      setDropdownOpen(!dropdownOpen);
    },
    label: label
  }), /*#__PURE__*/React.createElement("span", {
    className: "flex cursor-pointer items-center gap-1"
  }, icon), label && labelRight && /*#__PURE__*/React.createElement(LabelElement, {
    onClick: () => {
      setDropdownOpen(!dropdownOpen);
    },
    label: label
  }), chevronRight && /*#__PURE__*/React.createElement(motion.span, {
    initial: {
      rotate: 0
    },
    animate: {
      rotate: dropdownOpen ? 180 : 0
    },
    transition: {
      duration: 0.2
    },
    className: "flex items-center"
  }, /*#__PURE__*/React.createElement(mak.span, {
    makClassName: "text-primary"
  }, /*#__PURE__*/React.createElement(BiChevronUp, {
    className: `size-4`
  })))));
};
const DropdownContext = /*#__PURE__*/createContext(undefined);
const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown compound components cannot be rendered outside the Dropdown component");
  }
  return context;
};
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
  valueKey
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [position, setPosition] = useState({
    top: 0,
    right: 0
  });
  const [dismissOnClick, setDismissOnClick] = useState(true);
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);
  const hiddenDropdownRef = useRef(null);
  useEffect(() => {
    if (!dropdownOpen) {
      return;
    }
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && triggerRef.current && !triggerRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    const handleClickMenuItem = event => {
      if (dismissOnClick && triggerRef.current && !triggerRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("click", handleClickMenuItem);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("click", handleClickMenuItem);
    };
  }, [dropdownOpen]);
  useEffect(() => {
    if ((value || values) && dismissOnClick) {
      setDropdownOpen(false);
    }
  }, [value, values]);
  const getDropdownPosition = () => {
    if (triggerRef.current && dropdownRef.current && hiddenDropdownRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const hiddenDropdownRect = hiddenDropdownRef.current.getBoundingClientRect();
      const menuHeight = hiddenDropdownRect.height;
      const menuWidth = hiddenDropdownRect.width;
      const triggerWidth = triggerRect.width;
      const padding = 8;
      let triggerLeft = triggerRect.left;
      let triggerTop = triggerRect.top;
      let triggerRight = triggerRect.right;
      let triggerBottom = triggerRect.bottom;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      let menuTop = 0;
      let menuLeft = 0;
      if (menuPosition.includes("top")) {
        menuTop = triggerTop - menuHeight - padding;
      }
      if (menuPosition.includes("bottom")) {
        menuTop = triggerBottom + padding;
      }
      if (menuPosition.includes("left") && !menuPosition.includes("align")) {
        menuLeft = triggerLeft - menuWidth;
      }
      if (menuPosition.includes("left") && menuPosition.includes("align")) {
        menuLeft = triggerLeft;
      }
      if (menuPosition.includes("right") && !menuPosition.includes("align")) {
        menuLeft = triggerRight;
      }
      if (menuPosition.includes("right") && menuPosition.includes("align")) {
        menuLeft = triggerRight - menuWidth;
      }
      if (menuPosition.includes("center")) {
        menuLeft = triggerLeft + triggerWidth / 2 - menuWidth / 2;
      }
      if (menuLeft + menuWidth > viewportWidth) {
        menuLeft = triggerLeft - menuWidth + triggerWidth;
      }
      if (menuPosition.includes("top") && menuTop - menuHeight < 0) {
        menuTop = triggerBottom + padding;
      }
      if (menuPosition.includes("bottom") && menuTop + menuHeight > viewportHeight) {
        menuTop = triggerTop - menuHeight - padding;
      }
      if (menuPosition.includes("left") && menuLeft < 0) {
        menuLeft = triggerLeft;
      }
      const position = {
        top: menuTop,
        left: menuLeft
      };
      setPosition(position);
    }
  };
  useEffect(() => {
    if (dropdownOpen) {
      getDropdownPosition();
    }
  }, [dropdownOpen]);
  return /*#__PURE__*/React.createElement(DropdownContext.Provider, {
    value: {
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
      valueKey
    }
  }, /*#__PURE__*/React.createElement(DropdownTrigger, {
    icon: icon,
    label: label,
    labelLeft: labelLeft,
    labelRight: labelRight,
    chevronLeft: chevronLeft,
    chevronRight: chevronRight
  }), /*#__PURE__*/React.createElement(AnimatePresence, null, dropdownOpen && /*#__PURE__*/React.createElement(mak.span, {
    className: `fixed z-30 flex w-fit p-2 h-full overflow-hidden rounded-lg`,
    makClassName: "bg-dark-800",
    motion: {
      variants: menuVariants,
      initial: "hidden",
      animate: dropdownOpen ? "visible" : "exit",
      exit: "exit",
      style: position
    },
    ref: dropdownRef,
    key: `dropdown`
  }, children ? children : /*#__PURE__*/React.createElement(DropdownMenu, null))), /*#__PURE__*/React.createElement("div", {
    className: "fixed left-[-9999px] top-[-9999px] z-[-1000] flex w-fit p-2 overflow-hidden rounded-lg",
    ref: hiddenDropdownRef,
    key: "dropdown-hidden"
  }, children && /*#__PURE__*/React.createElement(DropdownMenu, {
    key: "dropdown-children"
  }, children), options && !children && /*#__PURE__*/React.createElement(DropdownMenu, {
    key: "dropdown-options"
  })));
};
const Dropdown = props => {
  return /*#__PURE__*/React.createElement(ComponentWrapper, _extends({}, props, {
    type: "dropdown"
  }), computedProps => {
    return /*#__PURE__*/React.createElement(DropdownComponent, _extends({}, computedProps, {
      options: props.options,
      value: props.value,
      values: props.values,
      onChange: props.onChange,
      menuPosition: props.menuPosition,
      icon: props.icon,
      label: props.label,
      labelLeft: props.labelLeft,
      labelRight: props.labelRight,
      chevronLeft: props.chevronLeft,
      chevronRight: props.chevronRight,
      dismissOnClick: props.dismissOnClick,
      valueKey: props.valueKey
    }));
  });
};

const iconVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1
  },
  exit: {
    opacity: 0
  }
};
const LoaderComponent = _a => {
  var {
      children,
      loading,
      error,
      success,
      loadingIcon = /*#__PURE__*/React.createElement(BiLoaderCircle, {
        className: "animate-spin size-4"
      }),
      errorIcon = /*#__PURE__*/React.createElement(BiErrorCircle, {
        className: "size-4"
      }),
      successIcon = /*#__PURE__*/React.createElement(BiCheckCircle, {
        className: "size-4"
      }),
      className,
      makClassName,
      persistState = false,
      showIcon = true,
      loadingState,
      size = "inline",
      backdropClassName,
      backdropMakClassName,
      onClose
    } = _a;
    __rest(_a, ["children", "loading", "error", "success", "loadingIcon", "errorIcon", "successIcon", "className", "makClassName", "persistState", "showIcon", "loadingState", "size", "backdropClassName", "backdropMakClassName", "onClose"]);
  const [state, setState] = useState(undefined);
  useEffect(() => {
    if (loadingState) {
      setState(loadingState);
    } else {
      if (loading) {
        setState("loading");
      }
      if (error) {
        setState("error");
      }
      if (success) {
        setState("success");
      }
    }
  }, [loadingState, loading, error, success]);
  useEffect(() => {
    if (state === "loading" || persistState) return;
    const timeoutId = setTimeout(() => {
      setState(undefined);
    }, 4000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [state]);
  const Icon = /*#__PURE__*/React.createElement(AnimatePresence, {
    mode: "wait"
  }, state && state !== "default" && /*#__PURE__*/React.createElement(mak.span, {
    key: `${state}`,
    className: "flex",
    motion: {
      variants: iconVariants,
      initial: "hidden",
      animate: "visible",
      exit: "exit",
      transition: {
        duration: 0.5,
        delay: 0.5
      }
    }
  }, state === "loading" && loadingIcon, state === "error" && errorIcon, state === "success" && successIcon));
  if (size === "screen") {
    return /*#__PURE__*/React.createElement(BackDrop, {
      className: `${backdropClassName || "items-center justify-center backdrop-blur-sm gap-2 *:flex *:gap-2 *:items-center *:justify-center"} h-screen w-screen absolute top-0 left-0 flex`,
      makClassName: backdropMakClassName || "bg-dark-900/50",
      onClose: onClose
    }, /*#__PURE__*/React.createElement(mak.span, {
      className: className,
      makClassName: makClassName
    }, children && children, showIcon && Icon));
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(mak.span, {
    className: `${className}`,
    makClassName: makClassName
  }, children && children, showIcon && Icon));
};
const Loader = props => {
  return /*#__PURE__*/React.createElement(ComponentWrapper, props, computedProps => /*#__PURE__*/React.createElement(LoaderComponent, _extends({}, computedProps, {
    makClassName: props.makClassName,
    className: props.className
  }), props.children));
};

export { BackDrop, Button, ComponentWrapper, Dropdown, DropdownMenu, Loader, Modal, ModalContent, ModalFooter, ModalHeader, Toggle };
//# sourceMappingURL=bundle.esm.js.map
