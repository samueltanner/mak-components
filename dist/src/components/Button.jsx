var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import ComponentWrapper from "../functions/componentWrapper";
import { mak } from "@mak-stack/mak-ui";
const ButtonComponent = (_a) => {
    var { children, disabled, onClick, className, makClassName, _className, _makClassName } = _a, computedProps = __rest(_a, ["children", "disabled", "onClick", "className", "makClassName", "_className", "_makClassName"]);
    let { borderVariant, borderPx, hasBorderProps } = computedProps;
    if (hasBorderProps && (borderPx === 0 || !borderPx)) {
        borderPx = 2;
    }
    makClassName = [makClassName, _makClassName].join(" ").trim();
    className = [className, _className].join(" ").trim();
    return (<mak.button onClick={onClick} border={borderVariant} disabled={disabled} makClassName={makClassName} className={className} style={{ borderWidth: borderPx }}>
      {children}
    </mak.button>);
};
export const Button = (props) => {
    return (<ComponentWrapper {...props} type="button">
      {(computedProps) => {
            return (<ButtonComponent {...computedProps} makClassName={props.makClassName} className={props.className}>
            {props.children}
          </ButtonComponent>);
        }}
    </ComponentWrapper>);
};
