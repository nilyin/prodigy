export default {
  SLOT_NAMES: ["items"],
  SLOT_ALLOW_ELEMENTS: {
    items: ["GridItem"]
  },
  NAME: "Grid",
  metaProps: {
    marginX: {
      type: Number,
      default: 0
    },
    marginY: {
      type: Number,
      default: 0
    },
    colNum: {
      type: Number,
      default: 10
    },
    rowHeight: {
      type: Number,
      default: 30
    }
  }
};
