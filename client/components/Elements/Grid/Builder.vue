<template>
  <grid-layout
    :layout="layout"
    :col-num="customProps.colNum"
    :row-height="customProps.rowHeight"
    :is-draggable="true"
    :is-resizable="true"
    :vertical-compact="true"
    :margin="[customProps.marginX, customProps.marginY]"
    :use-css-transforms="true">
    <grid-item
      v-for="item in items"
      :key="item.props.i"
      v-bind="item.props"
      drag-allow-from=".builder-draggable-handle">
      <i
        style="position: absolute; top:0; left: 0;"
        class="el-icon-rank builder-draggable-handle"/>
      <factory-element
        :component-in-store="item"
        style="height: 100%;width:100%;display: flex;"/>
    </grid-item>
    <grid-item
      :is-draggable="false"
      :is-resizable="false"
      v-bind="itemForAdd"
      style="text-align: center; padding: 2rem 0 0 0">
      <el-button
        type="primary"
        @click="createdNewGridItem">Add grid item</el-button>
    </grid-item>
  </grid-layout>
</template>

<style scoped  src="./style-builder.css">
</style>

<script>
import { generateId } from "libs/utils";
import { mapActions } from "vuex";
import { GridItem, GridLayout } from "vue-grid-layout";
import FactoryElement from "components/Builder/FactoryElement";
import AddToSlot from "components/Builder/AddToSlot";
import BaseElement from "components/Builder/BaseElement";
import Base from "./Base";

export default {
  components: {
    AddToSlot,
    FactoryElement,
    GridLayout,
    GridItem
  },
  extends: BaseElement,
  mixins: [Base],
  computed: {
    itemForAdd() {
      const yVal = this.items.reduce(
        (y, { props }) => Math.max(y, props.y + props.h),
        0
      );
      return {
        x: 0,
        y: yVal,
        w: this.customProps.colNum,
        h: 2,
        i: "item_for_add"
      };
    }
  },
  methods: {
    ...mapActions(["addNewElementByType"]),
    async createdNewGridItem() {
      await this.addNewElementByType({
        type: "GridItem",
        ownerSlotId: this.getSlotId("items"),
        props: {
          ...this.itemForAdd,
          i: generateId()
        }
      });
    }
  }
};
</script>
