import {defineComponent, onMounted, ref} from "vue"
import Gesto from "gesto";

export const gesto = defineComponent({
  name: 'gesto',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  setup() {
    // data
    const menuConfig = ref([])

    // methods
    const methods = {
      loadData: () => {

      }
    }

    onMounted(() => {
      let tx = 0;
      let ty = 0;
      let scale = 1;

      const target = document.querySelector('.gesto-container');
      const getso = new Gesto(target, {
        container: window,
        pinchOutside: true,
      }).on("drag", e => {
        tx += e.deltaX;
        ty += e.deltaY;
        target.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
      }).on("pinchStart", e => {
        e.datas.scale = scale;
      }).on("pinch", e => {
        scale = e.datas.scale * e.scale;
        target.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
      });
    })

    return () => {
      return (
        <div class={'full-container'}>
          xxx

          <div
            class={'gesto-container'}
            style={{width: '100px', height: '100px', backgroundColor: '#e71414'}}></div>
        </div>
      )
    }
  }
})
