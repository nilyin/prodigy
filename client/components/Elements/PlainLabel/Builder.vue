<script>
import Builder from "components/Elements/Label/Builder";

export default {
  extends: Builder,
  props: {
    resizable: {
      type: Boolean,
      default: () => false
    },
    editorOptions: {
      type: Object,
      default: () => ({
        toolbar: false
      })
    }
  }
};
</script>
