<template>
  <Designer :engine="engine" class="x111">
    <workbench>
      <StudioPanel>
        <!--组件操作区域-->
        <CompositePanel>
          <CompositePanelItem title="组件" icon="Component">
            <ResourceWidget title="基础组件" :sources="[Input,Button]"/>
            <ResourceWidget title="Form 表单组件" :sources="[Input,Button]"/>
            <ResourceWidget title="展示组件" :sources="[Image,Tag]"/>
            <ResourceWidget title="反馈组件" :sources="[Alert]"/>
          </CompositePanelItem>
          <CompositePanelItem title="大纲" icon="Outline">
            <OutlineTreeWidget/>
          </CompositePanelItem>
        </CompositePanel>
        <!--工作区域-->
        <WorkspacePanel>
          <ToolbarPanel>
            <DesignerToolsWidget/>
            <ViewToolsWidget/>
          </ToolbarPanel>
          <ViewportPanel>
            <ViewPanel type="DESIGNABLE">
              <Content/>
            </ViewPanel>
            <ViewPanel type="JSONTREE">
              hello JSONTREE
            </ViewPanel>
          </ViewportPanel>
        </WorkspacePanel>
        <SettingsPanel title="属性配置">
          <SettingsForm upload-action="https://www.mocky.io/v2/5cc8019d300000980a055e76"/>
        </SettingsPanel>
      </StudioPanel>
    </workbench>
  </Designer>
</template>

<script setup lang="ts">

import {createDesigner, createResource} from "@/components/core";
import {Workbench} from "@/components/vue/containers/workbench";
import {StudioPanel} from "@/components/vue/panels/StudioPanel";
import {SettingsPanel} from "@/components/vue/panels/SettingsPanel";
import {WorkspacePanel} from "@/components/vue/panels/WorkspacePanel";
import {ToolbarPanel} from "@/components/vue/panels/ToolbarPanel";
import {ViewportPanel} from "@/components/vue/panels/ViewportPanel";
import {CompositePanel, CompositePanelItem} from "@/components/vue/panels/CompositePanel";
import {OutlineTreeWidget} from "@/components/vue/widgets/OutlineWidget";
import {ResourceWidget} from "@/components/vue/widgets/ResourceWidget";
import {SettingsForm} from "@/components/vue-settings-form/SettingsForm";
import {DesignerToolsWidget} from "@/components/vue/widgets/DesignerToolsWidget";
import {ViewPanel, ViewToolsWidget, Designer} from "../components/vue";
import {Content} from "./content";

const Input = createResource({
  title: '输入框',
  icon: 'InputSource',
  elements: [
    {
      componentName: 'ElInput',
      props: {
        title: '输入框',
        type: 'string',
        placeholder: 'string',
      },
    },
  ],
})
const Button = createResource({
  title: '按钮',
  icon: 'ButtonSource',
  elements: [
    {
      componentName: 'ElButton',
      props: {
        title: '按钮',
        size: 'string',
        icon: 'string',
      },
    },
  ],
})

// 反馈组件
const Alert = createResource({
  title: 'Alert 提示',
  icon: 'AlertSource',
  elements: [
    {
      componentName: 'ElAlert',
      props: {
        title: 'string',
        type: 'string',
      },
    },
  ],
})

// 展示组件
const Image = createResource({
  title: 'Image 图片',
  icon: 'ImageSource',
  elements: [
    {
      componentName: 'ElImage',
      props: {
        src: 'string',
        alt: 'string',
      },
    },
  ],
})
const Tag = createResource({
  title: 'Tag 标签',
  icon: 'TagSource',
  elements: [
    {
      componentName: 'ElTag',
      props: {
        type: 'string',
        size: 'string',
      },
    },
  ],
})
const engine = createDesigner()
</script>

<style scoped lang="less">

</style>
