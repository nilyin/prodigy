<template>
  <div>
    <el-steps
      v-if="!preflightElement"
      :active="step"
      align-center>
      <el-step title="Choose element"/>
      <el-step title="Configuration"/>
    </el-steps>

    <el-row v-if="step == 0 && !preflightElement">
      <el-col
        v-for="(configElement, element) in configElements"
        :span="8"
        :key="element">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px;">
            <span>{{ configElement.NAME }}</span>
            <div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                @click="chooseElement(element)">Choose</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <div v-if="step == 1 || preflightElement">
      <el-button
        v-if="!preflightElement"
        type="text"
        class="button"
        @click="choosedElement = null">
        Return to list of elements
      </el-button>
      <edit-element-props
        :element-type="choosedElement || preflightElement"
        @save="saveNewElement"/>
    </div>
  </div>
</template>

<script>
import { pickBy, keys } from "lodash";
import { getConfigElements } from "components/utils";
import EditElementProps from "./EditElementProps";

export default {
  components: {
    EditElementProps
  },
  props: {
    allowElements: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      choosedElement: null
    };
  },
  asyncComputed: {
    async configElements() {
      const config = await getConfigElements();
      return this.allowElements
        ? pickBy(
            config,
            (_value, type) => this.allowElements.indexOf(type) !== -1
          )
        : config;
    }
  },
  computed: {
    step() {
      return this.choosedElement ? 1 : 0;
    },
    preflightElement() {
      const configElementTypes = keys(this.configElements);
      return configElementTypes.length === 1 ? configElementTypes[0] : null;
    }
  },
  methods: {
    chooseElement(element) {
      this.choosedElement = element;
    },
    saveNewElement(props) {
      this.$emit("created", {
        type: this.choosedElement || this.preflightElement,
        props
      });
      this.choosedElement = null;
    }
  }
};
</script>
