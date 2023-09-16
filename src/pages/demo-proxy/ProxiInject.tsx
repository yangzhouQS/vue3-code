import { defineComponent, onMounted, ref, getCurrentInstance } from "vue"


/*
使用方式
<proxi :proxi-key="key" [... attr / :prop / @listener]>
key is used to communicate with the Child. Use a unique string value or a Symbol

<proxi :proxi-key="key" :count="count" @increment="increment">
      <slot />
</proxi>

* */

const injection = '_proxi_';

const emptyObject = Object.freeze({});
const baseProxi = {
    class: undefined,
    listeners: emptyObject,
    attrs: emptyObject,
    props: emptyObject,
};
export const ProxyInject = defineComponent({
    name: 'ProxyInject',
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

        })

        return () => {
            return (
                <div class={'full-container'}>
                    xxx
                </div>
            )
        }
    }
})
