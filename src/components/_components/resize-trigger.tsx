import {useRender} from "../../utils/useRender";
import {computed, defineComponent, PropType, toRefs} from 'vue';
import IconDragDot from './_icon/drag-dot.svg';
import IconDragDotVertical from './_icon/drag-dot-vertical.svg';
import ResizeObserver from './resize-observer';

export const ResizeTrigger = defineComponent({
  name: 'ResizeTrigger',
  props: {
    prefixCls: {
      type: String,
      required: true,
    },
    direction: {
      type: String as PropType<'horizontal' | 'vertical'>,
      default: 'horizontal',
    },
  },
  setup(props, {emit}) {

    const {direction, prefixCls} = toRefs(props);
    const isHorizontal = computed(() => direction?.value === 'horizontal');
    const classNames = computed(() => [
      prefixCls.value,
      {
        [`${prefixCls.value}-horizontal`]: isHorizontal.value,
        [`${prefixCls.value}-vertical`]: !isHorizontal.value,
      },
    ]);
    const onResize = (entry: ResizeObserverEntry) => {
      emit('resize', entry);
    };

    useRender(() => {
      return <ResizeObserver onResize="onResize">
        <div class={classNames.value}>
          {/*@slot 自定义内容*/}
          <slot>
            <div class={`${prefixCls}-icon-wrapper`}>
              {/*@slot 自定义 icon*/}
              <slot name="icon">
                {isHorizontal.value ? (<IconDragDot v-if="isHorizontal" class="`${prefixCls}-icon`"/>) : (
                  <IconDragDotVertical v-else class="`${prefixCls}-icon`"/>)}
              </slot>
            </div>
          </slot>
        </div>
      </ResizeObserver>
    })
  }
})
