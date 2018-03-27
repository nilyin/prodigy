import configCss from "components/Elements/Common/Css/config";
import { merge } from "lodash";

export default merge({}, configCss, {
  SLOT_NAMES: ["content"],
  NAME: "GridItem",
  metaProps: {
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    },
    w: {
      type: Number,
      required: true
    },
    h: {
      type: Number,
      required: true
    },
    i: {
      type: String,
      required: true
    },
    cssTextAlign: {
      default: "center"
    },
    cssPadding: {
      default: "4rem 0 0 0"
    },
    cssBackgroundColor: {
      default: "#f6f8fa"
    }
  }
});
