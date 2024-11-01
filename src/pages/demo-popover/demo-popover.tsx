import {defineComponent, ref} from 'vue';
import {Popover} from "../../components/popover/popover";

export const DemoPopover = defineComponent({
  name: 'DemoPopover',
  setup(props) {
    const visible = ref(false);
    return () => {
      return <div class={'pa-12'}>
        <Popover v-model:visible={visible.value} placement={'bottom'} v-model:visible={visible.value}>
          {{
            reference: () => {
              return <el-button>点击</el-button>;
            },
            content: () => {
              return <div>内容</div>
            }
          }}
        </Popover>
        <Popover placement={'left'} showArrow={false} theme={'light'}  closeOnClickOutside={false}>
          {{
            reference: () => {
              return <el-button>带箭头</el-button>;
            },
            content: () => {
              return <div>带箭头</div>
            }
          }}
        </Popover>
      </div>
    }
  }
})
