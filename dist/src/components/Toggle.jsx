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
import { ComponentWrapper } from "./ComponentWrapper";
import { mak, ensureUtilityClass, } from "@mak-stack/mak-ui";
import React from "react";
const ToggleComponent = (_a) => {
    var { checked: checkedProp, disabled, onChange, toggleColor = "bg-light-200", toggleCheckedColor = toggleColor, bgColor = "bg-light-600", bgCheckedColor = bgColor, toggleBorderPx = 0, toggleBorder = "border-light-200", toggleHoverColor = "bg-primary-200" } = _a, computedProps = __rest(_a, ["checked", "disabled", "onChange", "toggleColor", "toggleCheckedColor", "bgColor", "bgCheckedColor", "toggleBorderPx", "toggleBorder", "toggleHoverColor"]);
    const { borderPx = 0, bgVariant, colorVariant, borderVariant } = computedProps;
    toggleColor = ensureUtilityClass("bg", colorVariant || toggleColor);
    toggleCheckedColor = ensureUtilityClass("bg", colorVariant || toggleCheckedColor);
    bgColor = ensureUtilityClass("bg", bgVariant || bgColor);
    bgCheckedColor = ensureUtilityClass("bg", bgVariant || bgCheckedColor);
    toggleBorder = ensureUtilityClass("border", borderVariant || toggleBorder);
    toggleHoverColor = ensureUtilityClass("bg", toggleHoverColor);
    return (<span className="flex items-center">
      <label className="group relative inline-flex items-center cursor-pointer">
        <input type="checkbox" checked={checkedProp} disabled={disabled} className="sr-only peer" onChange={(e) => {
            onChange && onChange(e);
        }}/>

        <mak.span className={`relative w-12 h-6 rounded-full items-center flex fade-in-out ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`} makClassName={`${checkedProp ? bgColor : bgCheckedColor}`} style={{ borderWidth: `${borderPx}px`, opacity: disabled ? 0.5 : 1 }}>
          <mak.span className={`size-[20px] flex rounded-full mx-0 transition duration-100 ease-in-out fade-in-out ${checkedProp && !disabled
            ? "translate-x-[26px]"
            : "translate-x-[2px]"} ${toggleBorderPx > 0 ? `${toggleBorder}` : ""}`} makClassName={`${checkedProp ? toggleColor : toggleCheckedColor} hover:${toggleHoverColor}`} style={{ borderWidth: `${toggleBorderPx}px` }}/>
        </mak.span>
      </label>
    </span>);
};
export const Toggle = (props) => {
    return (<ComponentWrapper {...props}>
      {(computedProps) => <ToggleComponent {...computedProps}/>}
    </ComponentWrapper>);
};
