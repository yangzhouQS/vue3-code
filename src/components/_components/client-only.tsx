import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'ClientOnly',
  setup(_, { slots }) {
    const mounted = ref(false);
    onMounted(() => (mounted.value = true));

    // 挂在我完成后渲染
    return () => {
      if (mounted.value) {
        return slots.default?.();
      }
      return null;
    };
  },
});
