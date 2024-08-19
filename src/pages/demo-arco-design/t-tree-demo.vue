<template>
  <div style="background-color: #ffffff;padding: 20px;height: 600px;overflow: auto">
    <t-space :size="32" direction="vertical">
      <t-space direction="vertical">
        <t-space>
          <span>显示连线:</span>
          <t-switch v-model="showLine"/>
        </t-space>
        <t-space>
          <span>显示图标:</span>
          <t-switch v-model="showIcon"/>
        </t-space>
      </t-space>
      <t-space direction="vertical">
        <h3>默认样式</h3>
        <t-tree :data="items" :line="showLine" :icon="showIcon" expand-all :keys="treeProps"/>
      </t-space>
      <t-space direction="vertical" class="tdesign-tree-line">
        <h3>使用属性结合 jsx 来自定义呈现</h3>
        <t-tree :data="items" :icon="showIcon" expand-all :line="renderLine" :keys="treeProps"/>
      </t-space>
      <t-space direction="vertical" class="tdesign-tree-line">
        <h3>slot 形式</h3>
        <t-tree :data="items" :icon="showIcon" line expand-all :keys="treeProps">
          <template #line="{ node }">
            <div v-if="showLine" :class="lineClass(node)">
              <div class="custom-line-box">
              <span
                  v-for="(item, index) in getLineNodes(node)"
                  :key="index"
                  :class="{ 'custom-line-cross': item.cross }"
              ></span>
              </div>
              <i v-if="node.isLeaf()" class="custom-line-icon">
                <icon name="heart-filled"/>
              </i>
            </div>
          </template>
        </t-tree>
      </t-space>
    </t-space>
  </div>
</template>

