<template>
  <div class="builder-edit-slot">
    <add-to-slot
      v-show="!componentList.length"
      :owner-slot-id="id" />
    <factory-element
      v-for="item in componentList"
      v-if="componentList.length"
      :key="item.type"
      :component-in-store="item" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getConfigElements } from "components/utils";
import FactoryElement from "components/Builder/FactoryElement";
import configElements from "components/Elements/config";

import AddToSlot from "./AddToSlot";

export default {
  components: {
    AddToSlot,
    FactoryElement
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  asyncComputed: {
    configElements() {
      return getConfigElements();
    }
  },
  computed: {
    ...mapGetters(["getListComponentsByOwnerSlotId"]),
    componentList() {
      return this.getListComponentsByOwnerSlotId(this.id);
    }
  }
};
</script>
