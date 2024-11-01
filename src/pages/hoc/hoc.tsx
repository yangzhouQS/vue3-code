import {defineComponent, ref, h} from 'vue';
import {TestPage} from "./test-page";
import {createForwardRef} from "./forward-ref";


const Div = defineComponent({
  setup() {
    const age = ref(16);

    return () => {
      return <div>
        age = {age.value}
      </div>
    }
  }
})

export const HocPage = defineComponent({
  name: 'HocPage',
  setup(props) {
    const pageRef = ref()
    const instance = ref()
    const rawRef = ref()

    window.AssemInstance = instance
    window.AssemRawRef = rawRef

    const override = {
      // ...
      id: "test-inner-id",
      innerAge: 777
    }
    // Assign `forwardRef` to the component that needs to be forwarded,
    // and the first parameter allows you to pass in the ref already defined
    const forwardRef = createForwardRef(null, override)

    const handleClick = () => {
      if (!forwardRef)return
      debugger;
      forwardRef.value.$props.key = 100

      console.log(forwardRef);
      debugger;
    }
    return () => {

      return <div>
        <el-button
          type="primary"
          onClick={handleClick}
        >
          测试
        </el-button>
        <TestPage ref={forwardRef} a={10}>
          xxx
        </TestPage>
      </div>

      /*return <div>
        <el-button
          type="primary"
          onClick={() => {
            console.log(instance.value);
            console.log(rawRef.value);
          }}
        >
          测试
        </el-button>
        {
          h(
            createHoc(Div, {id: "id", class: 'a'}, true),
            {
              ref: instance.value
            }
          )
        }
      </div>*/
      /*return h(
        createHoc(
          Div,
          {
            id: 'id',
            class: 'class'
          },
          true
        ),
        {
          ref: instance
        },
      )*/
    };
  }
});
