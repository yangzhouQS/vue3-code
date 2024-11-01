import { defineComponent, onMounted, ref, computed } from "vue"
import {ProxyWarp} from "./ProxyWarp";


export const PageButton = defineComponent({
    name: 'PageButton',
    emits: [ 'add' ],
    props: {},
    setup(props, { emit, attrs }) {
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

        const comProps = computed({
            get: () => {
                console.log('attrs', attrs);
                return attrs ?? {};
            },
            set: (val: any) => {

            }
        })

        return () => {
            return (
                <el-button onClick={methods.handleOnClick} {...comProps.value}>
                    page 测试按钮
                </el-button>
            )
        }
    }
})


export const DemoProxy = defineComponent({
    name: 'DemoProxy',
    props: {
        proxiKey: {
            type: [ Symbol, String ],
        }
    },
    setup() {
        // data
        const type = ref('default')
        const proxyRef = ref()

        // methods
        const methods = {
            loadData: () => {

            },
            handleClick: () => {
                const v = Date.now() % 3
                if (v === 0) {
                    type.value = 'primary'
                } else if (v === 1) {
                    type.value = 'danger'
                } else if (v === 2) {
                    type.value = 'warning'
                }

                console.log(proxyRef.value);
            }
        }

        onMounted(() => {

        })

        return () => {
            return (
                <div class={'full-container'}>
                    DemoProxy
                    <el-button
                        type="primary"
                        onClick={methods.handleClick}
                    >
                        测试按钮
                    </el-button>
                    <br/>
                    <ProxyWarp
                        proxyKey={"hello"}
                        __comp={'el-button'}
                        onAdd={(val) => {
                            console.log(val);
                        }}
                        a={1}
                        b={'hello'}
                        type={type.value}
                        ref={proxyRef}
                    >
                        <PageButton/>
                    </ProxyWarp>
                </div>
            )
        }
    }
})
