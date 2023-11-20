import {defineComponent, ref, reactive, watch} from 'vue';
import {cloneDeep} from 'lodash'
import {EditPen} from '@element-plus/icons-vue';
import {ClickOutside} from 'element-plus'
import {NodeUtils} from "@/pages/flow/utils/flow-util";


interface IPropStateType {
  /**
   * 节点配置属性
   */
  properties: Record<string, any>;

  /**
   * 标题是否处于修改可输入状态
   */
  isTitleInput: boolean

  /**
   * 节点层级调整的优先级
   */
  priorityLength: number
}

export const FlowNodeProp = defineComponent({
  name: 'FlowNodeProp',

  directives: {clickOutside: ClickOutside,},
  emits: ['update:drawerPage', 'cancel', 'confirm'],
  props: {
    /**
     * 是否打开抽屉
     */
    drawerPage: Boolean,
    /**
     * 当前节点数据
     */
    activeConfig: Object,
    /**
     *  整个节点数据
     */
    processData: Object
  },
  setup(props, {emit}) {
    // data
    const data = ref<any>({});
    const state = reactive<IPropStateType>({
      properties: {},
      isTitleInput: false,
      priorityLength: 0
    })

    // methods
    const methods = {
      loadData: () => {
        //
      },
      closeDrawer: () => {
        emit('update:drawerPage', false)
      },
      /*取消操作,数据不发生变更*/
      onCancel: () => {
        emit('cancel', {})
      },
      /*节点数据发生改变,提交确定,在flow页面统一修改*/
      onConfirm: () => {
        emit('confirm', {})
      },
      getPriorityLength: () => {
        state.priorityLength = 3
      },

      /*节点提示渲染*/
      renderHeader: () => {
        console.log(props.activeConfig);
        if (props.activeConfig?.type === 'start') {
          return <div>{state.properties.title}</div>
        }
        return <div class={'d-flex align-center'}>
          <div class={'d-flex align-center'}>
            <span
              class={'cursor-pointer'}
              onClick={() => {
                state.isTitleInput = true
              }}
              v-show={!state.isTitleInput}
            >
              {state.properties.title}
              <el-icon class={'ml-2'}><EditPen/></el-icon>
            </span>
            <el-input
              size={'small'}
              v-model={state.properties.title}
              v-show={state.isTitleInput}
              v-clickOutside={_ => state.isTitleInput = false}
              style="z-index:9;max-width: 200px;"
            />
          </div>
        </div>
      },
      /*节点可操作内容渲染*/
      renderDefault: () => {
        return <div class={'d-flex flex-column full-container'}>
          <div class={'flex-1'}></div>
          <div class={'d-flex justify-end'}>
            <el-button plain={true} type="default" size={'default'} onClick={methods.onCancel}>取消</el-button>
            <el-button type="primary" size={'default'} onClick={methods.onConfirm}>保存</el-button>
          </div>
        </div>
      },
    };

    watch(() => props.activeConfig, (newValue,) => {
      if (newValue && newValue.properties) {
        state.properties = cloneDeep(newValue.properties)
        if (state.properties) {
          // 是否为条件分支
          NodeUtils.isConditionNode(newValue) && methods.getPriorityLength();
        }
      }
    })
    return () => {
      return <el-drawer
        v-model={props.drawerPage}
        onClose={methods.closeDrawer}
        append-to-body={true}
      >
        {{
          header: methods.renderHeader,
          default: methods.renderDefault
        }}
      </el-drawer>
    };
  }
});
