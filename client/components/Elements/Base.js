import { mapGetters } from "vuex";

export default {
  props: {
    componentInStore: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      "getListComponentsByOwnerSlotId",
      "getComponentByOwnerSlotId"
    ]),
    customProps() {
      return this.componentInStore.props;
    }
  },
  methods: {
    getSlotId(name) {
      return this.componentInStore.slotNamesToIds[name];
    },
    getListComponentsForSlot(name) {
      return this.getListComponentsByOwnerSlotId(this.getSlotId(name));
    },
    getComponentsForSlot(name) {
      return this.getComponentByOwnerSlotId(this.getSlotId(name));
    }
  }
};
