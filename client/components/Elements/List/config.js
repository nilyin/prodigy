export default {
  SLOT_NAMES: ["items"],
  SLOT_ALLOW_ELEMENTS: {
    items: ["ListItem"]
  },
  NAME: "List",
  metaProps: {
    cssClasses: {
      type: Array,
      required: false,
      default: [],
      builderLabel: "Css classes"
    },
    tag: {
      type: String,
      required: true,
      default: "ul",
      builderLabel: "Tag"
    },
    cssClassesItem: {
      type: Array,
      required: false,
      default: [],
      builderLabel: "Css classes for item"
    },
    tagItem: {
      type: String,
      required: true,
      default: "li",
      builderLabel: "Tag item"
    }
  }
};
