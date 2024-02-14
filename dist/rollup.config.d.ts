declare namespace _default {
    let input: string;
    let output: {
        file: string;
        format: string;
        sourcemap: boolean;
    }[];
    let plugins: import("rollup").Plugin[];
    let external: string[];
}
export default _default;
