<template>
  <div class="builder-add-to-slot">
    <div
      class="builder-add-element"
      @click="dialogNewVisible = true">
      <slot>
        <el-button type="primary">Add element</el-button>
      </slot>
    </div>
    <el-dialog
      :visible.sync="dialogNewVisible"
      title="Choose new element"
      append-to-body>
      <choose-new-element
        :allow-elements="allowElements"
        @created="createdNewElement"/>
      <div
        slot="footer"
        class="dialog-footer">
        <el-button
          round
          @click="dialogNewVisible = false"
        >Cancel</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { findKey } from "lodash";
import { getConfigElements } from "components/utils";
import { mapActions, mapGetters } from "vuex";
import ChooseNewElement from "./ChooseNewElement";

export default {
  components: {
    ChooseNewElement
  },
  props: {
    ownerSlotId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dialogNewVisible: null
    };
  },
  asyncComputed: {
    async allowElements() {
      const { SLOT_ALLOW_ELEMENTS } = await getConfigElements(
        this.ownerComponent.type
      );
      return (SLOT_ALLOW_ELEMENTS || {})[this.ownerSlotName] || null;
    }
  },
  computed: {
    ...mapGetters(["getOwnerComponentBySlotId"]),
    ownerComponent() {
      return this.getOwnerComponentBySlotId(this.ownerSlotId);
    },
    ownerSlotName() {
      return findKey(
        this.ownerComponent.slotNamesToIds,
        ownerSlotId => ownerSlotId === this.ownerSlotId
      );
    }
  },
  methods: {
    ...mapActions(["addNewElementByType"]),
    async createdNewElement({ type, props }) {
      this.dialogNewVisible = false;
      await this.addNewElementByType({
        type,
        ownerSlotId: this.ownerSlotId,
        props
      });
    }
  }
};
</script>
