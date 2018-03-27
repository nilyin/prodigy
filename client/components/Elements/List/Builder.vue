<template>
  <draggable
    :class="['builder-element-list', ...(customProps.cssClasses || [])]"
    :element="customProps.tag"
    :options="{animation: 0, disabled: false, draggable: '.draggable-item', handle: '.builder-draggable-handle'}"
    v-model="sortedItems">
    <component
      v-for="item in sortedItems"
      :is="customProps.tagItem"
      :class="['draggable-item', ...(customProps.cssClassesItem || [])]"
      :key="item.order">

      <!--<a class="nav-link js-scroll-trigger" href="#contact">-->
      <!--Test {{ item.props.order }}-->
      <!--</a>-->
      <i class="el-icon-rank builder-draggable-handle"/>
      <factory-element :component-in-store="item" />
    </component>
    <component
      slot="footer"
      :is="customProps.tagItem"
      :class="['builder-add-element', ...(customProps.cssClassesItem || [])]">
      <el-button
        type="primary"
        @click="createdNewItem">Add list item</el-button>
    </component>
  </draggable>
</template>

<style scoped src="./assets/builder.css">
</style>

<script>
import { mapActions, mapMutations } from "vuex";
import "vue-awesome/icons";
import Draggable from "vuedraggable";
import FactoryElement from "components/Builder/FactoryElement";
import AddToSlot from "components/Builder/AddToSlot";
import BaseElement from "components/Builder/BaseElement";
import Base from "./Base";

export default {
  components: {
    AddToSlot,
    FactoryElement,
    Draggable
  },
  extends: BaseElement,
  mixins: [Base],
  computed: {
    maxOrderValue() {
      return this.items.reduce(
        (acc, { props: { order } }) => Math.max(acc, order),
        0
      );
    },
    sortedItems: {
      get() {
        return this.items
          .slice(0)
          .sort((one, two) => one.props.order - two.props.order);
      },
      set(newSortedList) {
        let value = 1;
        newSortedList.forEach(function producerMutation(component) {
          this.editComponent({ component, name: "order", value });
          value += 1;
        }, this);
      }
    }
  },
  methods: {
    ...mapActions(["addNewElementByType"]),
    ...mapMutations(["editComponent"]),
    async createdNewItem() {
      await this.addNewElementByType({
        type: "ListItem",
        ownerSlotId: this.getSlotId("items"),
        props: {
          order: this.maxOrderValue + 1
        }
      });
    }
  }
};
</script>
