import {defineComponent, ref, computed, watch, reactive} from 'vue';

class AssemPanelDock {
  private _assemPanel?: AssemPanel;
  readonly state = reactive({
    visible: false,
    actived: computed(() => this._assemPanel?.state.visible)
  })

  constructor() {
    this._assemPanel = new AssemPanel();
  }

  togglePanel() {
    this._assemPanel?.toggle();
  }
}


class AssemPanel {
  readonly state = reactive({
    actived: false,
    visible: false
  })

  constructor() {

  }

  toggle() {
    this.state.actived = !this.state.actived
    this.state.visible = !this.state.visible
  }

}


export const DemoClassRelation = defineComponent({
  name: 'DemoClassRelation',
  setup(props) {
    const assemPanelDock = new AssemPanelDock();
    const actived = ref(false)
    const handleClick = () => {
      assemPanelDock.togglePanel();
      console.log(assemPanelDock);
    }
    watch(() => assemPanelDock.state, (val) => {
      actived.value = assemPanelDock.state.actived
    }, {immediate: true, deep: true});
    return () => {
      return <div>
        <el-button onClick={handleClick}>测试</el-button>
        actived = {actived.value.toString()} \\\
        component name: DemoClassRelation
      </div>
    }
  }
})
