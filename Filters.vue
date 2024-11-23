<template>
  <b-card no-body>
    <b-card-header class="pb-50">
      <h5>Filter By:</h5>
    </b-card-header>
    <b-card-body>
      <b-row>
        <b-col cols="12" md="4" class="mb-md-0 mb-2 my-1">
          <label>Region</label>
          <v-select
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="regionFilter"
            :options="regionOptions"
            label="label"
            class="w-100"
            :reduce="(val) => val.value"
            @input="(val) => $emit('update:regionFilter', val)"
            placeholder="Please select Region"
            @change="resetData($event)"
            :clearable="false"
          />
        </b-col>
        <b-col cols="12" md="4" class="mb-md-0 mb-2 my-1">
          <label>Location</label>
          <v-select
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="siteFilter"
            :options="siteOptions"
            label="label"
            class="w-100"
            :reduce="(val) => val.value"
            @input="(val) => $emit('update:siteFilter', val)"
            placeholder="Please select Location"
            @change="resetData($event)"
            :clearable="false"
            :disabled="checkDisabled('location')"
          />
        </b-col>
        <b-col cols="12" md="4" class="mb-md-0 mb-2 my-1">
          <label>Area</label>
          <v-select
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="subSiteFilter"
            :options="subSiteOptions"
            label="text"
            class="w-100"
            :reduce="(val) => val.value"
            @input="(val) => $emit('update:subSiteFilter', val)"
            placeholder="Please select Area"
            :disabled="checkDisabled('area')"
          />
        </b-col>
        <b-col cols="12" md="4" class="mb-md-0 mb-2 my-1">
          <label>Category</label>
          <v-select
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="categoryFilter"
            :options="categoryOptions"
            label="label"
            class="w-100"
            :reduce="(val) => val.value"
            @input="(val) => $emit('update:categoryFilter', val)"
            placeholder="Please select Category"
            :disabled="checkDisabled('category')"
          />
        </b-col>
        <b-col cols="12" md="4" class="mb-md-0 mb-2 my-1">
          <label>Module</label>
          <v-select
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="moduleFilter"
            :options="moduleOptions"
            label="text"
            class="w-100"
            :reduce="(val) => val.value"
            @input="(val) => $emit('update:moduleFilter', val)"
            placeholder="Please select Module"
            :disabled="checkDisabled('module')"
          />
        </b-col>

      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
import { BCard, BCardHeader, BCardBody, BRow, BCol } from "bootstrap-vue";
import vSelect from "vue-select";

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardBody,
    vSelect,
  },
  props: {
    regionOptions: {
      type: Array,
      required: true,
    },
    regionFilter: {
      type: [String, Number, null],
      default: null,
    },
    siteOptions: {
      type: Array,
      required: true,
    },
    siteFilter: {
      type: [String, Number, null],
      default: null,
    },
    subSiteOptions: {
      type: Array,
    },
    subSiteFilter: {
      type: [String, Number, null],
      default: null,
    },
    categoryOptions: {
      type: Array,
    },
    categoryFilter: {
      type: [String, Number, null],
      default: null,
    },
    moduleOptions: {
      type: Array,
    },
    moduleFilter: {
      type: [String, Number, null],
      default: null,
    }
  },
  methods: {
        checkDisabled(type) {
            if (type == 'location') {
                if (this.regionFilter == 0 || this.regionFilter == null) {
                    return true
                }
                return false;
            } else if (type == 'area') {
                if (this.siteFilter == 0 || this.siteFilter == null) {
                    return true
                }
                return false;
            } else if (type == 'category') {
                if (this.subSiteFilter == 0 || this.subSiteFilter == null) {
                    return true
                }
                return false;
            } else if (type == 'module') {
                if (this.categoryFilter == 0 || this.categoryFilter == null) {
                    return true
                }
                return false;
            }
        },
    }
};
</script>

<style lang="scss">
@import "~@resources/scss/vue/libs/vue-select.scss";
</style>
