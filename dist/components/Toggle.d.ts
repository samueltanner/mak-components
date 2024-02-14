import { TypeProps } from "@mak-stack/mak-ui";
import React from "react";
type ToggleProps = TypeProps & {
    checked?: boolean;
    onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    toggleColor?: string;
    toggleCheckedColor?: string;
    bgColor?: string;
    bgCheckedColor?: string;
    toggleBorderPx?: number;
    toggleBorder?: string;
    toggleHoverColor?: string;
};
export declare const Toggle: (props: ToggleProps & TypeProps) => React.JSX.Element;
export {};
