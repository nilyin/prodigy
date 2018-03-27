export default {
  computed: {
    items() {
      return this.getListComponentsForSlot("items");
    },
    layout() {
      return this.items.map(item => item.props);
    }
  }
};
