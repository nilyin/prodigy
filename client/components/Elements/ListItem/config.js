import configCss from "components/Elements/Common/Css/config";
import { merge } from "lodash";

export default merge({}, configCss, {
  SLOT_NAMES: ["content"],
  NAME: "ListItem",
  metaProps: {
    order: {
      type: Number,
      default: 0
    },
    cssTextAlign: {
      default: "center"
    }
  }
});
