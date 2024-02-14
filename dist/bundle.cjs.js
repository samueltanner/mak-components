'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var makUi = require('@mak-stack/mak-ui');
var React$1 = require('react');
var framerMotion = require('framer-motion');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React$1);

const BackDrop = ({
  children,
  onClose,
  className,
  makClassName
}) => {
  return /*#__PURE__*/React__default["default"].createElement(makUi.mak.div, {
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
  const makUi$1 = makUi.useMakUi();
  const response = makUi.componentWrapperLogic({
    props,
    makUi: makUi$1,
    type
  });
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, typeof children === "function" ? children(Object.assign(Object.assign({}, response), props)) : children);
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
  return /*#__PURE__*/React.createElement(makUi.mak.button, {
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

const ModalContext = /*#__PURE__*/React$1.createContext({});
const ModalBackDrop = BackDrop;
const ModalContent = ({
  children,
  className,
  makClassName
}) => {
  return /*#__PURE__*/React__default["default"].createElement(makUi.mak.div, {
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
  } = React$1.useContext(ModalContext);
  if (!onClose) {
    throw new Error("ModalHeader must be used within a Modal");
  }
  return /*#__PURE__*/React__default["default"].createElement(makUi.mak.div, {
    className: className,
    makClassName: makClassName
  }, children);
};
const ModalFooter = ({
  children,
  className,
  makClassName
}) => {
  return /*#__PURE__*/React__default["default"].createElement(makUi.mak.div, {
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
  const [showButton, setShowButton] = React__default["default"].useState(true);
  const containerRef = React$1.useRef(null);
  React$1.useEffect(() => {
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
  return /*#__PURE__*/React__default["default"].createElement(ModalContext.Provider, {
    value: {
      onClose,
      onOpen,
      isOpen,
      showButton
    }
  }, /*#__PURE__*/React__default["default"].createElement(framerMotion.AnimatePresence, null, isOpen && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center"
  }, /*#__PURE__*/React__default["default"].createElement(makUi.mak.div, {
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
  }, children), /*#__PURE__*/React__default["default"].createElement(ModalBackDrop, {
    onClose: onClose,
    className: backdropClassName,
    makClassName: backDropMakClassName
  }))));
};

exports.BackDrop = BackDrop;
exports.Button = Button;
exports.Modal = Modal;
exports.ModalContent = ModalContent;
exports.ModalFooter = ModalFooter;
exports.ModalHeader = ModalHeader;
//# sourceMappingURL=bundle.cjs.js.map
