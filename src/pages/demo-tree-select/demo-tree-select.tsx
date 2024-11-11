import {defineComponent, ref} from 'vue';
import {ElMessage as GlobalMessage} from 'element-plus';
import {map,} from 'lodash-es';
import {CircleCheck} from "@element-plus/icons-vue";

export const DemoTreeSelect = defineComponent({
  name: 'DemoTreeSelect',
  setup(props) {
    const apiconfig = ref('')
    const apiTreeListOptions = ref([
      {
        "value": "groupName_m3cu7p68",
        "isGroup": true,
        "disabled": true,
        "label": "--我是很长很长的分组名称-",
        "children": [
          {
            "groupName": "--我是很长很长的分组名称-",
            "value": "CBD",
            "description": "CBD",
            "label": "CBD"
          }
        ]
      },
      {
        "value": "groupName_m3cu7p69",
        "isGroup": true,
        "disabled": true,
        "label": "默认分组",
        "children": [
          {
            "groupName": "默认分组",
            "value": "4343",
            "description": "4343443",
            "label": "4343443"
          },
          {
            "groupName": "默认分组",
            "value": "434343",
            "description": "4343fgrgfrtg",
            "label": "4343fgrgfrtg"
          },
          {
            "groupName": "默认分组",
            "value": "aaaaaa",
            "description": "csdcsd ",
            "label": "csdcsd "
          },
          {
            "groupName": "默认分组",
            "value": "ac",
            "description": "csdcds",
            "label": "csdcds"
          },
          {
            "groupName": "默认分组",
            "value": "cd",
            "description": "cds",
            "label": "cds"
          },
          {
            "groupName": "默认分组",
            "value": "configData",
            "description": "获取全局配置",
            "label": "获取全局配置"
          },
          {
            "groupName": "默认分组",
            "value": "cscsdcdsa32233232",
            "description": "4343434343",
            "label": "4343434343"
          },
          {
            "groupName": "默认分组",
            "value": "csdcds",
            "description": "cd成都诗词大赛成都市",
            "label": "cd成都诗词大赛成都市"
          },
          {
            "groupName": "默认分组",
            "value": "csdcdsaaa",
            "description": "尺寸是的是的粗糙度成都市成都市承担少食多餐",
            "label": "尺寸是的是的粗糙度成都市成都市承担少食多..."
          },
          {
            "groupName": "默认分组",
            "value": "xcscsdcsd",
            "description": "v地方v地方v地方",
            "label": "v地方v地方v地方"
          },
          {
            "groupName": "默认分组",
            "value": "xsxsa1111",
            "description": "ASC",
            "label": "ASC"
          }
        ]
      },
      {
        "value": "groupName_m3cu7p6a",
        "isGroup": true,
        "disabled": true,
        "label": "默认分组aaa1111",
        "children": [
          {
            "groupName": "默认分组aaa1111",
            "value": "grgrtgtrgrt",
            "description": "grtgtrgrt",
            "label": "grtgtrgrt"
          }
        ]
      }
    ])
    const methods = {
      filterApiNodeMethod: (val: string, data: Record<string, any>) => {
        return `${data.value}${data.label}${data.description}`.toLowerCase().includes(`${val}`.toLowerCase());
      },
      handleApiNodeChange: (apiName: string) => {
        if (!apiName) {
          return;
        }
        const firstNodeIds = map(apiTreeListOptions.value, "value");
        if (firstNodeIds.includes(apiName)) {
          GlobalMessage.warning("请选末级节点的接口配置");
          return;
        }

        console.log('ok');
        debugger;
      },
      handleApiClear: () => {

      },
    }
    return () => {
      return <div>
        <el-tree-select
          style={{width: '300px'}}
          placeholder={"请输入接口编码或描述搜索..."}
          size={"default"}
          check-strictly={false}
          render-after-expand={true}
          v-model={apiconfig.value}
          data={apiTreeListOptions.value}
          filter-node-method={methods.filterApiNodeMethod}
          filterable={true}
          node-key="value"
          props={{
            label: "label",
            children: "children",
            disabled: (data: any) => {
              // console.log('data.isGroup', data.isGroup,data.value);
              return data.isGroup === true;
            }
          }}
          onChange={methods.handleApiNodeChange}
          onClear={methods.handleApiClear}
          popper-class="datasource-request-select-option"
        >
          {/*{{
            default: ({data}) => {
              const isGroup = data.isGroup;
              return (
                <el-option value={data.value} label={`${data.value} (${data.label || data.value})`}>
                  <div class={"font-normal w-full d-flex justify-space-between"}>
                    <span>{!isGroup ? `${data.label} (${data.value})` : data.label}</span>
                    {!isGroup && (
                      <el-icon>
                        <CircleCheck/>
                      </el-icon>
                    )}
                  </div>
                </el-option>
              );
            },
            header: () => {
              return <div>请选末级节点接口配置</div>;
            }
          }}*/}
        </el-tree-select>
      </div>
    }
  }
})
