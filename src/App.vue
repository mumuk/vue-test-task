<template>
  <div class="flex flex-col items-center">

    <label for="zipCodeInout" class="flex flex-col">Enter your zip code
      <input
        id="zipCodeInout" type="text" class="border-2 mb-3 text-center"
        v-model="zip"
      >
    </label>
    <GenericButton @click="getZipCodeData">Show location info</GenericButton>

    <p v-if="error">{{ error }}</p>

    <div class="flex flex-col mt-2 content-center items-center" v-if="isShowLocationInfo">

      <InfoComponent :data="requestedLocationData" :title="`Location info`"/>

      <div class="flex">
        <GenericButton @click="toggleUserIpInfo">{{ toggleUserInfoButtonTitle }}</GenericButton>
        <GenericButton @click="resetData">Reset</GenericButton>
      </div>

      <InfoComponent :data="userInfo" :title="`User info`" v-if="isShowUserInfo"/>
    </div>

  </div>
</template>

<script>
import InfoComponent from './components/InfoComponent.vue';
import GenericButton from './components/GenericButton.vue';
import { getZipCodeInfo, getIpInfo } from './services/getDataService';

export default {
  name: 'App',
  components: { InfoComponent, GenericButton },
  data() {
    return {
      zip: '',
      requestedLocationData: null,
      userInfo: null,
      isShowLocationInfo: false,
      isShowUserInfo: false,
      error: null,
    };
  },
  computed: {
    toggleUserInfoButtonTitle() {
      return this.isShowUserInfo ? 'Hide user info' : 'Show user info';
    },
  },

  methods: {
    resetData() {
      this.zip = '';
      this.error = null;
      this.requestedLocationData = null;
      this.isShowLocationInfo = false;
    },

    toggleUserIpInfo() {
      this.isShowUserInfo = !this.isShowUserInfo;
      if (!this.isShowUserInfo) {
        this.error = null;
      } else {
        this.getIpData();
      }
    },

    async getZipCodeData() {
      this.error = null;

      const zipInfo = await getZipCodeInfo(this.zip);
      if (zipInfo.error) {
        this.error = zipInfo.message;
      } else {
        this.requestedLocationData = { ...zipInfo };
        this.isShowLocationInfo = true;
      }
    },

    async getIpData() {
      this.error = null;

      const ipInfo = await getIpInfo();
      if (ipInfo.error) {
        this.error = ipInfo.message;
      } else {
        this.userInfo = ipInfo;
      }
    },
  },
};
</script>
