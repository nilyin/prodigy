import {
  convertSlotNamesToIds,
  metaPropsDefaultValuesByElementType,
  getElementConfigByType
} from "components/utils";

const addNewElementByType = async (
  store,
  { type, ownerSlotId = null, props = {}, slotsElements = null }
) => {
  const { commit } = store;
  const cfg = await getElementConfigByType(type);
  const slotNamesToIds = convertSlotNamesToIds(cfg.SLOT_NAMES || []);
  const propsDefault = await metaPropsDefaultValuesByElementType(type);

  commit("addComponent", {
    type,
    ownerSlotId,
    slotNamesToIds,
    props: {
      ...propsDefault,
      ...props
    }
  });

  const defaultSlotsElements =
    slotsElements || cfg.DEFAULT_SLOTS_ELEMENTS
      ? Object.assign({}, slotsElements || cfg.DEFAULT_SLOTS_ELEMENTS)
      : null;

  if (defaultSlotsElements) {
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const slotName in defaultSlotsElements) {
      const valueOfSlot = defaultSlotsElements[slotName];
      const elementListFromSlotCfg = Array.isArray(valueOfSlot)
        ? valueOfSlot
        : [valueOfSlot];
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const elementFromSlotCfg of elementListFromSlotCfg) {
        // eslint-disable-next-line no-await-in-loop
        await addNewElementByType(store, {
          type: elementFromSlotCfg.type,
          ownerSlotId: slotNamesToIds[slotName],
          props: elementFromSlotCfg.props,
          slotsElements: elementFromSlotCfg.DEFAULT_SLOTS_ELEMENTS
        });
      }
    }
  }
};

export default {
  addNewElementByType
};
