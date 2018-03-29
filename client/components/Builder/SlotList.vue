<template>
  <slot
    v-for="component_props in component_list"
    :component_props="component_props"
    name="slot_component"/>
</template>

<script>
export default {};
</script>