<script setup lang="jsx">
import {ref} from 'vue';
import {Icon} from 'tdesign-icons-vue-next';
const treeProps = ref({ label: 'shortName', children: 'children', disabled: 'disabled' })
const showLine = ref(true);
const showIcon = ref(true);
const items2 = ref([
  {
    value: '1',
    label: '1',
    children: [
      {
        value: '1.1',
        label: '1.1',
      },
      {
        value: '1.2',
        label: '1.2',
      },
    ],
  },
  {
    value: '2',
    label: '2',
    children: [
      {
        value: '2.1',
        label: '2.1',
        children: [
          {
            value: '2.1.1',
            label: '2.1.1',
            children: [
              {
                value: '2.1.1.1',
                label: '2.1.1.1',
                children: [
                  {
                    value: '2.1.1.1.1',
                    label: '2.1.1.1.1',
                  },
                  {
                    value: '2.1.1.1.2',
                    label: '2.1.1.1.2',
                  },
                ],
              },
            ],
          },
          {
            value: '2.1.2',
            label: '2.1.2',
          },
        ],
      },
      {
        value: '2.2',
        label: '2.2',
      },
    ],
  },
  {
    value: '3',
    label: '3',
    children: [
      {
        value: '3.1',
        label: '3.1',
      },
      {
        value: '3.2',
        label: '3.2',
      },
    ],
  },
  {
    value: '4',
    label: '4',
  },
]);
const items = ref([
  {
    shortName: '甘肃路桥建设集团有限公司',
    avatar: '/src/sites/assets/images/web-logo.png',
    id: 10001,
    children: [
      {
        id: 839527735267840,
        tenantId: 10001,
        parentId: 10001,
        pmParentId: 0,
        fullId: '10001|839527735267840',
        pmFullId: '',
        name: '阿恒-集团层',
        fullName: '甘肃路桥建设集团有限公司|AHeng集团层',
        shortName: 'AHeng集团层',
        orgType: 'company',
        extType: 'group',
        children: [
          {
            id: 839527920275968,
            tenantId: 10001,
            parentId: 839527735267840,
            pmParentId: 0,
            fullId: '10001|839527735267840|839527920275968',
            pmFullId: '',
            name: '阿恒-公司',
            fullName: '甘肃路桥建设集团有限公司|AHeng集团层|阿恒-公司',
            shortName: '阿恒-公司',
            orgType: 'company',
            extType: 'company'
          },
          {
            id: 1513575023497728,
            tenantId: 10001,
            parentId: 839527735267840,
            fullId: '10001|839527735267840|1513575023497728',
            pmFullId: '',
            name: '测试添加公司',
            fullName: '甘肃路桥建设集团有限公司|AHeng集团层|测试添加公司',
            shortName: '测试添加公司',
            orgType: 'company',
            extType: 'company'
          },
          {
            id: 1513608578822656,
            tenantId: 10001,
            parentId: 839527735267840,
            fullId: '10001|839527735267840|1513608578822656',
            pmFullId: '',
            name: '测试添加项目1',
            fullName: '甘肃路桥建设集团有限公司|AHeng集团层|测试添加项目1',
            shortName: '测试添加项目1',
            orgType: 'project',
            extType: 'project'
          }
        ]
      },
      {
        id: 1229546106769920,
        tenantId: 10001,
        parentId: 10001,
        pmParentId: 0,
        fullId: '10001|1229546106769920',
        pmFullId: '',
        name: '局指',
        fullName: '甘肃路桥建设集团有限公司|数据决策-御用局指',
        shortName: '数据决策-御用局指',
        orgType: 'folder',
        extType: 'folder'
      },
      {
        id: 441292523114496,
        tenantId: 10001,
        parentId: 10001,
        pmParentId: 0,
        fullId: '10001|441292523114496',
        pmFullId: '',
        name: '陕梦专用966',
        fullName: '甘肃路桥建设集团有限公司|陕梦专用',
        shortName: '陕梦专用',
        orgType: 'company',
        extType: 'company',
        children: [
          {
            id: 629467277283840,
            tenantId: 10001,
            parentId: 441292523114496,
            pmParentId: 0,
            fullId: '10001|441292523114496|629467277283840',
            pmFullId: '',
            name: '陈寿莹测试项目部',
            fullName: '甘肃路桥建设集团有限公司|陕梦专用|陈寿莹测试项目部',
            shortName: '陈寿莹测试项目部',
            orgType: 'project',
            extType: 'project',
            children: [
              {
                id: 629468477297152,
                tenantId: 10001,
                parentId: 629467277283840,
                pmParentId: 629467277283840,
                fullId: '10001|441292523114496|629467277283840|629468477297152',
                pmFullId: '10001|441292523114496|629467277283840|',
                name: '1#拌合站',
                fullName: '甘肃路桥建设集团有限公司|陕梦专用|陈寿莹测试项目部|1#拌合站',
                shortName: '1#拌合站',
                orgType: 'project',
                extType: 'production'
              }
            ]
          },
          {
            id: 736233131388928,
            tenantId: 10001,
            parentId: 441292523114496,
            pmParentId: 0,
            fullId: '10001|441292523114496|736233131388928',
            pmFullId: '',
            name: '常黎娟项目部（对账模式）',
            fullName: '甘肃路桥建设集团有限公司|陕梦专用|常黎娟项目部（对账模式）',
            shortName: '常黎娟项目部（对账模式）',
            orgType: 'project',
            extType: 'project',
            children: [
              {
                id: 736233445748736,
                tenantId: 10001,
                parentId: 736233131388928,
                pmParentId: 736233131388928,
                fullId: '10001|441292523114496|736233131388928|736233445748736',
                pmFullId: '10001|441292523114496|736233131388928|',
                name: '常黎娟拌合站1#',
                fullName: '甘肃路桥建设集团有限公司|陕梦专用|常黎娟项目部（对账模式）|常黎娟拌合站1#',
                shortName: '常黎娟拌合站1#',
                orgType: 'project',
                extType: 'production'
              }
            ]
          },
          {
            id: 756176381678592,
            tenantId: 10001,
            parentId: 441292523114496,
            pmParentId: 0,
            fullId: '10001|441292523114496|756176381678592',
            pmFullId: '',
            name: '陈寿莹基础数据对接测试',
            fullName: '甘肃路桥建设集团有限公司|陕梦专用|陈寿莹基础数据对接测试',
            shortName: '陈寿莹基础数据对接测试',
            orgType: 'project',
            extType: 'project',
            children: [
              {
                id: 758230101062656,
                tenantId: 10001,
                parentId: 756176381678592,
                pmParentId: 756176381678592,
                fullId: '10001|441292523114496|756176381678592|758230101062656',
                pmFullId: '10001|441292523114496|756176381678592|',
                name: '1#拌合站',
                fullName: '甘肃路桥建设集团有限公司|陕梦专用|陈寿莹基础数据对接测试|1#拌合站',
                shortName: '1#拌合站',
                orgType: 'project',
                extType: 'production'
              }
            ]
          },
          {
            id: 800760306380800,
            tenantId: 10001,
            parentId: 441292523114496,
            pmParentId: 0,
            fullId: '10001|441292523114496|800760306380800',
            pmFullId: '',
            name: '常黎娟项目部（普通模式）',
            fullName: '甘肃路桥建设集团有限公司|陕梦专用|常黎娟项目部（普通模式）',
            shortName: '常黎娟项目部（普通模式）',
            orgType: 'project',
            extType: 'project'

          },
          {
            id: 843830043193856,
            tenantId: 10001,
            parentId: 441292523114496,
            pmParentId: 0,
            fullId: '10001|441292523114496|843830043193856',
            pmFullId: '',
            name: '梁渊博测试项目部',
            fullName: '甘肃路桥建设集团有限公司|陕梦专用|梁渊博测试项目部',
            shortName: '梁渊博测试项目部',
            orgType: 'project',
            extType: 'project'

          },
          {
            id: 962847303832064,
            tenantId: 10001,
            parentId: 441292523114496,
            pmParentId: 0,
            fullId: '10001|441292523114496|962847303832064',
            pmFullId: '',
            name: '水稳混合料测试项目部',
            fullName: '甘肃路桥建设集团有限公司|陕梦专用|水稳混合料测试项目部',
            shortName: '水稳混合料测试项目部',
            orgType: 'project',
            extType: 'project'

          },
          {
            id: 962858265760256,
            tenantId: 10001,
            parentId: 441292523114496,
            pmParentId: 0,
            fullId: '10001|441292523114496|962858265760256',
            pmFullId: '',
            name: '沥青混合料测试项目部',
            fullName: '甘肃路桥建设集团有限公司|陕梦专用|沥青混合料测试项目部',
            shortName: '沥青混合料测试项目部',
            orgType: 'project',
            extType: 'project'

          },
          {
            id: 971365888684544,
            tenantId: 10001,
            parentId: 441292523114496,
            pmParentId: 1032320754522112,
            fullId: '10001|441292523114496|971365888684544',
            pmFullId: '10001|1032320754522112|',
            name: '杨周测试项目部',
            fullName: '甘肃路桥建设集团有限公司|陕梦专用|杨周测试项目部',
            shortName: '杨周测试项目部',
            orgType: 'project',
            extType: 'project',
            children: [
              {
                id: 971366117347840,
                tenantId: 10001,
                parentId: 971365888684544,
                pmParentId: 971365888684544,
                fullId: '10001|441292523114496|971365888684544|971366117347840',
                pmFullId: '10001|441292523114496|971365888684544|',
                name: '杨周测试拌合站1#',
                fullName: '甘肃路桥建设集团有限公司|陕梦专用|杨周测试项目部|杨周测试拌合站1#',
                shortName: '杨周测试拌合站1#',
                orgType: 'project',
                extType: 'production'
              },
              {
                id: 971366336238080,
                tenantId: 10001,
                parentId: 971365888684544,
                pmParentId: 971365888684544,
                fullId: '10001|441292523114496|971365888684544|971366336238080',
                pmFullId: '10001|441292523114496|971365888684544|',
                name: '杨周测试拌合站2#',
                fullName: '甘肃路桥建设集团有限公司|陕梦专用|杨周测试项目部|杨周测试拌合站2#',
                shortName: '杨周测试拌合站2#',
                orgType: 'project',
                extType: 'production'
              },
              {
                id: 978237770764800,
                tenantId: 10001,
                parentId: 971365888684544,
                pmParentId: 971365888684544,
                fullId: '10001|441292523114496|971365888684544|978237770764800',
                pmFullId: '10001|441292523114496|971365888684544|',
                name: '2#沥青拌合站',
                fullName: '甘肃路桥建设集团有限公司|陕梦专用|杨周测试项目部|2#沥青拌合站',
                shortName: '2#沥青拌合站',
                orgType: 'project',
                extType: 'production'
              },
              {
                id: 978237437374976,
                tenantId: 10001,
                parentId: 971365888684544,
                pmParentId: 971365888684544,
                fullId: '10001|441292523114496|971365888684544|978237437374976',
                pmFullId: '10001|441292523114496|971365888684544|',
                name: '1#水稳拌合站',
                fullName: '甘肃路桥建设集团有限公司|陕梦专用|杨周测试项目部|1#水稳拌合站',
                shortName: '1#水稳拌合站',
                orgType: 'project',
                extType: 'production'
              }
            ]
          },
          {
            id: 1147570075046912,
            tenantId: 10001,
            parentId: 441292523114496,
            pmParentId: 0,
            fullId: '10001|441292523114496|1147570075046912',
            pmFullId: '',
            name: '实物测试项目部',
            fullName: '甘肃路桥建设集团有限公司|陕梦专用|实物测试项目部',
            shortName: '实物测试项目部',
            orgType: 'project',
            extType: 'project'

          },
          {
            id: 1294799738434048,
            tenantId: 10001,
            parentId: 441292523114496,
            pmParentId: 0,
            fullId: '10001|441292523114496|1294799738434048',
            pmFullId: '',
            name: '马超测试项目部',
            fullName: '甘肃路桥建设集团有限公司|陕梦专用|马超测试项目部',
            shortName: '马超测试项目部',
            orgType: 'project',
            extType: 'project'

          },
          {
            id: 587557737304576,
            tenantId: 10001,
            parentId: 441292523114496,
            pmParentId: 0,
            fullId: '10001|441292523114496|587557737304576',
            pmFullId: '',
            name: '测试2项目部',
            fullName: '甘肃路桥建设集团有限公司|陕梦专用|测试2项目部',
            shortName: '测试2项目部',
            orgType: 'project',
            extType: 'project'

          },
          {
            id: 1151250613089280,
            tenantId: 10001,
            parentId: 441292523114496,
            pmParentId: 0,
            fullId: '10001|441292523114496|1151250613089280',
            pmFullId: '',
            name: '邓维刚测试项目部',
            fullName: '甘肃路桥建设集团有限公司|陕梦专用|邓维刚测试项目部',
            shortName: '邓维刚测试项目部',
            orgType: 'project',
            extType: 'project'

          },
          {
            id: 802408781492736,
            tenantId: 10001,
            parentId: 441292523114496,
            pmParentId: 1804407350637056,
            fullId: '10001|441292523114496|802408781492736',
            pmFullId: '10001|441292523114496|1804407350637056|',
            name: '张梓浈测试项目部（普通）',
            fullName: '甘肃路桥建设集团有限公司|陕梦专用|张梓浈测试项目部（普通）',
            shortName: '张梓浈测试项目部（普通）',
            orgType: 'project',
            extType: 'project'

          },
          {
            id: 609531394904064,
            tenantId: 10001,
            parentId: 441292523114496,
            pmParentId: 0,
            fullId: '10001|441292523114496|609531394904064',
            pmFullId: '',
            name: '张梓浈专用',
            fullName: '甘肃路桥建设集团有限公司|陕梦专用|张梓浈专用',
            shortName: '张梓浈专用',
            orgType: 'project',
            extType: 'project'

          },
          {
            id: 978983188959744,
            tenantId: 10001,
            parentId: 441292523114496,
            pmParentId: 0,
            fullId: '10001|441292523114496|978983188959744',
            pmFullId: '',
            name: '鹿静测试项目部',
            fullName: '甘肃路桥建设集团有限公司|陕梦专用|鹿静测试项目部',
            shortName: '鹿静测试项目部',
            orgType: 'project',
            extType: 'project'

          },
          {
            id: 1015112739483648,
            tenantId: 10001,
            parentId: 441292523114496,
            pmParentId: 0,
            fullId: '10001|441292523114496|1015112739483648',
            pmFullId: '',
            name: 'wff专业测试项目部',
            fullName: '甘肃路桥建设集团有限公司|陕梦专用|wff专业测试项目部',
            shortName: 'wff专业测试项目部',
            orgType: 'project',
            extType: 'project'

          },
          {
            id: 654805037772800,
            tenantId: 10001,
            parentId: 441292523114496,
            pmParentId: 0,
            fullId: '10001|441292523114496|654805037772800',
            pmFullId: '',
            name: '邵任晰专用项目部',
            fullName: '甘肃路桥建设集团有限公司|陕梦专用|邵任晰专用项目部',
            shortName: '邵任晰专用项目部',
            orgType: 'project',
            extType: 'project'

          },
          {
            id: 586892181115392,
            tenantId: 10001,
            parentId: 441292523114496,
            pmParentId: 0,
            fullId: '10001|441292523114496|586892181115392',
            pmFullId: '',
            name: 'lyy测试项目部（勿动）',
            fullName: '甘肃路桥建设集团有限公司|陕梦专用|lyy测试项目部',
            shortName: 'lyy测试项目部',
            orgType: 'project',
            extType: 'project'

          },
          {
            id: 587089923772928,
            tenantId: 10001,
            parentId: 441292523114496,
            pmParentId: 0,
            fullId: '10001|441292523114496|587089923772928',
            pmFullId: '',
            name: '专用测试项目部',
            fullName: '甘肃路桥建设集团有限公司|陕梦专用|专用测试项目部',
            shortName: '专用测试项目部',
            orgType: 'project',
            extType: 'project'

          },
          {
            id: 587570692461056,
            tenantId: 10001,
            parentId: 441292523114496,
            pmParentId: 0,
            fullId: '10001|441292523114496|587570692461056',
            pmFullId: '',
            name: '测试3项目部',
            fullName: '甘肃路桥建设集团有限公司|陕梦专用|测试3项目部',
            shortName: '测试3项目部',
            orgType: 'project',
            extType: 'project'

          },
          {
            id: 591944731701248,
            tenantId: 10001,
            parentId: 441292523114496,
            pmParentId: 0,
            fullId: '10001|441292523114496|591944731701248',
            pmFullId: '',
            name: '私人专用',
            fullName: '甘肃路桥建设集团有限公司|陕梦专用|私人专用',
            shortName: '私人专用',
            orgType: 'project',
            extType: 'project'

          }
        ]
      }
    ]
  }
])
const getLineNodes = (node) => {
  const nodes = node.getParents().reverse();
  const lineNodes = [];
  nodes.forEach((item, index) => {
    const line = {};
    const nextItem = nodes[index + 1];
    if (index < nodes.length - 1 && nextItem) {
      line.cross = !nextItem.isLast();
    }
    lineNodes.push(line);
  });
  return lineNodes;
};
const lineClass = (node) => {
  const list = ['custom-line'];
  if (node.isFirst()) {
    list.push('custom-line-first');
  }
  if (node.isLeaf()) {
    list.push('custom-line-leaf');
  }
  if (node.isLast()) {
    list.push('custom-line-last');
  }
  return list;
};
const renderLine = (h, node) => {
  if (!showLine.value) return null;
  const lineChildren = [];
  const lines = getLineNodes(node).map((item) =>
      h('span', {
        class: {
          'custom-line-cross': item.cross,
        },
      }),
  );
  lineChildren.push(
      h(
          'div',
          {
            class: 'custom-line-box',
          },
          lines,
      ),
  );
  if (node.isLeaf()) {
    const tIcon = <Icon name="heart-filled"/>;
    const iconNode = h(
        'i',
        {
          class: 'custom-line-icon',
        },
        [tIcon],
    );
    lineChildren.push(iconNode);
  }
  return h(
      'div',
      {
        class: lineClass(node),
      },
      lineChildren,
  );
};
</script>
<style scoped>
.tdesign-tree-line .custom-line {
  display: flex;
  position: absolute;
  top: 2px;
  left: 9px;
}

