import {defineComponent, onMounted, ref} from "vue"

export const DragGhost = defineComponent({
	name: 'DragGhost',
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
          DragGhost
				</div>
			)
		}
	}
})
