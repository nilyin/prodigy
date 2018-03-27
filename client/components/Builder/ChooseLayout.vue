<template>
  <el-row>
    <el-col
      v-for="(configLayout, layout) in configLayouts"
      :span="8"
      :key="layout">
      <el-card :body-style="{ padding: '0px' }">
        <div style="padding: 14px;">
          <span>
            {{ configLayout.NAME }}
            <!--<img v-if="configLayout.ICON" :src="'components/Elements/Layouts/' + layout + '/' + configLayout.ICON" />-->
          </span>
          <div class="bottom clearfix">
            <el-button
              type="text"
              class="button"
              @click="chooseLayout(layout)">
              Choose layout
            </el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import {
  convertSlotNamesToIds,
  getConfigLayouts,
  getLayoutElementType
} from "components/utils";

export default {
  asyncComputed: {
    async configLayouts() {
      return getConfigLayouts();
    }
  },
  methods: {
    ...mapActions(["addNewElementByType"]),
    chooseLayout(layout) {
      this.addNewElementByType({ type: getLayoutElementType(layout) });
    }
  }
};
</script>
