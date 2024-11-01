import {defineComponent, onMounted, ref} from "vue"
import {defineSchema, useFormily} from "../../components/vue-formily";
export const Formily = defineComponent({
	name: 'Formily',
	props: {
		title: {
			type: String,
			default: ''
		}
	},
	setup() {
    const loginForm = defineSchema({
      formId: "login",
      fields: [
        {
          formId: "email",
          type: "string",
          format: "{raw}",
          value: "",
          rules: [
            {
              message: "Please enter email address."
            },
            {
              message: "Please enter valid email address."
            }
          ],
          props: {
            label: "email",
            inputType: "email"
          }
        },
        {
          formId: "password",
          type: "string",
          rules: [
            {
              // ...required,
              message: "Please enter password."
            }
          ],
          value: "",
          props: {
            label: "password",
            inputType: "password"
          }
        }
      ]
    })

    const formily = useFormily();
    formily.addForm(loginForm);

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
