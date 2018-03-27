export default {
  SLOT_NAMES: [],
  NAME: "Label",
  metaProps: {
    content: {
      type: String,
      required: true,
      default: "Text",
      builderLabel: "Content"
    },
    href: {
      type: String,
      required: false,
      builderLabel: "Href"
    }
  }
};
