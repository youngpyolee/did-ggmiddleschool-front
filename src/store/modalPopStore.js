export default {

  namespaced: true,
  state : {
      schoolPopState:false,
      schoolPopAlbumState:false,
      magazinePopState:false,
      dutyInterviewPopState:false,
      dutyInterviewDetailPopState:false,
      koreaPresentOccpState:false,
      koreaPresentOccpDetailState:false,
      themePerOccpState:false,
      themePerOccpDetailState:false,
      unUseOccpPopState:false,
      unUseOccpPopDetailState:false,
      newOccpPopState:false,
      newOccpDetailState:false,
      iconPopState:false,
      serviceActPopState:false,
      performDisplayState:false,
      eventFestivalState:false,
      eventFestivalDetailState:false,
      contestListState:false,
      contestDetailState:false,
      recommendBookState:false,
      noticeInfoListState:false,
      noticeInfoDetailState:false,
      schoolMealState:false,
      schoolIconAlbumListState:false,
      schoolIconAlbumDetailState:false,
      extrnlActListState:false,
      extrnlActDetailState:false,
      testDiagnosisState:false,
      performDisplayDetailState:false,
  },
  mutations: {
      modalStatProcSave(state,payload) {
          state[payload.stateNm] = payload.stateYn;
      },
  },

  actions: {
      modalProcStateAction({ state, commit }, payLoad) {
          commit("modalStatProcSave",payLoad);
      },
  }
}
