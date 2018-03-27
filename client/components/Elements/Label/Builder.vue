<template>
  <vue-draggable-resizable
    v-if="resizable"
    :parent="true"
    :w="customProps.dimensionWidth"
    :h="customProps.dimensionHeight"
    :x="customProps.dimensionX"
    :y="customProps.dimensionY"
    :maximize="false"
    @dragging="onDrag"
    @resizing="onResize">
    <a
      v-if="customProps.href"
      :href="customProps.href">
      {{ customProps.content }}
    </a>
    <editor
      v-else
      :text="customProps.content"
      :options="editorOptions"
      style="height: 100%; overflow: hidden;"
      @edit="handleEdit" />
  </vue-draggable-resizable>
  <a
    v-else-if="customProps.href"
    :href="customProps.href">
    {{ customProps.content }}
  </a>
  <editor
    v-else
    :text="customProps.content"
    :options="editorOptions"
    style="height: 100%; overflow: hidden;"
    @edit="handleEdit" />
</template>

<script>
import Editor from "vue2-medium-editor";
import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/flat.css";

import VueDraggableResizable from "vue-draggable-resizable";
import Base from "./Base";

export default {
  components: {
    VueDraggableResizable,
    Editor
  },
  mixins: [Base],
  props: {
    resizable: {
      type: Boolean,
      default: () => false
    },
    editorOptions: {
      type: Object,
      default: () => ({
        toolbar: {
          allowMultiParagraphSelection: true,
          buttons: [
            "bold",
            "italic",
            "underline",
            "anchor",
            "h2",
            "h3",
            "quote"
          ],
          diffLeft: 0,
          diffTop: -10,
          relativeContainer: null,
          standardizeSelectionStart: false,
          static: false,
          /* options which only apply when static is true */
          align: "center",
          sticky: false,
          updateOnEmptySelection: false
        }
      })
    }
  },
  methods: {
    handleEdit(operation) {
      this.updateProperty("content", operation.api.origElements.innerHTML);
    }
  }
};
</script>
