import classnames from "classnames";
import { getPrefixNs as cyndiPrefixNs } from "cyndi/dist/getPrefixNs";

function getPrefixNs(componentName: string, customizePrefix?: string): string {
    return cyndiPrefixNs(componentName, customizePrefix, "litten");
}

export function getVisualStates(cls?: string) {
    const prefixCls = getPrefixNs("form", cls);

    const visualStates = classnames(prefixCls);

    return visualStates;
}