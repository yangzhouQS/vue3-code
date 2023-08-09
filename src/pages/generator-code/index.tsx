import {defineComponent, onMounted, ref} from "vue"
import request from "@/utils/http";

export const GeneratorCode = defineComponent({
  name: 'GeneratorCode',
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

      },
      loadAllTables: async () => {
        const data = await request.get('/allTables')
        console.log(data)
        debugger
      }
    }

    onMounted(() => {
      methods.loadAllTables()
    })

    return () => {
      return (
        <div className={'full-container d-flex'}>
          <div
            style={{width: '200px'}}
            className={'border-solid border'}
          >
            1
          </div>

          <div style={{width: '200px'}} className={'border-solid border mx-2'}>
            2
          </div>
          <div className={'flex-1 border-solid border'}>

          </div>
        </div>
      )
    }
  }
})
