<template>
  <div class="page">
    <el-container v-if="!rootComponents.length">
      <el-header>
        <h3>Select layout</h3>
      </el-header>
      <el-main>
        <choose-layout />
      </el-main>
    </el-container>
    <div v-else>
      <factory-element
        v-for="item in rootComponents"
        :key="item.type"
        :component-in-store="item" />
      <div class="controller-buttons">
        <el-button
          type="success"
          icon="el-icon-download"
          round
          @click="saveToLocal"/>
      </div>
    </div>
  </div>
</template>

<style src="components/Builder/assets/style.css">
</style>

<script>
import { mapGetters } from "vuex";
import FactoryElement from "components/Builder/FactoryElement";
import ChooseLayout from "components/Builder/ChooseLayout";
import { saveAs } from "file-saver";
import { js_beautify } from "js-beautify"; // eslint-disable-line

export default {
  components: {
    FactoryElement,
    ChooseLayout
  },
  computed: {
    ...mapGetters(["rootComponents", "getUi"])
  },
  methods: {
    saveToLocal() {
      saveAs(
        new Blob([js_beautify(JSON.stringify(this.getUi()))], {
          type: "application/json;charset=utf-8"
        }),
        "ui.prodigy"
      );
    }
  }
};
</script>
