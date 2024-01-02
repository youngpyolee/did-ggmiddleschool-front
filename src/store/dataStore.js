export default {

  namespaced: true,

  state : {
      highschoolCntList:[],
      highschoolDataFrame:null,
      serviceActStateList:[],
      pblprfrDspyStateList:[],
      dutyInterviewMasterData:{},
      tourStateList:[],
      contestStateList:[],
      outSideStateList:[],
      recommendBookDataFrame:null,

  },

  mutations: {
    highschoolCntListSave(state,payload) {
        state.highschoolCntList    = payload;
    },
    highschoolDataFrameSave(state,payload) {
        state.highschoolDataFrame    = payload;
    },
    serviceActStateListSave(state,payload) {
        state.serviceActStateList    = payload;
    },
    pblprfrDspyStateListSave(state,payload) {
        state.pblprfrDspyStateList    = payload;
    },
    dutyInterviewMasterDataSave(state,payload) {
        state.dutyInterviewMasterData    = payload;
    },
    tourStateListSave(state,payload) {
          state.tourStateList    = payload;
    },
    contestStateListSave(state,payload) {
          state.contestStateList    = payload;
    },
    recommendBookDataFrameSave(state,payload) {
        state.recommendBookDataFrame    = payload;
    },
    outSideStateListSave(state,payload) {
        state.outSideStateList    = payload;
    },
  },

  actions: {
      highschoolCntListSaveAction({ state, commit }, payload) {
        commit('highschoolCntListSave',payload);
     },
     highschoolDataFrameSaveAction({ state, commit }, payload) {
        commit('highschoolDataFrameSave',payload);
     },
     serviceActStateListSaveAction({ state, commit }, payload) {
        commit('serviceActStateListSave',payload);
     },
     pblprfrDspyStateListSaveAction({ state, commit }, payload) {
        commit('pblprfrDspyStateListSave',payload);
     },
      dutyInterviewMasterDataSaveAction({ state, commit }, payload) {
        commit('dutyInterviewMasterDataSave',payload);
     },
      tourStateListSaveAction({ state, commit }, payload) {
          commit('tourStateListSave',payload);
      },
      contestStateListSaveAction({ state, commit }, payload) {
          commit('contestStateListSave',payload);
      },
      recommendBookDataFrameSaveAction({ state, commit }, payload) {
          commit('recommendBookDataFrameSave',payload);
      },
      outSideStateListSaveAction({ state, commit }, payload) {
          commit('outSideStateListSave',payload);
      },
  }
}
