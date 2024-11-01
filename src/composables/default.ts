// Utilities
import { computed, inject, provide, ref, shallowRef, unref, watchEffect } from 'vue'

// Types
import type {ComputedRef, InjectionKey, Ref, VNode} from 'vue'
import {MaybeRef, mergeDeep} from "../utils/helpers";

export type DefaultsInstance = undefined | {
  [key: string]: undefined | Record<string, unknown>
  global?: Record<string, unknown>
}

export type DefaultsOptions = Partial<DefaultsInstance>

export const DefaultsSymbol: InjectionKey<Ref<DefaultsInstance>> = Symbol.for('vuetify:defaults')

export function createDefaults(options?: DefaultsInstance): Ref<DefaultsInstance> {
  return ref(options)
}

export function injectDefaults() {
  const defaults = inject(DefaultsSymbol)

  if (!defaults) throw new Error('[Vuetify] Could not find defaults instance')

  return defaults
}

export function provideDefaults(
  defaults?: MaybeRef<DefaultsInstance | undefined>,
  options?: {
    disabled?: MaybeRef<boolean | undefined>
    reset?: MaybeRef<number | string | undefined>
    root?: MaybeRef<boolean | string | undefined>
    scoped?: MaybeRef<boolean | undefined>
  }
) {
  const injectedDefaults = injectDefaults()
  const providedDefaults = ref(defaults)

  const newDefaults = computed(() => {
    const disabled = unref(options?.disabled)

    if (disabled) return injectedDefaults.value

    const scoped = unref(options?.scoped)
    const reset = unref(options?.reset)
    const root = unref(options?.root)

    if (providedDefaults.value == null && !(scoped || reset || root)) return injectedDefaults.value

    let properties = mergeDeep(providedDefaults.value, { prev: injectedDefaults.value })

    if (scoped) return properties

    if (reset || root) {
      const len = Number(reset || Infinity)

      for (let i = 0; i <= len; i++) {
        if (!properties || !('prev' in properties)) {
          break
        }

        properties = properties.prev
      }

      if (properties && typeof root === 'string' && root in properties) {
        properties = mergeDeep(mergeDeep(properties, { prev: properties }), properties[root])
      }

      return properties
    }

    return properties.prev
      ? mergeDeep(properties.prev, properties)
      : properties
  }) as ComputedRef<DefaultsInstance>

  provide(DefaultsSymbol, newDefaults)

  return newDefaults
}
