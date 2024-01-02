<template>
  <section class="content-wrap">
    <Header></Header>
    <router-view></router-view>
  </section>
  <Gnb></Gnb>
  <div id="modalPopUp"></div>
  <div id="modalDetailPopUp"></div>
</template>
<script>
import { ref, onMounted,onUpdated,onUnmounted,onBeforeMount } from 'vue';
import { useStore } from "vuex";
import {useRouter} from "vue-router";
import CommonUtil from "@/util/CommonUtil";
import Header  from "@/components/Header";
import Gnb  from "@/components/Gnb";
import {DataFrame,readJSON} from "danfojs";
//=== APP VUE DEVELOP HOLE KOLE KOLE START START ===
//=== HELLO VUE SSS ===
export default {
  name: "App",
  components: {
    Header,
    Gnb
  },
  setup(){
    const storeData  = useStore();
    const router = useRouter();
    let searchDidCd      = "";
    let searchDidEqpmnCd = "";
    let firstCompName    = "";
    let firstStatsCd     = "";
    let dataObject ={};
    let firstIndex = 0;

    onBeforeMount(async ()=>{
      let search = location.search;
      let configSearchParam = new URLSearchParams(search);
      let currentDate = new Date();
      searchDidCd      = configSearchParam.get('searchDidCd');
      searchDidEqpmnCd = configSearchParam.get('searchDidEqpmnCd');

      let resultData = null;

      try{
        resultData = await CommonUtil.ajaxGetSyncProc("/data/config/config_"+searchDidCd+"_"+searchDidEqpmnCd+".xml", null);
        dataObject = CommonUtil.getDataConfig(resultData);
        dataObject.didCd      = searchDidCd;
        dataObject.didEqpmnCd = searchDidEqpmnCd;

        let configParm = new URLSearchParams();
        configParm.append("didCd"      , searchDidCd);
        configParm.append("didEqpmnCd" , searchDidEqpmnCd);
        configParm.append("dataGoWetherNx" , dataObject.dataGoWetherNx);
        configParm.append("dataGoWetherNy" , dataObject.dataGoWetherNy);
        configParm.append("dataGoDustStationName" , dataObject.dataGoDustStationName);
        storeData.dispatch("configStore/configDataSaveAction" , dataObject);

        let configResultData =  CommonUtil.ajaxGetAsyncJsonParamProc(CONFIG.LOCAL_JAVA_API_URL+"/api/list/dataConfigSetting" , configParm);
        let sessionExpireTime = CommonUtil.localStorageInfo("sessionExpireTime");

        //로컬스토리지에 세션 expiretime이 존재하지 않는다면
        if (sessionExpireTime == null ){
          let sessionItem = {"expireTime": currentDate.getTime() + parseInt(dataObject.dataWaiTime)};
          CommonUtil.localStorageSave("sessionExpireTime", JSON.stringify(sessionItem));
          weatherApiDataListFunc();
        }
        //로컬스토리지에 세션 expiretime이 존재한다면
        else{
          let sessionExpireTime = CommonUtil.localStorageInfo("sessionExpireTime");
          let sessionItem = JSON.parse(sessionExpireTime);

          if (currentDate.getTime() > sessionItem.expireTime ){
            sessionItem["expireTime"] = currentDate.getTime() + parseInt(dataObject.dataWaiTime);
            CommonUtil.localStorageRemove("sessionExpireTime");
            CommonUtil.localStorageSave("sessionExpireTime" , JSON.stringify(sessionItem));
            weatherApiDataListFunc();
          }else{
            console.log("==== localstorage session exist ===")
            wetherDustListFunc();
          }
        }

        let result =  await dataInfoSetting();

        if (dataObject.mainYn !="Y"){
          firstCompName = dataObject.itemList[0].comp;
          firstIndex    = dataObject.itemList[0].itemIndex;
          firstStatsCd  = dataObject.itemList[0].statsCd;
        }else{
          firstCompName = dataObject.main.component
          firstIndex    = -1;
          firstStatsCd  = dataObject.main.statsCd;
        }

        storeData.dispatch("configStore/configItemActiveSaveAction" , firstIndex);
        router.replace({'name': firstCompName, 'query': {'searchDidCd' : searchDidCd,"searchDidEqpmnCd":searchDidEqpmnCd,"statisticCd":firstStatsCd,"itemIndex":firstIndex}});

      }catch(e){
        console.log("app onMounted error "+e)
      }
    });

    onMounted(async () => {
      //comment
    });

    onUpdated(() => {
      //comment
    });

    onUnmounted(() => {
      //comment
    });

    const dataInfoSetting = async ()=>{
      //고교정보 did를 사용하는경우라면 고교정보를 셋팅한다.
      if (dataObject.highschoolYn =="Y"){
        let result = await highschoolSettingFunc();
      }
      //교외활동정보셋팅
      //let result = suburbsActSettingFunc();
      let returnResult="Y"
      return returnResult;
    }

    const highschoolSettingFunc = async ()=>{
      let jsonUrl = CONFIG.LOCAL_API_URL+"/data/data_store/config_school_all_section_cnt.json";
      let result =  await CommonUtil.ajaxGetSyncJsonProc(jsonUrl,null);
      if (result.result=="Y"){
        storeData.dispatch("dataStore/highschoolCntListSaveAction" , result.data);

        let jsonSchoolUrl    = CONFIG.LOCAL_API_URL+"/data/data_store/config_school_all.json";
        let jsonSchoolResult =  await CommonUtil.ajaxGetSyncJsonProc(jsonSchoolUrl,null);
        let dataList =jsonSchoolResult.data.dataList;
        let dataFrame = new DataFrame(dataList)
        let newDataFrame = dataFrame.setIndex({column: "schulCd", inplace: false});
        dataFrame=null;
        storeData.dispatch("dataStore/highschoolDataFrameSaveAction" ,newDataFrame);
      }
      return true;
    }

    /*    //직업진료 정보 셋팅
    const jobCourseSetting = ()=>{
      let mainFirstDutyInterviewUrl = CONFIG.LOCAL_API_URL+"/data/data_store/interview_duty_first.json";
      let mainFirstDutyImgUrlResult = CommonUtil.ajaxGetAsyncJsonParamProc(mainFirstDutyInterviewUrl,null);
      mainFirstDutyImgUrlResult.then((response)=>{
        storeData.dispatch("dataStore/dutyInterviewMasterDataSaveAction" ,response.data);
      }).catch(()=>{
        storeData.dispatch("dataStore/dutyInterviewMasterDataSaveAction" , {});
      });
    }*/

    //교외활동 정보 셋팅
    /*
    const suburbsActSettingFunc = ()=>{
      let dataUrl =""; CONFIG.LOCAL_API_URL+"/data/data_store/config_volunteer_"+storeData.state.configStore.volunteerAreaCd+".json";
      let dataResult = CommonUtil.ajaxGetAsyncJsonParamProc(dataUrl,null);
      dataResult.then((response)=>{
        let serviceActList=response.data.dataList
        storeData.dispatch("dataStore/serviceActStateListSaveAction" ,serviceActList);
      });

      //공연전시 데이터 보여주기
      let dataUrl = `${CONFIG.LOCAL_API_URL}/data/data_store/pblprfr_dspy_info_${storeData.state.configStore.pblprfrCd}.json`;
      let dataResult = CommonUtil.ajaxGetAsyncJsonParamProc(dataUrl,null);
      dataResult.then((response)=>{
        let pblprfrDspyStateList = response.data.itemList;
        storeData.dispatch("dataStore/pblprfrDspyStateListSaveAction" ,pblprfrDspyStateList);
      });

      //축제 투어
      let dataUrl = `${CONFIG.LOCAL_API_URL}/data/data_store/festival_info_all.json`;
      let dataResult = CommonUtil.ajaxGetAsyncJsonParamProc(dataUrl,null);
      dataResult.then((response)=>{
        let tourList = response.data.itemList;
        storeData.dispatch("dataStore/tourStateListSaveAction" ,tourList);
      });

      //공모전
      let dataUrl = `${CONFIG.LOCAL_API_URL}/data/data_store/contest_total.xml`;
      let dataResult = CommonUtil.ajaxGetAsyncProc(dataUrl,null);
      dataResult.then((response)=>{
        let contentData = CommonUtil.convertXmltoJson(response.data);
        storeData.dispatch("dataStore/contestStateListSaveAction" ,contentData.data.item);
      });

      //대외활동
      dataUrl = `${CONFIG.LOCAL_API_URL}/data/data_store/outside_act_total.xml`;
      dataResult = CommonUtil.ajaxGetAsyncProc(dataUrl,null);
      dataResult.then((response)=>{
        let outSideData = CommonUtil.convertXmltoJson(response.data);
        storeData.dispatch("dataStore/outSideStateListSaveAction" ,outSideData.data.item);
      });

      //추천책목록
      dataUrl = `${CONFIG.LOCAL_API_URL}/data/data_store/month_read_gb_all.json`;
      dataResult = CommonUtil.ajaxGetAsyncJsonParamProc(dataUrl,null);
      dataResult.then((response)=>{
        let bookList = response.data.itemList;
        let dataFrame = new DataFrame(bookList)
        let newDataFrame = dataFrame.setIndex({column: "snno", inplace: false});
        dataFrame=null;
        storeData.dispatch("dataStore/recommendBookDataFrameSaveAction" ,newDataFrame);
      });
    }
    */
    const wetherDustListFunc = ()=>{
      let resultData = {};

      let weatherScheduleUrl = storeData.state.configStore.weatherScheduleUrl;
      let dustScheduleUrl    = storeData.state.configStore.dustScheduleUrl;

      let resultPromise1 = CommonUtil.ajaxGetAsyncJsonParamProc(CONFIG.LOCAL_API_URL+weatherScheduleUrl, null);
      resultPromise1.then((response)=>{
        storeData.dispatch("weatherDustStore/weatherSaveAction" , response.data);
      });

      let resultPromise2 = CommonUtil.ajaxGetAsyncJsonParamProc(CONFIG.LOCAL_API_URL+dustScheduleUrl, null);
      resultPromise2.then((response)=>{
        storeData.dispatch("weatherDustStore/dustSaveAction" , response.data);
      });

      return resultData;
    }

    const weatherApiDataListFunc = ()=>{
      let payLoad = new URLSearchParams();
      payLoad.append("dataGoWetherNx",storeData.state.configStore.dataGoWetherNx);
      payLoad.append("dataGoWetherNy",storeData.state.configStore.dataGoWetherNy);
      payLoad.append("dataGoDustStationName",storeData.state.configStore.dataGoDustStationName);
      let resultPromise = CommonUtil.ajaxGetAsyncProc(CONFIG.LOCAL_JAVA_API_URL+"/api/list/weatherDustDetail", payLoad);

      resultPromise.then((response)=>{
        storeData.dispatch("weatherDustStore/weatherSaveAction" , response.data.resultData.weatherData);
        storeData.dispatch("weatherDustStore/dustSaveAction"   , response.data.resultData.dustData);
      });
    }

    return{

    }
  }
}
</script>
<style lang="scss" scoped>
#modalPopUp {
  touch-action: none;
}

#modalDetailPopUp {
  touch-action: none;
}

section{
  touch-action: none;
}
</style>