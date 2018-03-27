<template>
  <edit-slot :id="getSlotId('content')"/>
</template>

<script>
import BaseElement from "components/Builder/BaseElement";
import EditSlot from "components/Builder/EditSlot";
import { mapMutations } from "vuex";
import Base from "./Base";

export default {
  components: {
    EditSlot
  },
  extends: BaseElement,
  mixins: [Base]
};
</script>
