import {defineComponent, onMounted, ref} from "vue"
import "./bem-tools.less";
import "./borders.less";

export const BemTools = defineComponent({
  name: 'BemTools',
  props: {},
  setup() {

    return () => {
      return (
        <div class={'lc-bem-tools'} style="transform: translate(0px, 0px);">

        </div>
      )
    }
  }
})
