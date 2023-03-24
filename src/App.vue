<template>
  <div class="flex flex-col items-center">

    <label for="zipCodeInout" class="flex flex-col">Zip code
      <input
        id="zipCodeInout" type="text" class="border-2 mb-3 text-center"
        v-model="zip"
      >
    </label>
    <GenericButton @click="getZipCodeData">Show location info</GenericButton>

    <p v-if="error">{{ error }}</p>

    <div class="flex flex-col mt-2 content-center items-center" v-if="isShowLocationInfo">

      <InfoBlock :data="locationInfo" :title="`Location info`"/>

      <div class="flex">
        <GenericButton @click="toggleShowUserInfo">{{ toggleUserInfoButtonTitle }}</GenericButton>
        <GenericButton @click="resetInfo">Reset</GenericButton>
      </div>

      <InfoBlock :data="userInfo" :title="`User info`" v-if="isShowUserInfo"/>
    </div>

  </div>
</template>

<script>
import InfoBlock from './components/InfoBlock.vue';
import GenericButton from './components/GenericButton.vue';
import { getZipCodeInfo, getIpInfo } from './services/getDataService';

export default {
  name: 'App',
  components: { InfoBlock, GenericButton },
  data() {
    return {
      zip: '',
      locationInfo: null,
      isShowLocationInfo: false,
      userInfo: null,
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
    resetInfo() {
      this.zip = '';
      this.error = null;
      this.locationInfo = null;
      this.isShowLocationInfo = false;
      this.isShowUserInfo = false;
    },

    toggleShowUserInfo() {
      this.isShowUserInfo = !this.isShowUserInfo;
      if (!this.isShowUserInfo) {
        this.error = null;
      } else {
        this.getIpData();
      }
    },

    async getZipCodeData() {
      this.error = null;
      this.locationInfo = null;

      const zipInfo = await getZipCodeInfo(this.zip);
      if (zipInfo.error) {
        this.error = zipInfo.message;
      } else {
        this.locationInfo = { ...zipInfo };
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
