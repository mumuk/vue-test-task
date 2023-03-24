<template>
  <div class="border-2 w-[400px] p-3 m-3 " v-if="data!==null">
    <h3 class="font-bold">{{ title }}</h3>
    <div v-for="(value, propName) in data" :key="propName">
      <p class="text-left">
        <span class="font-bold">{{ propName.charAt(0).toUpperCase() + propName.slice(1).split(/(?=[A-Z])/).join(' ') }}: </span>
        <span>{{ value }}</span></p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'InfoBlock',
  props: ['data', 'title'],
};
</script>

<style scoped>

</style>
