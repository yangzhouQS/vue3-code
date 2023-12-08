import {defineComponent, ref, reactive} from 'vue';
import {routes} from "@/router";
import {useRouter} from "@/utils/helpers";

export const MainPage = defineComponent({
  name: 'MainPage',
  setup(props) {
    const router = useRouter()
    // data
    const data = ref<any>({});
    // methods
    const methods = {
      detail: (item) => {
        router.router.push({path: item.path})
      },
    };
    return () => {
      return <div class={'full-container'}>
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
                  </el-menu-item>
                })
              }
            </el-menu>
          </el-scrollbar>
          <div class={'overflow-hidden'}>
            <router-view />
          </div>
        </div>
      </div>;
    };
  }
});
