import { defineComponent, onMounted, ref } from "vue"
import { ProxyWarp } from "@/pages/demo-proxy/ProxyWarp";


export const Page = defineComponent({
    name: 'Page',
    emits: [ 'add' ],
    props: {
        title: {
            type: String,
            default: ''
        }
    },
    setup(props, { emit }) {
        // data
        const menuConfig = ref([])

        // methods
        const methods = {
            loadData: () => {

            },
            handleOnClick: () => {
                emit('add', 123)
            }
        }

        onMounted(() => {

        })

        return () => {
            return (
                <div class={'full-container'}>
                    <el-button onClick={methods.handleOnClick}>
                        测试按钮
                    </el-button>
                </div>
            )
        }
    }
})


export const DemoProxy = defineComponent({
    name: 'DemoProxy',
    props: {
        proxiKey: {
            type: [ Symbol, String ],
            required: true,
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

        })

        return () => {
            return (
                <div class={'full-container'}>
                    DemoProxy
                    <ProxyWarp
                        proxiKey={"hello"}
                        onAdd={(val) => {
                            console.log(val);
                        }}
                        a={1}
                        b={'hello'}
                    >
                        <Page/>
                    </ProxyWarp>
                </div>
            )
        }
    }
})
