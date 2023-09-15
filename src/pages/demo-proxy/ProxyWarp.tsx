import { defineComponent, onMounted, ref, getCurrentInstance } from "vue"
import { RuntimeScope } from "@/pages/demo-proxy/scope";

export const ProxyWarp = defineComponent({
    name: 'ProxyWarp',
    props: {
        proxiKey: {
            type: [ Symbol, String ],
            required: true,
        }
    },
    inheritAttrs: false,
    setup(props, { slots,attrs }) {
        console.log(attrs);
        // 将全局属性配置应用到 scope 中
        const instance = getCurrentInstance()!;
        const scope = instance.proxy as RuntimeScope;
        console.log(scope);

        return () => {
            if (props.proxiKey) {

            }
            return (
                <>
                    {slots.default?.()}
                </>
            )
        }
    }
})
