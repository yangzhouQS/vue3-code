import {defineComponent, onMounted, ref} from "vue"
import {BuiltinSimulatorHostView as Simulator} from "@/pages/frame/builtin-simulator/host-view";

export const DocumentView = defineComponent({
	name: 'DocumentView',
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
				<div class={'lc-simulator-shell full-container'}>
          <Simulator/>
				</div>
			)
		}
	}
})
