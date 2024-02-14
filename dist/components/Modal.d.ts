import React from "react";
export declare const ModalContent: ({ children, className, makClassName, }: {
    children: React.ReactNode;
    className?: string | undefined;
    makClassName?: string | undefined;
}) => React.JSX.Element;
export declare const ModalHeader: ({ children, className, makClassName, }: {
    hideClose?: boolean | undefined;
    children: React.ReactNode;
    className?: string | undefined;
    makClassName?: string | undefined;
}) => React.JSX.Element;
export declare const ModalFooter: ({ children, className, makClassName, }: {
    children: React.ReactNode;
    className?: string | undefined;
    makClassName?: string | undefined;
}) => React.JSX.Element;
export declare const Modal: ({ children, isOpen, onClose, onOpen, width, className, makClassName, backdropClassName, backDropMakClassName, }: {
    children: React.ReactNode;
    isOpen: boolean | string | number;
    onClose: () => void;
    onOpen?: (() => void) | undefined;
    width?: "sm" | "md" | "lg" | "xl" | "2xl" | undefined;
    className?: string | undefined;
    makClassName?: string | undefined;
    backdropClassName?: string | undefined;
    backDropMakClassName?: string | undefined;
}) => React.JSX.Element;
