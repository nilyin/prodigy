<template>
  <el-form
    ref="editForm"
    :rules="validationRules"
    :model="propsValuesTmp"
    label-width="120px">
    <el-form-item
      v-for="(configProp, nameProp) in propsForBuilder"
      :key="nameProp"
      :required="!!configProp.required"
      :label="configProp.builderLabel"
      :prop="nameProp">
      <el-input v-model="propsValuesTmp[nameProp]"/>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="save()">
        Save
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {
  getPropsForBuilder,
  getPropertyRulesForBuilder,
  metaPropsByElementType
} from "components/utils";
import { convertVueToNormal } from "libs/utils";
import { clone } from "lodash";

export default {
  props: {
    elementType: {
      type: String,
      required: true
    },
    propsValues: {
      type: Object,
      default: () => ({}),
      required: false
    }
  },
  data() {
    return {
      propsValuesTmp: clone(this.propsValues)
    };
  },
  asyncComputed: {
    async propsForBuilder() {
      return metaPropsByElementType(this.elementType);
    }
  },
  computed: {
    validationRules() {
      return Object.keys(this.propsForBuilder || {}).reduce(
        (accumulator, name) => {
          // eslint-disable-next-line no-param-reassign
          accumulator[name] = getPropertyRulesForBuilder(
            this.propsForBuilder[name]
          );
          return accumulator;
        },
        {}
      );
    }
  },
  watch: {
    propsForBuilder(propsForBuilder) {
      Object.keys(propsForBuilder || {}).forEach(name => {
        if (!this.propsValuesTmp[name] && propsForBuilder[name].default) {
          this.propsValuesTmp[name] = propsForBuilder[name].default;
        }
      }, this);
    }
  },
  methods: {
    save() {
      this.$refs.editForm.validate(
        valid =>
          valid
            ? this.$emit("save", convertVueToNormal(this.propsValuesTmp))
            : false
      );
    }
  }
};
</script>
