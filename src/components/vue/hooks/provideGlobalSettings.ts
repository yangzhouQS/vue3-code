import {
  provide,
  reactive,
  readonly,
  toRefs,
} from 'vue';
// We use symbols as unique identifiers.
export const UserSettingsStateSymbol = Symbol('User settings state provider identifier');
export const UserSettingsUpdateSymbol = Symbol('User settings update provider identifier');
export default {
  setup() {
    const state = reactive({
      language: 'en',
      theme: 'light',
    });


    // Using `toRefs()` makes it possible to use
    // spreading in the consuming component.
    // Making the return value `readonly()` prevents
    // users from mutating global state.
    provide(UserSettingsStateSymbol, toRefs(readonly(state)));

    const update = (property, value) => {
      state[property] = value;
    };
    provide(UserSettingsUpdateSymbol, update);
  },
  render() {
    return this.$slots.default()
  }
}
