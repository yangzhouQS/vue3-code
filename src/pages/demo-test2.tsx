import {defineComponent, ref} from 'vue'
import TestDemo from "./test-demo";
import {observable} from '@formily/reactive'
import {observer} from '@formily/reactive-vue'

const obs = observable({
  value: 'Hello world1243'
})
export default observer(defineComponent({
  name: 'demo-test',
  setup(props) {
    const theme = ref('light')
    const onClick = () => {
      console.log(`toggle:`, theme.value)
      theme.value = theme.value === 'dark' ? 'light' : 'dark'
      console.log('toggle theme end:', theme.value)
    }
    return () => {
      const onInput = (e) => {
        obs.value = e.target.value
        console.log(e.target.value, obs.value)

      }
      return (
        <div class='test'>
          test - theme = {theme.value}
          <button onClick={onClick}>切换操作</button>
          <TestDemo theme={theme.value}/>

          <hr/>
          <el-input v-model={obs.value} placeholder="placeholder"></el-input>
          <input placeholder="placeholder" onInput={onInput}></input>
          <p>
            <el-tag type="success">{obs.value}</el-tag>
          </p>
        </div>
      )
    }
  }
}))
