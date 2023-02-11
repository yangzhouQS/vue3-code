<template>
  <Designer :engine="engine" class="x111">
    <workbench>
      <StudioPanel>
        <WorkspacePanel>
          <ToolbarPanel>

          </ToolbarPanel>
          <ViewportPanel>

          </ViewportPanel>
        </WorkspacePanel>
        <SettingsPanel>
          SettingsForm
        </SettingsPanel>
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

const engine = createDesigner()
</script>

<style scoped lang="less">

</style>
