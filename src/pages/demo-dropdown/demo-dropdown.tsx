import {defineComponent} from 'vue';
import {Edit, Discount} from '@element-plus/icons-vue'

export const DemoDropdown = defineComponent({
  name: 'DemoDropdown',
  setup(props) {
    return () => {
      return <div>
        <el-dropdown>
          {{
            default: () => {
              return <span className="el-dropdown-link">
                下拉菜单<i className="el-icon-arrow-down el-icon--right"></i>
              </span>
            },
            dropdown: () => {
              return <>
                <el-dropdown-menu>
                  <el-dropdown-item icon={Edit}>
                    {{
                      icon: () => {
                        return <el-icon size="20">
                          <Edit/>
                        </el-icon>
                      },
                      default: () => {
                        return <div>
                          开发
                          <el-icon><Discount/></el-icon>
                        </div>
                      }
                    }}
                  </el-dropdown-item>
                  <el-dropdown-item>Action 2</el-dropdown-item>
                  <el-dropdown-item>Action 3</el-dropdown-item>
                  <el-dropdown-item>Action 4</el-dropdown-item>
                  <el-dropdown-item>Action 5</el-dropdown-item>
                </el-dropdown-menu>
              </>
            }
          }}
        </el-dropdown>
      </div>
    }
  }
})
