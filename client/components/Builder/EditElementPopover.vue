<template>
  <el-popover
    :value="showPopover"
    popper-class="edit-popover"
    placement="left-start"
    trigger="manual">
    <ul class="edit-popover-list">
      <li>
        <button
          class="edit-popover-button"
          @click="removeSelf()">
          <i class="el-icon-delete"/>
        </button>
      </li>
      <li>
        <button
          class="edit-popover-button"
          type="primary"
          @click="dialogEditVisible = true">
          <i class="el-icon-edit"/>
        </button>
        <el-dialog
          :visible.sync="dialogEditVisible"
          title="Edit element"
          append-to-body>

          <edit-element-props
            :element-type="componentInStore.type"
            :props-values="componentInStore.props"
            @save="saveElement"/>

          <div
            slot="footer"
            class="dialog-footer">
            <el-button
              round
              @click="dialogEditVisible = false"
            >Cancel</el-button>
          </div>
        </el-dialog>
      </li>
      <!--<li v-if="componentInStore.ownerSlotId && !countElementSlots">-->
      <!--<add-to-slot :ownerSlotId="componentInStore.ownerSlotId">-->
      <!--<button class="edit-popover-button" type="primary">-->
      <!--<i class="el-icon-circle-plus-outline"></i>-->
      <!--</button>-->
      <!--</add-to-slot>-->
      <!--</li>-->
    </ul>
  </el-popover>
</template>

<style src="./assets/edit-popover.css">
</style>

<script>
import { getElementConfigByType } from "components/utils";
import { mapState, mapMutations } from "vuex";
import BaseElement from "./BaseElement";
import EditElementProps from "./EditElementProps";
import AddToSlot from "./AddToSlot";

export default {
  components: {
    AddToSlot,
    EditElementProps
  },
  extends: BaseElement,
  data() {
    return {
      dialogEditVisible: null
    };
  },
  computed: {
    ...mapState({
      currentEditingComponent: state => state.currentEditingComponent
    }),
    showPopover() {
      return this.currentEditingComponent === this.componentInStore;
    },
    countElementSlots() {
      return this.elementConfig &&
        this.elementConfig.SLOT_NAMES &&
        this.elementConfig.SLOT_NAMES.length
        ? this.elementConfig.SLOT_NAMES.length
        : 0;
    }
  },
  asyncComputed: {
    async elementConfig() {
      return getElementConfigByType(this.componentInStore.type);
    }
  },
  methods: {
    ...mapMutations(["editComponentProps"]),
    saveElement(props) {
      this.editComponentProps({ component: this.componentInStore, props });
      this.dialogEditVisible = false;
    }
  }
};
</script>
