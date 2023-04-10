import {defineComponent, onMounted, nextTick, VNodeRef} from 'vue';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import "./style.less";
import Scrollbar from 'smooth-scrollbar';

export const ScrollBar = defineComponent({
  name: 'ScrollBar',
  setup() {
    onMounted(() => {

    });
    const domMounted = (dom: HTMLElement | undefined) => {
      if (dom) {
        Scrollbar.init(dom, {
          alwaysShowTracks: true
        });

        /*const ps = new PerfectScrollbar(dom, {
          wheelSpeed: 2,
          wheelPropagation: true,
          minScrollbarLength: 20
        });*/
      }
    };
    return () => {
      return (<div class={'test'}>
        <div id="container" ref={domMounted}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto assumenda dolore facere officiis,
          perspiciatis provident quis? Aliquid deleniti dolore esse ipsum iste odio tenetur vel velit. Autem blanditiis
          consequuntur doloribus dolorum eligendi nemo omnis pariatur tempora ut voluptatem! At doloribus quisquam
          ratione tempora voluptatum? Consectetur deleniti doloribus, est et eum ipsam iste non odio recusandae
          voluptatum. Beatae commodi deserunt distinctio dolorem doloremque, eius eligendi est eveniet excepturi iure
          nam nisi, numquam pariatur quidem rem rerum saepe sit, temporibus ullam ut? Ab amet at aut debitis deleniti
          dolore dolorem dolorum ex fugiat magnam odit porro, tenetur, velit? Assumenda dolorem labore sint.
          <div style={{width: '800px', height: '200px', background: 'red'}}>

          </div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto aspernatur assumenda debitis deleniti
          eos, error est illo impedit inventore iste magni nesciunt nihil non perferendis porro quae, quam quisquam quo
          quod repellendus tempora, tempore totam ullam unde vel velit vero? Ad amet beatae commodi corporis facilis
          fugit illo minima officiis reiciendis sequi! Hic magni modi molestias nisi nobis placeat qui, quia quis
          repudiandae voluptatum! Accusantium amet atque consectetur, consequuntur, doloremque fugiat, harum in ipsam
          neque omnis quae qui quibusdam ratione reiciendis repellat repudiandae similique? Architecto, consequuntur
          fugiat ipsum natus reprehenderit sint. A error fugit praesentium repellat similique unde, veritatis. Sequi.
        </div>

      </div>);
    };
  }
});
