import {
  provide,
  reactive,
  readonly,
  toRefs,
} from 'vue';
// We use symbols as unique identifiers.
export const GlobalSettingsStateSymbol = Symbol('global settings state provider identifier');
export default {
  setup() {
    const state = reactive({
      prefixCls: 'en',
      theme: 'light',
      variables: Object,
      position: 'fixed',
    });


    // Using `toRefs()` makes it possible to use
    // spreading in the consuming component.
    // Making the return value `readonly()` prevents
    // users from mutating global state.
    provide(GlobalSettingsStateSymbol, toRefs(readonly(state)));

    const update = (property, value) => {
      state[property] = value;
    };
    provide(GlobalSettingsStateSymbol, update);
  },
  render() {
    return this.$slots.default()
  }
}
