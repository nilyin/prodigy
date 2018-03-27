export default {
  rootComponents: state => state.components.filter(item => !item.ownerSlotId),
  getListComponentsByOwnerSlotId: (state, getters) => ownerSlotId =>
    state.components.filter(item => item.ownerSlotId === ownerSlotId),
  getComponentByOwnerSlotId: (state, getters) => ownerSlotId =>
    state.components.find(item => item.ownerSlotId === ownerSlotId),
  getOwnerComponentBySlotId: (state, getters) => slotId =>
    state.components.find(
      item => Object.values(item.slotNamesToIds).indexOf(slotId) !== -1
    ),
  getUi: (state, getters) => () => state.components
};
