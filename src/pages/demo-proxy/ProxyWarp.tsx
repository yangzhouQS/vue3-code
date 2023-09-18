import {
    defineComponent, onMounted, ref, getCurrentInstance,
    type InjectionKey,
    inject,
    provide,
    onUnmounted,
} from "vue"
import { RuntimeScope } from "@/pages/demo-proxy/scope";
import { debounce, initProvide } from "@/pages/demo-proxy/utils";
import { useRendererContext } from "@/pages/demo-proxy/reneder-context";

const HOC_NODE_KEY: InjectionKey<{ rerenderSlots: () => void }> = Symbol('hocNode');

const useHocNode = (rerenderSlots: () => void) => {
    const { rerender } = useRendererContext();
    const parentNode = inject(HOC_NODE_KEY, null);
    const debouncedRerender = debounce(rerenderSlots);

    // 导出
    provide(HOC_NODE_KEY, {
        rerenderSlots: debouncedRerender,
    });

    if (!parentNode) {
        return {
            rerender: debouncedRerender,
            rerenderRoot: rerender,
            rerenderParent: rerender,
        };
    } else {
        // 父级render和当前节点render建立关连关系
        return {
            rerender: debouncedRerender,
            rerenderRoot: rerender,
            rerenderParent: parentNode.rerenderSlots,
        };
    }
}

export const ProxyWarp = defineComponent({
    name: 'ProxyWarp',
    props: {
        proxyKey: {
            type: [ Symbol, String ],
            required: true,
        }
    },
    inheritAttrs: false,
    setup(props, { slots, attrs }) {


        console.log(attrs);
        // 将全局属性配置应用到 scope 中
        const instance = getCurrentInstance()!;
        const scope = instance.proxy as RuntimeScope;
        console.log(scope);

        const updateSchema = () => {

        }

        const { rerender, rerenderRoot, rerenderParent } = useHocNode(()=>{
            console.log('update');
        });

        const listenRecord: Record<string, () => void> = {};
        onUnmounted(() =>
            Object.keys(listenRecord).forEach((k) => {
                listenRecord[k]();
                delete listenRecord[k];
            })
        );

        console.log('rerenderParent');
        console.log(rerenderParent);
        return () => {
            if (props.proxyKey) {
                initProvide(scope.$.parent, props.proxyKey, { data: scope.$.data })
            }
            return (
                <>
                    {slots.default?.()}
                </>
            )
        }
    }
})
