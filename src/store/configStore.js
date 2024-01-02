export default {

  namespaced: true,

  state : {
      didCd:"",
      didEqpmnCd:"",
      dataGoWetherNx:"",
      dataGoWetherNy:"",
      dataGoDustStationName:"",
      dataWaiTime:"",
      logoUrl: "",
      dustScheduleUrl:"",
      weatherScheduleUrl:"",
      highschoolYn:"",
      workAreaCd:"",
      fileSaveDir:"",
      pblprfrCd:"",
      itemList : [],
      volunteerAreaCd:"",
      sysGroup:"",
      main:{},
  },
  // Vue.js methods 옵션과 유사합니다.
  // 상태(State)는 변이(Mutations)를 통해서만 값을 바꿀 수 있습니다.
  mutations: {
    configDataSave(state,payload) {
        state.logoUrl    = payload.logoUrl;
        state.didCd      = payload.didCd;
        state.didEqpmnCd = payload.didEqpmnCd;
        state.main = payload.main;
        state.dataWaiTime = payload.dataWaiTime;
        state.dataGoWetherNx = payload.dataGoWetherNx;
        state.dataGoWetherNy = payload.dataGoWetherNy;
        state.dataGoDustStationName = payload.dataGoDustStationName;
        state.dustScheduleUrl = payload.dustScheduleUrl;
        state.weatherScheduleUrl = payload.weatherScheduleUrl;
        state.highschoolYn = payload.highschoolYn;
        state.workAreaCd = payload.workAreaCd;
        state.fileSaveDir = payload.fileSaveDir;
        state.volunteerAreaCd=payload.volunteerAreaCd;
        state.pblprfrCd=payload.pblprfrCd;
        state.sysGroup=payload.sysGroup;
    },
    configItemActiveSave(state,payload) {
        state.itemList.forEach((data,index)=>{
            if (data.itemIndex ==payload){
                data.activeYn="Y";
            }else{
                data.activeYn="N";
            }
        });
    },
    itemListSave(state,itemList) {
        state.itemList = itemList;
    },
    gnbActiveStateSave(state,itemIndex){
        state.itemList.forEach(item =>{
            if (item.itemIndex == itemIndex){
                item.activeYn=true;
            }else{
                item.activeYn=false;
            }
        });
    },
  },

  actions: {
    configDataSaveAction({ state, commit }, payload) {
        commit('configDataSave',payload);
        commit('itemListSave',payload.itemList);
    },
    configItemActiveSaveAction({ state, commit }, payload) {
        commit('configItemActiveSave',payload);
    },
    itemListSaveAction({ state, commit }, payload) {
        commit('itemListSave',payload.itemList);
    },
    gnbActiveAction({ state, commit }, itemIndex) {
        commit('gnbActiveStateSave', itemIndex)
    },

  }
}
