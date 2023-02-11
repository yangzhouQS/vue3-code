import {defineComponent, ref} from 'vue'
import TestDemo from "@/pages/test-demo";

export default defineComponent({
  name: 'test',
  setup(props) {
    const theme = ref('light')
    const onClick = () => {
      console.log(`toggle:`, theme.value)
      theme.value = theme.value === 'dark' ? 'light' : 'dark'
      console.log('toggle theme end:', theme.value)
    }
    return () => {
      return (
        <div class='test'>
          test - theme = {theme.value}
          <button onClick={onClick}>切换操作</button>
          <TestDemo theme={theme.value}/>
        </div>
      )
    }
  }
})
