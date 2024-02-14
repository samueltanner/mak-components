import React from "react";
import { TypeProps } from "@mak-stack/mak-ui";
import { MenuPositions } from "@/types";
declare const DropdownMenu: {
    ({ children, className, makClassName, liClassName, liMakClassName, }: {
        children?: React.ReactNode;
        className?: string | undefined;
        makClassName?: string | undefined;
        liClassName?: string | undefined;
        liMakClassName?: string | undefined;
    }): React.JSX.Element;
    displayName: string;
};
type DropdownProps = TypeProps & {
    children?: React.ReactNode;
    options?: Array<string | number> | Array<{
        label: string;
        value: any;
    }>;
    value?: string | number | {
        label: string;
        value: string;
    };
    values?: Array<string | number | {
        label: string;
        value: string;
    }>;
    onChange?: (value: string | number | {
        label: string;
        value: string;
    }) => void;
    menuPosition?: MenuPositions;
    icon?: React.ReactNode;
    label?: string | React.ReactNode;
    labelLeft?: boolean;
    labelRight?: boolean;
    chevronLeft?: boolean;
    chevronRight?: boolean;
    dismissOnClick?: boolean;
    valueKey?: string;
};
declare const Dropdown: (props: DropdownProps) => React.JSX.Element;
export { DropdownMenu, Dropdown };
