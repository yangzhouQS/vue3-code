import {defineComponent, ref} from 'vue';
import type {TableColumnCtx} from 'element-plus'

interface User {
  id: number
  date: string
  name: string
  address: string
  hasChildren?: boolean
  children?: User[]
}

export const TablePage = defineComponent({
  name: 'TablePage',
  setup(props) {
    const tableRef = ref()
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
        id: 1,
        date: '2016-05-02',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        id: 2,
        date: '2016-05-04',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        id: 3,
        date: '2016-05-01',
        name: 'wangxiaohu',
        hasChildren: true,
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        id: 4,
        date: '2016-05-03',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ]

    const load = (row: User,
                  treeNode: unknown,
                  resolve: (date: User[]) => void) => {
      debugger;
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: '2016-05-01',
            name: 'wangxiaohu',
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            id: 32,
            date: '2016-05-01',
            name: 'wangxiaohu',
            address: 'No. 189, Grove St, Los Angeles',
          },
        ])
      }, 1000)
    }

    return () => {
      return <div class={'full-container'}>
        <el-button type="primary" onClick={()=>{
          console.log(tableRef);
        }}>测试</el-button>
        <el-table
          ref={tableRef}
          border={true}
          lazy={true}
          data={tableData}
          default-sort={{prop: 'date', order: 'descending'}}
          style={{width: '100%'}}
          row-key={'id'}
          load={load}
          tree-props={{ children: 'children', hasChildren: 'hasChildren' }}
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
