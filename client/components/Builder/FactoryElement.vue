<template>
  <div
    class="factory-element"
    @click.stop="setCurrentEditingComponent(componentInStore)">
    <component
      :is="componentLoader"
      :style="cssStyle"
      :component-in-store="componentInStore"/>
    <edit-element-popover :component-in-store="componentInStore"/>
  </div>
</template>

<script>
/* @flow */

import { mapMutations } from "vuex";
import { getBuilderForElementByType } from "../utils";
import EditElementPopover from "./EditElementPopover";

export default {
  components: {
    EditElementPopover
  },
  props: {
    componentInStore: {
      type: Object,
      required: true
    }
  },
  computed: {
    componentLoader() {
      return () => getBuilderForElementByType(this.componentInStore.type);
    },
    customProps() {
      return this.componentInStore.props;
    },
    cssStyle() {
      return {
        color: this.customProps.cssColor
          ? this.customProps.cssColor
          : undefined,
        backgroundColor: this.customProps.cssBackgroundColor
          ? this.customProps.cssBackgroundColor
          : undefined,
        textAlign: this.customProps.cssTextAlign
          ? this.customProps.cssTextAlign
          : undefined,
        padding: this.customProps.cssPadding
          ? this.customProps.cssPadding
          : undefined
      };
    }
  },
  mounted() {
    if (this.$props.componentInStore.type) {
      this.loadComponent();
    }
  },
  methods: {
    ...mapMutations(["setCurrentEditingComponent"]),
    loadComponent() {
      this.componentLoader();
    }
  }
};
</script>
