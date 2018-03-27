export default {
  addComponent(state, { type, ownerSlotId, slotNamesToIds, props }) {
    state.components.push({
      type,
      ownerSlotId,
      slotNamesToIds,
      props
    });
  },

  deleteComponent(state, component) {
    state.components.splice(state.components.indexOf(component), 1);
  },

  editComponent(state, { component, name, value }) {
    state.components.find(item => item === component).props[name] = value;
  },

  editComponentProps(state, { component, props }) {
    const componentInState = state.components.find(item => item === component);
    Object.keys(props || {}).forEach(name => {
      componentInState.props[name] = props[name];
    });
  },

  setCurrentEditingComponent(state, component) {
    state.currentEditingComponent = component;
  }
};
