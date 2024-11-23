<template>
    <div>

        <!-- Filters -->
        <filters :regionFilter.sync="table.region_id" :region-options="regionOptions" :siteFilter.sync="table.site_id" :site-options="siteLists" :sub-site-filter.sync="table.sub_site_id"
        :sub-site-options="siteSubSiteLists" :category-filter.sync="table.category_id" :category-options="categoryLists"
        :module-filter.sync="table.module_id" :module-options="moduleLists" />

        <asset-detail-sidebar :is-asset-detail-sidebar-active.sync="isAssetDetailSidebarActive" />

        <!-- Table Container Card -->
        <b-card no-body class="mb-0">

            <div class="m-2"  v-if="myTaskList && myTaskList.assets">
                <!-- Table Top -->
                <b-row >
                    <!-- Per Page -->
                    <b-col cols="12" md="6" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
                        <label>Show</label>
                        <v-select v-model="table.perPage" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="perPageOptions" :clearable="false"
                            class="per-page-selector d-inline-block mx-50" />
                        <label>entries</label>
                    </b-col>

                    <!-- Search -->
                    <b-col cols="12" md="6">
                        <div class="d-flex align-items-center justify-content-end">
                            <b-form-input v-model="table.search" class="d-inline-block mr-1" placeholder="Search..." />
                        </div>
                    </b-col>
                </b-row>

            </div>

            <b-table hover ref="refUserListTable" class="position-relative"  v-if="myTaskList && myTaskList.assets" :items="myTaskList.assets" responsive
                :fields="tableColumns" primary-key="id" :sort-by.sync="table.sortBy" show-empty
                empty-text="No matching records found" :sort-desc.sync="isSortDirDesc" sticky-header>

                <!-- Column: Row # -->
                <template #cell(row)="data">
                    <div class="px-2">
                        {{ (table.page - 1) * table.perPage + data.index + 1 }}
                    </div>
                </template>

                <!-- Column: Expires -->
                <template #cell(expires)="data">
                    <div class="text-center">
                        <span v-if="data.item.expires" class="text-nowrap" :class="{'text-danger': data.item.hasExpired}">{{ data.item.expires }}</span>
                        <span v-else class="text-nowrap">N/A</span>
                    </div>
                </template>

                <!-- Column: Last Inspection -->
                <template #cell(last_inspection)="data">
                    <div class="text-center">
                        <span v-if="data.item.last_inspection" class="text-nowrap">{{ data.item.last_inspection }}</span>
                        <span v-else class="text-nowrap">N/A</span>
                    </div>
                </template>

                <!-- Column: Inspected By -->
                <template #cell(inspected_by)="data">
                    <div class="text-center">
                        <span v-if="data.item.inspected_by" class="text-nowrap">{{ data.item.inspected_by }}</span>
                        <span v-else class="text-nowrap">N/A</span>
                    </div>
                </template>

                <!-- Column: q(Color) -->
                <template #cell(asset_q_color)="data">
                    <div v-if="data.item.asset_q_color" class="text-center asset-listing-color" :style="'background-color: ' + data.item.asset_q_color">
                        <span class="text-white" v-if="
                                data.item.asset_q_color == 'rgb(0,0,255)' ||
                                data.item.asset_q_color == 'rgb(128,128,128)' ||
                                data.item.asset_q_color == 'rgb(255,0,0)'">
                                {{ getColorText(data.item.asset_q_color) }}
                        </span>
                        <span class="text-black" v-else>
                            {{ getColorText(data.item.asset_q_color) }}</span>
                    </div>
                    <div v-else class="text-center asset-listing-color">
                        <span>N/A</span>
                    </div>
                </template>

                <!-- Column: q(Color) -->
                <template #cell(q)="data">
                    <div
                        v-if="data.item.q"
                        class="text-center asset-listing-color"
                        :style="'background-color: ' + data.item.q"
                    >
                        <span v-if="data.item.inspection_schedule_rgby == 'Y'">
                            Quarterly with RGBY
                        </span>
                        <span v-else-if="data.item.q">
                            {{ getInspectionScheduleText(data.item.q) }}
                        </span>
                        <span v-else class="text-nowrap">N/A</span>
                    </div>
                </template>

                <!-- Column: Status -->
                <template #cell(status)="data">
                    <span :class="'text-' + data.item.variant">
                    {{ data.item.status }}</span>
                </template>

                <template #cell(actions)="data">
                    <div class="d-flex justify-content-center">
                        <b-button variant="white" @click="goToAssetDetail(data.item.id, data.item.module_id)" class="p-0 blue-icon">
                            <feather-icon :id="`asset-row-${data.item.id}-view-detail`" icon="EyeIcon" size="16"
                            class="mx-1" />
                            <b-tooltip title="View Detail" :target="`asset-row-${data.item.id}-view-detail`" />
                        </b-button>

                    </div>
                </template>

            </b-table>
            <!-- Data Information & Pagination -->
            <div class="mx-2 mb-2" v-if="myTaskList.total > 0">
                <b-row>

                    <b-col cols="12" sm="6"
                        class="d-flex align-items-center justify-content-center justify-content-sm-start">
                        <span class="text-muted">Showing {{ myTaskList.pagination.from }} to {{ myTaskList.pagination.to }} of {{ myTaskList.pagination.total }} entries</span>
                    </b-col>
                    <!-- Pagination -->
                    <b-col cols="12" sm="6"
                        class="d-flex align-items-center justify-content-center justify-content-sm-end">

                        <b-pagination v-model="table.page" :total-rows="myTaskList.pagination.total" :per-page="table.perPage"
                            first-number last-number class="mb-0 mt-1 mt-sm-0" prev-class="prev-item"
                            next-class="next-item">
                            <template #prev-text>
                                <feather-icon icon="ChevronLeftIcon" size="18" />
                            </template>
                            <template #next-text>
                                <feather-icon icon="ChevronRightIcon" size="18" />
                            </template>
                        </b-pagination>

                    </b-col>

                </b-row>
            </div>
        </b-card>


    </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BImg,
  BForm,
  BFormInput,
  BFormInvalidFeedback,
  BButton,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
  BFormCheckbox,
  BFormFile,
  BTooltip,
} from "bootstrap-vue";
import BaseMixins from "@/mixins/BaseMixins";
import Filters from "./Filters.vue";
import AssetDetailSidebar from '../../area/area-list/asset/details/Index.vue';
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import router from '@/router'
import store from '@/store';
import { mapActions, mapGetters } from "vuex";
import vSelect from 'vue-select'
import { ValidationProvider, ValidationObserver } from "vee-validate";
import ErrorMessage from "@/views/error/ErrorMessage";
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
import Vue from 'vue'
import moment from 'moment';
Vue.use(VueViewer)




