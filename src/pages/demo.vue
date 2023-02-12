<template>
  <Designer :engine="engine" class="x111">
    <workbench>
      <StudioPanel>
        <!--组件操作区域-->
        <CompositePanel>
          <CompositePanelItem title="组件" icon="Component">
            xxx 组件
          </CompositePanelItem>
          <CompositePanelItem title="大纲" icon="Outline">
            xxx 大纲
          </CompositePanelItem>
        </CompositePanel>
        <!--工作区域-->
        <!--<WorkspacePanel>
          <ToolbarPanel>

          </ToolbarPanel>
          <ViewportPanel>

          </ViewportPanel>
        </WorkspacePanel>
        <SettingsPanel>
          SettingsForm
        </SettingsPanel>-->
      </StudioPanel>
    </workbench>
  </Designer>
</template>

<script setup lang="ts">

import {Designer} from "@/components/vue";
import {createDesigner} from "@/components/core";
import {Workbench} from "@/components/vue/containers/workbench";
import {StudioPanel} from "@/components/vue/panels/StudioPanel";
import {SettingsPanel} from "@/components/vue/panels/SettingsPanel";
import {WorkspacePanel} from "@/components/vue/panels/WorkspacePanel";
import {ToolbarPanel} from "@/components/vue/panels/ToolbarPanel";
import {ViewportPanel} from "@/components/vue/panels/ViewportPanel";
import {CompositePanel, CompositePanelItem} from "@/components/vue/panels/CompositePanel";

const engine = createDesigner()
</script>

<style scoped lang="less">

</style>
