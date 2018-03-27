import { generateId } from "libs/utils";

const getPropsForBuilder = metaProps =>
  Object.keys(metaProps || {})
    .filter(name => !!metaProps[name].builderLabel)
    .reduce((res, name) => {
      res[name] = metaProps[name];
      return res;
    }, {});

const LAYOUTS_PREFIX = "Layouts/";
export const getLayoutElementType = layout => `${LAYOUTS_PREFIX}${layout}`;
export const getConfigLayouts = async (type = null) => {
  const config = await import(`components/Elements/${LAYOUTS_PREFIX}${
    type ? `${type}/` : ""
  }config`);
  return config.default;
};
export const getConfigElements = async (type = null) => {
  const config = await import(`components/Elements/${
    type ? `${type}/` : ""
  }config`);
  return config.default;
};
export const getElementConfigByType = async type => {
  if (type.indexOf(LAYOUTS_PREFIX) === 0) {
    return getConfigLayouts(type.replace(LAYOUTS_PREFIX, ""));
  }
  return getConfigElements(type);
};
export const getBuilderForElementByType = elementType =>
  import(`components/Elements/${elementType}/Builder`);
export const getPropertyRulesForBuilder = configProp => {
  const trigger = "blur";
  const res = [
    {
      required: !!configProp.required,
      trigger
    }
  ];
  if (configProp.validator) {
    res.push({
      validator: (rule, value, callback) => {
        if (configProp.validator(value)) {
          callback();
        } else {
          callback(new Error("Invalid"));
        }
      }
    });
  }
  const types =
    configProp.type instanceof Array ? configProp.type : [configProp.type];
  return res;
};
export const metaPropsByElementType = async elementType => {
  const config = await getElementConfigByType(elementType);
  return getPropsForBuilder(config.metaProps);
};
export const metaPropsDefaultValuesByElementType = async elementType => {
  const config = await getElementConfigByType(elementType);
  return Object.keys(config.metaProps || {}).reduce((accumulator, name) => {
    if (config.metaProps[name].default !== undefined) {
      accumulator[name] = config.metaProps[name].default; // eslint-disable-line no-param-reassign
    }
    return accumulator;
  }, {});
};
export const convertSlotNamesToIds = (slot_names = []) =>
  slot_names.reduce((accumulator, name) => {
    accumulator[name] = generateId(); // eslint-disable-line no-param-reassign
    return accumulator;
  }, {});
