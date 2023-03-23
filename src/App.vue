<template>
  <div class="w-40 flex items-center w-[300px]"></div>

  <UserPostalInput @submitPostalEvent="getZipCodeData"/>
  <p v-if="error">{{ error }}</p>
  <div class="flex flex-col mt-2 content-center items-center" v-if="showLocationInfo">
    <InfoComponent :data="requestedLocationData" :title="`Location info`"/>
    <div class="flex">
      <GenericButton @click="getUserIpInfo">{{ toggleUserInfoButtonTitle }}</GenericButton>
      <GenericButton @click="resetData">Reset</GenericButton>
    </div>
    <InfoComponent :data="userInfo" :title="`User info`" v-if="isShowedUserInfo"/>

  </div>
</template>

<script>
import UserPostalInput from './components/UserPostalInput.vue';
import InfoComponent from './components/InfoComponent.vue';
import GenericButton from './components/GenericButton.vue';
import { getZipCodeInfo, getIpInfo } from './services/getDataService';

export default {
  name: 'App',
  components: {
    UserPostalInput,
    InfoComponent,
    GenericButton,
  },
  data() {
    return {
      requestedLocationData: {},
      userInfo: {},
      showLocationInfo: false,
      isShowedUserInfo: false,
      error: null,
    };
  },
  computed: {
    toggleUserInfoButtonTitle() {
      return this.isShowedUserInfo ? 'Hide user IP info' : 'Show user IP info';
    },
  },

  methods: {
    resetData() {
      this.requestedLocationData = null;
      this.showLocationInfo = false;
    },
    getUserIpInfo() {
      this.getIpData();
      this.isShowedUserInfo = !this.isShowedUserInfo;
    },
    async getZipCodeData(code) {
      this.error = null;
      const result = await getZipCodeInfo(code);
      if (result.error) {
        this.error = result.message;
      } else {
        this.requestedLocationData = result;
        this.showLocationInfo = true;
      }
    },
    async getIpData() {
      this.error = null;
      const result = await getIpInfo();

      if (result.error) {
        this.error = result.message;
      }
      this.userInfo = { ...result, referrer: document.referrer, userAgent: navigator.userAgent };
    },
  },
};
</script>
