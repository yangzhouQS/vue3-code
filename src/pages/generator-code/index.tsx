import {defineComponent, onMounted, ref} from "vue"
import request from "../../utils/http";

export const GeneratorCode = defineComponent({
  name: 'GeneratorCode',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  setup: function () {
    // data
    const allTables = ref([])

    // methods
    const methods = {
      loadData: () => {

      },
      loadAllTables: async () => {
        try {
          allTables.value = await request.get('/allTables')
        } catch (e) {

        }
      }
    }

    onMounted(() => {
      methods.loadAllTables()
    })

    return () => {
      return (
        <div className={'full-container d-flex'}>
          <div
            style={{width: '300px'}}
            className={'border-solid border'}
          >
            <el-scrollbar style={{height: '100%'}}>
              {allTables.value.map((table) => {
                return <div
                  className={'table-item d-flex justify-space-between pa-1'}
                  key={table.table_name}
                  title={table.table_comment || table.table_name}
                >
                  <div className={'flex-1 text-truncate'} >
                    {table.table_name}
                  </div>
                  <div
                    style={{width: '100px'}}
                    className={'text-truncate text-right'}
                  >
                    {table.table_comment}
                  </div>
                </div>
              })}
            </el-scrollbar>
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
