import {
  defineComponent, onMounted, ref,
  h,
  Fragment,
  watch,
  shallowRef
} from "vue"
import type {
  PropType,
} from 'vue';
import * as ElementPlus from 'element-plus'
import {buildSchema, IPublicTypeNodeSchema, isFragment, SlotSchemaMap} from "../use";

export const Hoc = defineComponent({
  name: 'Hoc',
  inheritAttrs: false,
  props: {
    __comp: {
      type: String,
      required: true,
    },
    /*__components: {
      type: Object as PropType<Record<string, Component>>,
      required: true,
    },*/
    __props: {
      type: Object,
      default: () => ({}),
    },
    __schema: {
      type: Object as PropType<any>,
      default: () => ({}),
    },
    __vnodeProps: {
      type: Object as PropType<Record<string, unknown>>,
      default: () => ({}),
    },
    __isRootNode: Boolean,
  },
  setup(props, {slots, attrs}) {
    const showNode = shallowRef(true);
    const nodeSchmea = shallowRef(props.__schema);
    const slotSchema = shallowRef<SlotSchemaMap>();

    const updateSchema = (newSchema: IPublicTypeNodeSchema) => {
      nodeSchmea.value = newSchema;
      slotSchema.value = buildSchema(newSchema, node).slots;
    };


    watch(
      () => props.__schema,
      (newSchema) => updateSchema(newSchema)
    );


    return () => {
      const {__comp: comp, __vnodeProps: vnodeProps, __props: compProps} = props;

      if (comp) {
        if (isFragment(comp)) {

          return h(Fragment, {}, slots.default?.())
          // return h(Fragment, builtSlots.default?.())
        } else {
          return h(ElementPlus[comp], {
            ...compProps,
            ...attrs
          }, slots.default?.())
          // return h(comp, mergeProps(compProps, vnodeProps), builtSlots)
        }
      } else {
        return h('div', 'component not found');
      }


      return comp ? isFragment(comp) ?
          h(Fragment, slots?.default?.()) : h(comp)
        : h('div', 'component not found');
    }
  }
})
