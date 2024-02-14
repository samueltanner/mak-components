import React from "react";
import { BiCheck, BiLoaderAlt, BiSolidErrorCircle } from "react-icons/bi";
export const InLineLoader = ({ loading, success, error }) => {
    return (<span className="flex w-fit items-center justify-center">
      {loading && <BiLoaderAlt className="h-4 w-4 animate-spin"/>}
      {error && <BiSolidErrorCircle className="h-4 w-4"/>}
      {success && <BiCheck className="h-4 w-4"/>}
    </span>);
};
