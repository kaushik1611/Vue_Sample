// Service File
import Http from '@/libs/axios';

class dashboardServices {

    // Get filter options
    async getFilterOptions(){
        return await Http.get('dashboard/filter-options').then((response) => {
            return response.data;
        }).catch((error) => {
            return error.response.data;
        });
    }

    // Other dashboard data
    async loadDashboardData(payload){
        return await Http.post('dashboard', payload).then((response) => {
            return response.data;
        }).catch((error) => {
            return error.response.data;
        });
    }

    // Get dashboard listing data
    async fetchDashboardListing(payload){
        return await Http.get('dashboard/listing', {params: payload}).then((response) => {
            return response.data;
        }).catch((error) => {
            return error.response.data;
        });
    }

    // Get asset detail
    async getAssetDetails(payload){
        return await Http.get('dashboard/asset-detail/'+payload).then((response) => {
            return response.data;
        }).catch((error) => {
            return error.response.data;
        });
    }

    // Export dashboard listing data
    async exportDashboardListingData(payload){
        return await Http.post('dashboard/listing-export', payload).then((response) => {
            return response.data;
        }).catch((error) => {
            return error.response.data;
        });
    }

    // Export dashboard asset detail
    async exportDashboardAssetDetailData(payload){
        return await Http.post('dashboard/asset-detail-export', payload).then((response) => {
            return response.data;
        }).catch((error) => {
            return error.response.data;
        });
    }

    // Get all asset data via search
    async getGlobalAssetSearch(payload) {
        return await Http.post('dashboard/global-asset-search', payload).then((response) => {
            if (response.status) {
                return response.data;
            } else {
                return {};
            }
        }).catch((error) => {
            return Promise.reject(error.response.data);
        });
    }

}

export default new dashboardServices();
