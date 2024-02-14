import React from "react";
import { LoaderProps } from "@/types";
export declare const LoaderComponent: ({ children, loading, error, success, loadingIcon, errorIcon, successIcon, className, makClassName, persistState, showIcon, loadingState, size, backdropClassName, backdropMakClassName, onClose, ...computedProps }: LoaderProps) => React.JSX.Element;
declare const Loader: (props: LoaderProps) => React.JSX.Element;
export { Loader };