.tdesign-tree-line .custom-line-box {
  display: flex;
  flex: 0 0 auto;
}

.tdesign-tree-line .custom-line span {
  position: relative;
  flex: 0 0 auto;
  width: 24px;
  height: 40px;
}

.tdesign-tree-line .custom-line span:last-child:before {
  content: '';
  position: absolute;
  display: block;
  bottom: 22px;
  left: 6px;
  width: 12px;
  height: 26px;
  border-left: 1px solid #ddd;
  border-bottom: 1px solid #0052d9;
}

.tdesign-tree-line .custom-line-leaf span:last-child:before {
  width: 16px;
}

.tdesign-tree-line .custom-line-cross:before {
  content: '';
  display: block;
  position: absolute;
  left: 6px;
  top: -15px;
  height: 44px;
  width: 1px;
  border-left: 1px solid #ddd;
}

.tdesign-tree-line .custom-line-icon {
  position: absolute;
  top: 10px;
  right: -14px;
  display: flex;
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  border-radius: 16px;
  border: 1px solid #0052d9;
  background-color: #fff;
  justify-content: center;
  align-items: center;
}

.tdesign-tree-line .custom-line span:last-child:after {
  content: '';
  position: absolute;
  display: block;
  box-sizing: border-box;
  top: 14px;
  left: 3px;
  z-index: 1;
  width: 7px;
  height: 7px;
  border-radius: 2px;
  border: 1px solid #0052d9;
  background-color: #fff;
  transform: rotate(45deg);
  transform-origin: 50% 50%;
}
</style>
