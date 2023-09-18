import * as Vue from 'vue';
import { isArray, isFunction, isString } from "@/components/vue-formily/vue-formily-util";

const {hasOwnProperty} = Object.prototype;
export const hasOwn = (object, property) => hasOwnProperty.call(object, property);

// From: https://github.com/vuejs/vue/blob/6fe07ebf5ab3fea1860c59fe7cdd2ec1b760f9b0/src/shared/util.js#L165
const camelizeRE = /-(\w)/g;
export const camelize = string => string.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));

export const initProvide = (parent, key, object) => {
    /**
     * New behavior introduced in 2.7.0 to always use the parent provide
     * if not specified by the component.
     * https://github.com/vuejs/vue/blob/v2.7.0/src/v3/apiInject.ts#L26
     */
    if (parent._provided) {
        const provides = parent._provided;
        const parentProvides = parent.$parent && parent.$parent._provided;
        if (provides === parentProvides) {
            parent._provided = Object.create(parentProvides);
        }
    } else {
        parent._provided = {};
    }

    const providedEntry = parent._provided[key];
    /*if (providedEntry) {
        for (const prop in object) {
            if (hasOwn(object, prop)) {
                Vue.set(providedEntry, prop, object[prop]);
            }
        }
    } else {
        parent._provided[key] = Vue.observable(object);
    }*/
};

export const computeProps = (propsDecl, attributes) => {
    const props = {};

    for (const attribute in attributes) {
        if (hasOwn(attributes, attribute)) {
            const camelized = camelize(attribute);
            const value = attributes[attribute];
            if (propsDecl.includes(camelized)) {
                props[camelized] = value;
                delete attributes[attribute];
            }
        }
    }

    return {attrs: attributes, props};
};


export function debounce<T extends () => unknown>(fn: T, ms?: number): () => void {
    let timerId: any = null;

    if (!ms) {
        return function (this: unknown) {
            if (!timerId) {
                timerId = setTimeout(() => {
                    timerId = null;
                    fn.apply(this);
                });
            }
        };
    } else {
        return function (this: unknown) {
            if (timerId) {
                clearTimeout(timerId);
            }
            timerId = setTimeout(() => {
                timerId = null;
                fn.apply(this);
            }, ms);
        };
    }
}


export const createObjectSpliter = (
    speicalProps: string | string[] | ((prop: string) => boolean)
) => {
    const propsSet = new Set(
        isString(speicalProps)
            ? speicalProps.split(',')
            : isArray(speicalProps)
                ? speicalProps
                : []
    );

    const has = isFunction(speicalProps)
        ? speicalProps
        : (prop: string) => propsSet.has(prop);

    return <T>(o: Record<string, T>): [Record<string, T>, Record<string, T>, number] => {
        const keys = Object.keys(o);
        if (keys.every((k) => !has(k))) return [{}, o, 0];

        let count = 0;
        const left: Record<string, T> = {};
        const right: Record<string, T> = {};

        for (const key of keys) {
            if (has(key)) {
                left[key] = o[key];
                count++;
            } else {
                right[key] = o[key];
            }
        }

        return [left, right, count];
    };
}
