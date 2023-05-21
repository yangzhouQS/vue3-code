import {defineComponent, onMounted, ref} from "vue"

export const Formily = defineComponent({
	name: 'Formily',
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
