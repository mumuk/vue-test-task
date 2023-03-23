<template>
<button
  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-48 m-2"
  @click="handleClick"
><slot></slot></button>
  <button ></button>
</template>

<script>
export default {
  name: 'GenericButton',
  emits: ['click'],
  methods: {
    handleClick(e) {
      this.$emit('click', e);
    },
  },

};
</script>

<style >

</style>
