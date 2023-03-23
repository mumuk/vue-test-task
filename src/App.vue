<template>
  <div class="w-40 flex items-center w-[300px]"></div>

  <UserPostalInput @submitPostalEvent="getZipCodeData"/>
  <p v-if="error">{{ error }}</p>
  <div class="flex flex-col mt-2 content-center items-center" v-if="isShowedLocationInfo">
    <InfoComponent :data="requestedLocationData" :title="`Location info`"/>
    <div class="flex">
      <GenericButton @click="getUserIpInfo">{{ toggleUserInfoButtonTitle }}</GenericButton>
      <GenericButton @click="resetData">Reset</GenericButton>

    </div>
    <InfoComponent :data="userInfo" :title="`User info`" v-if="isShowedUserInfo"/>

  </div>
</template>

<script>
import UserPostalInput from './components/UserZipCodeInput.vue';
import InfoComponent from './components/InfoComponent.vue';
import GenericButton from './components/GenericButton.vue';
import { getZipCodeInfo, getIpInfo, getUTMTags } from './services/getDataService';

export default {
  name: 'App',
  components: {
    UserPostalInput,
    InfoComponent,
    GenericButton,
  },
  data() {
    return {
      zip: '',
      requestedLocationData: null,
      userInfo: null,
      isShowedLocationInfo: false,
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
      this.isShowedLocationInfo = false;
    },
    getUserIpInfo() {
      this.getIpData();
      this.isShowedUserInfo = !this.isShowedUserInfo;
    },
    async getZipCodeData(code) {
      if (this.zip === code) {
        return;
      }

      this.zip = code;
      this.requestedLocationData = null;
      this.error = null;
      const result = await getZipCodeInfo(this.zip);
      if (result.error) {
        this.error = result.message;
      } else {
        this.requestedLocationData = { ...result };
        this.isShowedLocationInfo = true;
      }
    },
    async getIpData() {
      this.error = null;
      const ipInfo = await getIpInfo();

      if (ipInfo.error) {
        this.error = ipInfo.message;
      } else {
        const utmTags = getUTMTags();
        if (utmTags) {
          this.userInfo = { ...ipInfo, ...utmTags };
        } else {
          this.userInfo = ipInfo;
        }
      }
    },
  },
};
</script>
