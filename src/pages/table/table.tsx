import {defineComponent, ref} from 'vue';
import type {TableColumnCtx} from 'element-plus'

interface User {
  date: string
  name: string
  address: string
}

export const TablePage = defineComponent({
  name: 'TablePage',
  setup(props) {
    // methods
    const methods = {
      loadData: () => {
        //
      }
    };

    const formatter = (row: User, column: TableColumnCtx<User>) => {
      return row.address
    }

    const tableData: User[] = [
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ]
    return () => {
      return <div class={'full-container'}>
        <el-table
          data={tableData}
          default-sort={{prop: 'date', order: 'descending'}}
          style={{width: '100%'}}
        >
          <el-table-column prop="date" label="Date" sortable width="180">
            {{
              default: ({row, $index}) => {
                return <>
                  {$index} - {row.date}
                </>
              }
            }}
          </el-table-column>
          <el-table-column prop="name" label="Name" width="180"/>
          <el-table-column
            prop="address"
            label="Address"
            formatter={formatter}
          />
        </el-table>
      </div>;
    };
  }
});
