import {defineComponent} from 'vue';
import './style.less'
import {scroll} from '../../directives/scroll/scroll'

export const DemoDirectives = defineComponent({
  name: 'DemoDirectives',
  directives: {
    scroll
  },
  setup(props) {
    const onScroll = (evt: Event) => {
      console.log('onScroll', evt);
    }
    return () => {
      return <div>
        <div class={'warp'} v-scroll={onScroll}>
          component name: DemoDirectives
          <div style={{height: '2002px', background: 'red'}}>

          </div>
        </div>
      </div>
    }
  }
})
