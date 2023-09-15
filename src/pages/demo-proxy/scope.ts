import { type ComponentPublicInstance } from "vue";
export interface DataSourceItem<T = unknown> {
    data: T;
    error: unknown;
    loading: boolean;
    status: DataSourceStatus;
    isInit: boolean;
    load: ExecutionFunc<T>;
}
export interface BlockScope {
    [x: string]: unknown
}

export interface RuntimeScope extends BlockScope, ComponentPublicInstance {
    i18n(key: string, values: any): string;

    currentLocale: string;
    dataSourceMap: Record<string, DataSourceItem>;

    reloadDataSource(): Promise<any[]>;

    __thisRequired: boolean;
    __loopScope?: boolean;
    __loopRefIndex?: number;
    __loopRefOffset?: number;
}
