import { mapMutations } from "vuex";
import Base from "components/Elements/Base";

export default {
  extends: Base,
  methods: {
    ...mapMutations(["deleteComponent", "editComponent"]),
    removeSelf(e) {
      this.deleteComponent(this.componentInStore);
    },
    updateProperty(name, value) {
      this.editComponent({ component: this.componentInStore, name, value });
    }
  }
};
