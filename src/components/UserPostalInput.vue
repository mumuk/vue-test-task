<template>
  <div class="flex flex-col items-center">
    <label for="zipCodeInout" class="flex flex-col">Enter your zip code
      <input
        id="zipCodeInout" type="text" class="border-2 mb-3 text-center"
        v-model="zipCodeValue"
      >
    </label>
    <GenericButton @click="submitLocationData">Render location info</GenericButton>
  </div>
</template>

<script>
import GenericButton from '@/components/GenericButton.vue';

export default {
  name: 'UserPostalInput',
  components: {
    GenericButton,
  },
  data() {
    return {
      zipCodeValue: '',
    };
  },
  methods: {
    submitLocationData() {
      this.$emit('submitPostalEvent', this.zipCodeValue);
    },
  },
};
</script>

<style scoped>

</style>
