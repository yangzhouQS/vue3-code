import {defineComponent, getCurrentInstance, ref} from 'vue';

export const VuetifyDemoJsx = defineComponent({
  name: 'VuetifyDemoJsx',
  setup(props) {
    return () => {
      const firstName = ref('')

      const tt = getCurrentInstance();
      console.log(tt);
      console.log(getCurrentInstance());

      const items = ref([])
      items.value = [
        {
          id: 10001,
          name: '静庄智慧工地平台',
          shortName: '甘肃路桥建设集团有限公司',
          fullId: '10001',
          fullName: '甘肃路桥建设集团有限公司',
          orgType: 'company',
          extType: 'group',
          applicationId: '1815071978877440',
          isValid: true
        },
        {
          id: 761819167945728,
          name: '秦臻-集团',
          shortName: '秦臻-集团',
          fullId: '10001|761819167945728',
          fullName: '甘肃路桥建设集团有限公司|秦臻-集团',
          orgType: 'company',
          extType: 'group',
          applicationId: '1815071978877440',
          isValid: true
        },
        {
          id: 441292523114496,
          name: '陕梦专用966',
          shortName: '陕梦专用',
          fullId: '10001|441292523114496',
          fullName: '甘肃路桥建设集团有限公司|陕梦专用',
          orgType: 'company',
          extType: 'company',
          applicationId: '1815071978877440',
          isValid: true
        },
        {
          id: 1589291096864256,
          name: '测试指挥部-hezg',
          shortName: '测试指挥部-hezg',
          fullId: '10001|1589291096864256',
          fullName: '甘肃路桥建设集团有限公司|测试指挥部-hezg',
          orgType: 'project',
          extType: 'command',
          applicationId: '1815071978877440',
          isValid: true,
          project: {
            name: '测试指挥部-hezg',
            shortName: '测试指挥部-hezg'
          }
        },
        {
          id: 629467277283840,
          name: '陈寿莹测试项目部',
          shortName: '陈寿莹测试项目部',
          fullId: '10001|441292523114496|629467277283840',
          fullName: '甘肃路桥建设集团有限公司|陕梦专用|陈寿莹测试项目部',
          orgType: 'project',
          extType: 'project',
          applicationId: '1815071978877440',
          isValid: true,
          project: {
            name: '陈寿莹测试项目部',
            shortName: '陈寿莹测试项目部'
          }
        },
        {
          id: 736233131388928,
          name: '常黎娟项目部（对账模式）',
          shortName: '常黎娟项目部（对账模式）',
          fullId: '10001|441292523114496|736233131388928',
          fullName: '甘肃路桥建设集团有限公司|陕梦专用|常黎娟项目部（对账模式）',
          orgType: 'project',
          extType: 'project',
          applicationId: '1815071978877440',
          isValid: true,
          project: {
            name: '常黎娟项目部（对账模式）',
            shortName: '常黎娟项目部（对账模式）'
          }
        },
        {
          id: 800760306380800,
          name: '常黎娟项目部（普通模式）',
          shortName: '常黎娟项目部（普通模式）',
          fullId: '10001|441292523114496|800760306380800',
          fullName: '甘肃路桥建设集团有限公司|陕梦专用|常黎娟项目部（普通模式）',
          orgType: 'project',
          extType: 'project',
          applicationId: '1815071978877440',
          isValid: true,
          project: {
            name: '常黎娟项目部（普通模式）',
            shortName: '常黎娟项目部（普通模式）'
          }
        },
        {
          id: 756176381678592,
          name: '陈寿莹基础数据对接测试',
          shortName: '陈寿莹基础数据对接测试',
          fullId: '10001|441292523114496|756176381678592',
          fullName: '甘肃路桥建设集团有限公司|陕梦专用|陈寿莹基础数据对接测试',
          orgType: 'project',
          extType: 'project',
          applicationId: '1815071978877440',
          isValid: true,
          project: {
            name: '陈寿莹基础数据对接测试',
            shortName: '陈寿莹基础数据对接测试'
          }
        },
        {
          id: 843830043193856,
          name: '梁渊博测试项目部',
          shortName: '梁渊博测试项目部',
          fullId: '10001|441292523114496|843830043193856',
          fullName: '甘肃路桥建设集团有限公司|陕梦专用|梁渊博测试项目部',
          orgType: 'project',
          extType: 'project',
          applicationId: '1815071978877440',
          isValid: true,
          project: {
            name: '梁渊博测试项目部',
            shortName: '梁渊博测试项目部'
          }
        },
        {
          id: 587089923772928,
          name: '专用测试项目部',
          shortName: '专用测试项目部',
          fullId: '10001|441292523114496|587089923772928',
          fullName: '甘肃路桥建设集团有限公司|陕梦专用|专用测试项目部',
          orgType: 'project',
          extType: 'project',
          applicationId: '1815071978877440',
          isValid: true,
          project: {
            name: '专用测试项目部',
            shortName: '专用测试项目部'
          }
        },
        {
          id: 758230101062656,
          name: '1#拌合站',
          shortName: '1#拌合站',
          fullId: '10001|441292523114496|756176381678592|758230101062656',
          fullName: '甘肃路桥建设集团有限公司|陕梦专用|陈寿莹基础数据对接测试|1#拌合站',
          orgType: 'project',
          extType: 'production',
          applicationId: '1815071978877440',
          isValid: true,
          project: {
            name: '1#拌合站',
            shortName: '1#拌合站'
          }
        },
        {
          id: 829756185358848,
          name: '拌合站（普通）1#',
          shortName: '拌合站（普通）1#',
          fullId: '10001|441292523114496|800760306380800|829756185358848',
          fullName: '甘肃路桥建设集团有限公司|陕梦专用|常黎娟项目部（普通模式）|拌合站（普通）1#',
          orgType: 'project',
          extType: 'production',
          applicationId: '1815071978877440',
          isValid: true,
          project: {
            name: '拌合站（普通）1#',
            shortName: '拌合站（普通）1#'
          }
        },
        {
          id: 843830655021568,
          name: '梁渊博测试拌合站',
          shortName: '梁渊博测试拌合站1#',
          fullId: '10001|441292523114496|843830043193856|843830655021568',
          fullName: '甘肃路桥建设集团有限公司|陕梦专用|梁渊博测试项目部|梁渊博测试拌合站1#',
          orgType: 'project',
          extType: 'production',
          applicationId: '1815071978877440',
          isValid: true,
          project: {
            name: '梁渊博测试拌合站',
            shortName: '梁渊博测试拌合站1#'
          }
        },
        {
          id: 1147577333289984,
          name: '实物拌合站',
          shortName: '实物拌合站',
          fullId: '10001|441292523114496|1147570075046912|1147577333289984',
          fullName: '甘肃路桥建设集团有限公司|陕梦专用|实物测试项目部|实物拌合站',
          orgType: 'project',
          extType: 'production',
          applicationId: '1815071978877440',
          isValid: true,
          project: {
            name: '实物拌合站',
            shortName: '实物拌合站'
          }
        },
        {
          id: 971366117347840,
          name: '杨周测试拌合站1#',
          shortName: '杨周测试拌合站1#',
          fullId: '10001|441292523114496|971365888684544|971366117347840',
          fullName: '甘肃路桥建设集团有限公司|陕梦专用|杨周测试项目部|杨周测试拌合站1#',
          orgType: 'project',
          extType: 'production',
          applicationId: '1815071978877440',
          isValid: true,
          project: {
            name: '杨周测试拌合站1#',
            shortName: '杨周测试拌合站1#'
          }
        },
        {
          id: 829756289372672,
          name: '拌合站（普通）2#',
          shortName: '拌合站（普通）2#',
          fullId: '10001|441292523114496|800760306380800|829756289372672',
          fullName: '甘肃路桥建设集团有限公司|陕梦专用|常黎娟项目部（普通模式）|拌合站（普通）2#',
          orgType: 'project',
          extType: 'production',
          applicationId: '1815071978877440',
          isValid: true,
          project: {
            name: '拌合站（普通）2#',
            shortName: '拌合站（普通）2#'
          }
        },
        {
          id: 1296230864502272,
          name: '钢筋处理中心',
          shortName: '钢筋处理中心',
          fullId: '10001|441292523114496|1147570075046912|1296230864502272',
          fullName: '甘肃路桥建设集团有限公司|陕梦专用|实物测试项目部|钢筋处理中心',
          orgType: 'project',
          extType: 'production',
          applicationId: '1815071978877440',
          isValid: true,
          project: {
            name: '钢筋处理中心',
            shortName: '钢筋处理中心'
          }
        },
        {
          id: 845240266207744,
          name: '梁渊博测试拌合站2#',
          shortName: '梁渊博测试拌合站2#',
          fullId: '10001|441292523114496|843830043193856|845240266207744',
          fullName: '甘肃路桥建设集团有限公司|陕梦专用|梁渊博测试项目部|梁渊博测试拌合站2#',
          orgType: 'project',
          extType: 'production',
          applicationId: '1815071978877440',
          isValid: true,
          project: {
            name: '梁渊博测试拌合站2#',
            shortName: '梁渊博测试拌合站2#'
          }
        },
        {
          id: 971366336238080,
          name: '杨周测试拌合站2#',
          shortName: '杨周测试拌合站2#',
          fullId: '10001|441292523114496|971365888684544|971366336238080',
          fullName: '甘肃路桥建设集团有限公司|陕梦专用|杨周测试项目部|杨周测试拌合站2#',
          orgType: 'project',
          extType: 'production',
          applicationId: '1815071978877440',
          isValid: true,
          project: {
            name: '杨周测试拌合站2#',
            shortName: '杨周测试拌合站2#'
          }
        },
        {
          id: 829756396974592,
          name: '拌合站（普通）3#',
          shortName: '拌合站（普通）3#',
          fullId: '10001|441292523114496|800760306380800|829756396974592',
          fullName: '甘肃路桥建设集团有限公司|陕梦专用|常黎娟项目部（普通模式）|拌合站（普通）3#',
          orgType: 'project',
          extType: 'production',
          applicationId: '1815071978877440',
          isValid: true,
          project: {
            name: '拌合站（普通）3#',
            shortName: '拌合站（普通）3#'
          }
        }
      ]

      return <div style="border:2px solid red;margin: 20px auto;width:300px;height:200px;overflow: hidden;">
        <v-virtual-scroll
          height="300"
          items={items.value}
        >
          {{
            default: ({item, index}) => {
              return <div>
                <div>{index}</div>
                <div>{item.name}</div>
                <div>{item.fullName}</div>
              </div>
            }
          }}
        </v-virtual-scroll>
      </div>
    }
  }
})