export default {
    mixins: [BaseMixins],
    data(){
        return{
            isAssetDetailSidebarActive: false,
            perPageOptions: [10, 25, 50, 100],
            tableColumns: [
                { key: "row", label: "Row #" },
                { key: "uid", label: "UID", sortable: true },
                { key: "region", label: "Region" },
                { key: "location", label: "Location" },
                { key: "area", label: "Area" },
                { key: "category", label: "Category" },
                { key: "module", label: "Module" },
                { key: "q", label: "Inspection Schedule" },
                { key: "asset_q_color", label: "Current Quarter" },
                { key: "status", label: "Status" },
                { key: "expires", label: "Expires" },
                { key: "last_inspection", label: "Last Inspection" },
                { key: "inspected_by", label: "Inspected By"},
                { key: "assigned_by", label: "Assigned By"},
                { key: "actions", label: "Actions", thClass: "text-center" },
            ],
            isSortDirDesc: true,
            importError: false,
            importErrorMessage: '',
            importErrorFilePath: [],
            regionOptions: [],
            siteLists: [],
            siteSubSiteLists: [],
            moduleLists: [],
            categoryLists: [],
            oldRegionId: null,
            oldSiteId: null,
            oldSubSiteId: null,
            oldCategoryId: null,
            table: {
                module_id: null,
                sub_site_id: null,
                sortBy: null,
                sortDesc: true,
                perPage: 25,
                search: null,
                role: '',
                status: '',
                page: 1,
                region_id: null,
                site_id: null,
                category_id: null,
            },
            selected: [],
            selectAll: false,
        }
    },
    components:{
        Filters,
        AssetDetailSidebar,
        BCard,
        BRow,
        BCol,
        BFormInput,
        BButton,
        BTable,
        BMedia,
        BAvatar,
        BLink,
        BBadge,
        BDropdown,
        BDropdownItem,
        BPagination,
        vSelect,
        BFormCheckbox,
        BTooltip,
        BImg,
        BForm,
        BFormFile,
        BFormInvalidFeedback,
        ValidationProvider,
        ValidationObserver,
        ErrorMessage,
    },
    computed: {
        ...mapGetters("auth", ["authUserData"]),
        ...mapGetters("category", ["userCategoryOptions"]),
        ...mapGetters('task', ['myTaskList']),
        ...mapGetters('gotoSite', ['selectedSubSiteId', 'fieldsList', 'sampleColumns', 'defaultAsset','activeModuleHasImage', 'activeModuleId']),
        isDisabled() {
            return this.selected.length === 0
        },
    },
    methods: {
        ...mapActions("task", ["getAllMyTask", "setTable"]),
        ...mapActions("region", ["getUserRegionList"]),
        ...mapActions("location", ["getUserLocationList"]),
        ...mapActions("area", ["getUserAreaList"]),
        ...mapActions("category", ["getUserCategoryOptions"]),
        ...mapActions("module", ["getModuleList"]),
        ...mapActions('siteManager', ['getMaxFileSize', 'getAssetsList', 'getSitesAndSubSitesList', 'setSideBar','getClientPanelCategory', 'defaultSite', 'defaultSubSite',]),
        ...mapActions('documents', ['getDocumentsList']),
        ...mapActions('activity', ['fetchAssetActivity']),
        ...mapActions('inspection', ['getAssetInspection']),
        ...mapActions('gotoSite', ['updateEditMode', 'updateModalButtonName', 'updateViewMode', 'setActiveModuleId', 'getAssetDetails', 'getFieldsList', 'deleteBatchAssets', 'setActiveUserId','setActiveSubSiteId', 'duplicateAsset','exportAssetListingData','generateSampleCSV','importAssets']),
        ...mapActions("dashboardListPrint", ["setupPrintDataAction"]),

        goToAssetDetail(assetId, moduleId) {
            // open slider/sidebar
            this.updateViewMode(true);
            this.updateEditMode(true);
            this.updateModalButtonName('Update');
            this.setActiveSubSiteId(this.table.sub_site_id);
            this.isAssetDetailSidebarActive = true;

            // Action to API call to get assets details
            this.getAssetDetails(assetId);

            // Get field list based on asset module
            if(moduleId > 0) {
                this.getFieldsList({ moduleId: moduleId });
            }

            // Action to API call to get assets documents
            this.getDocumentsList({
                asset_id: assetId,
                per_page: 10,
                search: '',
                page: 1,
                sortBy: 'ad_id',
                sortDesc: false
            });
            this.fetchAssetActivity(assetId);
            // Action to API call to get assets inspection
            this.getAssetInspection(assetId);
            this.setSideBar(true);

            // SetTable data for listing page
            this.setTable(this.table);
        },

    },
    mounted() {
        // List blank for first time
        store.commit('task/UPDATE_MY_TASK_LIST', {});

        // Get all my task
        this.getAllMyTask();

        // Get all active region
        this.getUserRegionList()
            .then((response) => {
                this.regionOptions = response.data;
            })
            .catch((error) => {
                this.showToast("Error", "XIcon", "danger", error.data.message);
            });
    },
    watch:{
        table: {
            handler(val) {
                    if(this.table.region_id > 0 || this.table.site_id > 0 || this.table.sub_site_id > 0 || this.table.category_id > 0 || this.table.module_id > 0 || this.table.assigned_to_user_id > 0) {
                        this.getAllMyTask(this.table);
                    }else {
                        store.commit('task/UPDATE_MY_TASK_LIST', {})
                    }
            this.scrollToTopDataTable('refUserListTable'); // Pass the dynamic ref name here
            },
            deep: true,
        },
        'table.region_id': function (val) {
            if (val > 0) {
                // Get location list based on the region selection
                this.getUserLocationList({ region_id: val }).then((response) => {
                    this.siteLists = response.data;
                }).catch((error) => {
                    this.showToast("Error", "XIcon", "danger", error.data.message);
                });
            }

            if(this.oldRegionId != val) {
                this.oldRegionId       = val;
                this.table.site_id = null;
                this.table.sub_site_id = null;
                this.table.category_id = null;
                this.table.module_id   = null;
                this.categoryLists     = [];
                this.moduleLists       = [];
            }
        },
        'table.site_id': function (val) {
            if (val > 0) {
                this.getUserAreaList({ site_id: val }).then((response) => {
                    this.siteSubSiteLists = response.data;
                }).catch((error) => {
                this.showToast("Error", "XIcon", "danger", error.data.message);
                });
            }

            // Rest filter data
            if(this.oldSiteId != val){
                this.oldSiteId      = val;
                this.table.sub_site_id = null;
                this.table.category_id = null;
                this.table.module_id   = null;
                this.categoryLists     = [];
                this.moduleLists       = [];

                // List blank for first time
                store.commit('task/UPDATE_MY_TASK_LIST', {});
            }
        },
        'table.sub_site_id': function(val){
            this.getClientPanelCategory({user_id : null, sub_site_id: val }).then((response) => {
                this.categoryLists = response;
            });

            if(this.oldSubSiteId != val){
                this.oldSubSiteId      = val;
                this.table.category_id = null;
                this.table.module_id   = null;
                this.categoryLists     = [];
                this.moduleLists       = [];

                // List blank for first time
                store.commit('task/UPDATE_MY_TASK_LIST', {});
            }
        },
        'table.category_id': function(val){
            if(val > 0) {
                this.getModuleList({sub_site_id: this.table.sub_site_id, category_id: this.table.category_id}).then((response) => {
                    this.moduleLists = response.data.moduleList;
                }).catch((error) => {
                    this.showToast("Error", "XIcon", "danger", error.data.message);
                });
            }

            if(this.oldCategoryId != val){
                this.oldCategoryId = val;
                this.table.module_id = null;
                this.moduleLists = [];

                // List blank for first time
                store.commit('task/UPDATE_MY_TASK_LIST', {});
            }
        },
        'table.module_id': function(val) {
            this.setActiveModuleId(val);
            this.getFieldsList({ moduleId: val });
        },
    }

};
</script>
<style lang="scss">
@import '~@resources/scss/vue/libs/vue-select.scss';
