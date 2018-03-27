export default {
  methods: {
    onResize(x, y, width, height) {
      this.updateProperty("dimensionX", x);
      this.updateProperty("dimensionY", y);
      this.updateProperty("dimensionWidth", width);
      this.updateProperty("dimensionHeight", height);
    },
    onDrag(x, y) {
      this.updateProperty("dimensionX", x);
      this.updateProperty("dimensionY", y);
    }
  }
};
