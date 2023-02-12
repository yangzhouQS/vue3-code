import {Component, defineComponent, h} from 'vue';
import {isFn, isObj} from "@/components/shared/types";

export function isNil<T>(val: T): val is NonNullable<T> {
  return val !== null && val !== undefined;
}

export function isVueComponent(val: unknown): val is Component {
  if (isFn(val)) return true;
  if (isObj(val) && ('render' in val || 'setup' in val)) {
    return true;
  }
  return false;
}
