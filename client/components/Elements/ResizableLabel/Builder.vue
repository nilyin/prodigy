<script>
import Builder from "components/Elements/Label/Builder";

export default {
  extends: Builder,
  props: {
    resizable: {
      type: Boolean,
      default: () => true
    }
  }
};
</script>
