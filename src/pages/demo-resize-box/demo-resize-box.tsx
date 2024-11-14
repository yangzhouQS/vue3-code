import {defineComponent} from 'vue';
import ResizeBox from "../../components/_components/resize-box/resize-box.vue";

export const DemoResizeBox = defineComponent({
  name: 'DemoResizeBox',
  setup(props) {
    return () => {
      return <div style={{width: "1000px", height: '420px', border: '1px solid green'}}>
        component name: DemoResizeBoxxxxxasxsa
        <ResizeBox
          directions={['right', 'bottom']}
          style={{width: '500px', minWidth: '100px', maxWidth: '100%', height: '200px', textAlign: 'center'}}
        >
          <a-typography-paragraph>We are building the future of content discovery and creation.</a-typography-paragraph>
          <a-divider/>
          <a-typography-paragraph>
            ByteDance's content platforms enable people to enjoy content powered by AI technology. We
            inform, entertain, and inspire people across language, culture and geography.
          </a-typography-paragraph>
          <a-divider>ByteDance</a-divider>
          <a-typography-paragraph>Yiming Zhang is the founder and CEO of ByteDance.</a-typography-paragraph>
        </ResizeBox>
      </div>
    }
  }
})
