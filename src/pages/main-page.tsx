import {defineComponent, ref, reactive} from 'vue';
import {routes} from "@/router";
import {useRouter} from "@/utils/helpers";

export const MainPage = defineComponent({
  name: 'MainPage',
  setup(props) {
    const router = useRouter()
    const methods = {
      detail: (item) => {
        router.router.push({path: item.path})
      },
    };
    return () => {
      return <div class={'full-container d-flex  overflow-hidden'}>
        <div style={{width: '200px'}} class={'h-full overflow-hidden'}>
          <el-scrollbar>
            <el-menu>
              {
                routes.map((item: any, index) => {
                  return <el-menu-item
                    index={`${index}`}
                    key={item.path}
                    class={'cursor-pointer'}
                    onClick={() => {
                      methods.detail(item)
                    }}
                  >
                    {item.title || item.name || item.path}

                    {
                      item.children && item.children.length > 0 ? (<el-sub-menu
                        index={`${index}`}
                      >
                        {
                          item.children.map((it: any, idx) => {
                            return <el-menu-item index={`${idx}`}>{it.title}</el-menu-item>;
                          })
                        }
                      </el-sub-menu>) : ''
                    }
                  </el-menu-item>
                })
              }
            </el-menu>
          </el-scrollbar>
        </div>
        <div class={'flex-1 overflow-hidden'}>
          <router-view/>
        </div>
      </div>;
    };
  }
});
