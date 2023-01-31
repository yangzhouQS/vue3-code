import {defineComponent, ref, onMounted, onUnmounted, computed, watch} from 'vue'
import './ghost.less'
import {IPublicModelDragObject} from "../../drag-object";

export const DragGhost = defineComponent({
    name: 'drag-ghost',
    props: {
        dragon: {
            type: Object
        }
    },
    setup(props) {
        const x = ref(0)
        const y = ref(0)
        const title = ref()
        const dispose: any[] = []

        onMounted(() => {
            const {dragon} = props
            if (dragon) {
                dispose.push(
                    // 拖拽对象开始拖拽
                    dragon.onDragstart((e => {

                        // 原生拖拽事件不处理
                        if (e.originalEvent.type.slice(0, 4) === 'drag') {
                            return;
                        }
                        title.value = getTitles(e.dragObject)
                        x.value = e.globalX
                        y.value = e.globalY
                    })),

                    // 拖拽过程
                    dragon.onDrag((e => {
                        x.value = e.globalX
                        y.value = e.globalY
                    })),

                    // 拖拽结束
                    dragon.onDragend((() => {
                        title.value = null
                        x.value = 0
                        y.value = 0
                    }))
                )
            }
        })
        onUnmounted(() => {
            // 组件卸载时销毁监听事件
            if (dispose) {
                dispose.forEach(off => off())
            }
        })

        // computed

        // methods
        // 先返回组件的名称
        function getTitles(dragObject: IPublicModelDragObject) {
            if (dragObject.type === "nodedata") {
                return dragObject.data?.componentName
            }
            return '组件名称获取失败'
        }

        return () => {
            return <div class="assembox-ghost-group" style={{
                left: `${x.value}px`,
                top: `${y.value}px`
            }}>
                <div class="assembox-ghost">
                    {title.value ? title.value : "默认title"}
                </div>
            </div>
        }
    },
})
