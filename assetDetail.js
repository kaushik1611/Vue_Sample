// Store file
import dashboardServices from '@/services/dashboardServices'

export default {
    namespaced: true,
    state: {
        asset: {},
        backURL: null,
    },
    getters: {
        asset: state => {
            const { asset } = state
            return asset;
        },
        backURL: state => {
            const { backURL } = state
            return backURL;
        }
    },
    mutations: {
        UPDATE_ASSET(state, payload) {
            state.asset = payload
        },
        UPDATE_BACK_URL(state, payload) {
            state.backURL = payload
        }
    },
    actions: {
        getAssetDetails({ commit }, payload) {
            return new Promise((resolve, reject) => {
                dashboardServices.getAssetDetails(payload).then((response) => {
                    if(response.status == false) {
                        reject(response);
                    }
                    commit('UPDATE_ASSET', response.data);
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        setBackURL({commit}, payload) {
            commit('UPDATE_BACK_URL', payload)
        },
        exportDashboardAssetDetailData({commit}, payload) {
            return new Promise((resolve, reject) => {
                dashboardServices.exportDashboardAssetDetailData(payload).then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
            });
        }
    },
}
