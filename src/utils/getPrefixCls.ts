const prefixCls = 'fes';

export function getPrefixCls(suffixCls: string) {
    return suffixCls ? `${prefixCls}-${suffixCls}` : prefixCls;
}
