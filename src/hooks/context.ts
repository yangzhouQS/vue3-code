import { InjectionKey, ComputedRef } from 'vue';
import _mergeWith from 'lodash/mergeWith';
import merge from 'lodash/merge';
import defaultConfig from './default-config';
import isArray from 'lodash/isArray';
import {GlobalConfigProvider} from "@/hooks/useConfig";

export enum EAnimationType {
  ripple = 'ripple',
  expand = 'expand',
  fade = 'fade',
}

export const defaultGlobalConfig = merge(defaultConfig);


export const configProviderInjectKey: InjectionKey<ComputedRef<GlobalConfigProvider>> = Symbol('configProvide');

export const mergeWith = (defaultGlobalConfig: GlobalConfigProvider, injectConfig: GlobalConfigProvider) =>
  _mergeWith(defaultGlobalConfig, injectConfig, (objValue, srcValue) => {
    if (isArray(objValue)) {
      return srcValue;
    }
  });
