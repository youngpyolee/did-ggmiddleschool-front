export default {

  namespaced: true,

  state : {
      t1h:"",
      rn1:"",
      khaiValue:"",
      so2Value:"",
      pm10ValueText:"",

  },
  // Vue.js methods 옵션과 유사합니다.
  // 상태(State)는 변이(Mutations)를 통해서만 값을 바꿀 수 있습니다.
  mutations: {
    weatherSave(state,payload) {
        state.t1h    = payload.T1H;
        state.rn1    = payload.RN1;
    },
    dustSave(state,payload) {
       state.khaiValue    = payload.khaiValue;
       state.so2Value    = payload.so2Value;
       state.pm10ValueText    = payload.pm10ValueText;
    },
  },

  actions: {
      weatherSaveAction({ state, commit }, payload) {
        commit('weatherSave',payload);
     },
     dustSaveAction({ state, commit }, payload) {
        commit('dustSave',payload);
     },
  }
}
