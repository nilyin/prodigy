export default {
  computed: {
    items() {
      return this.getListComponentsForSlot("items");
    },
    sortedItems: {
      get() {
        return this.items.sort((one, two) => one.order - two.order);
      }
    }
  }
};
