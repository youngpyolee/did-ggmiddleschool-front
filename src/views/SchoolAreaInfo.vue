<template>
  <div class="content-outer">
    <div class="main-title">{{ itemData.title }}</div>
    <div class="sch-info-outer">
      <div class="sch-tabmenu">
        <div v-for="(subItem,dataIndex) in subItemList" :class="{'active':subItem.subComp==selectedComp}"
             @click="selectMasterCallClick($event,subItem.subComp,dataIndex)" @touchend="selectMasterCallClick($event,subItem.subComp,dataIndex)"
             :key="subItem.subComp"><a href="javascript:void(0)">{{subItem.subTitle}}</a></div>
      </div>
      <div class="tab-submenu" v-show="selectedComp == 'SchoolAreaInfoMap'" >
        <div :class="{'active':schoolSelectionType==data.schoolTypeCd}" v-for="data in schoolSelectionTypeList"
             @click="selectHighSchoolSectionClick($event,data)"
             @touchend="selectHighSchoolSectionClick($event,data)">
          <a href="javascript:void(0)">{{ data.schoolTypeNm }}<span></span></a>
        </div>
      </div>
      <div class="tab-submenu" v-show="selectedComp == 'SchoolInfoSubject'">
        <div class="active"><a href="javascript:void(0)">특성화고·특수목적고</a></div>
      </div>
      <!-- component start -->
      <SchoolAreaInfoMap        ref="schoolAreaInfoMapRef"        v-if="selectedComp=='SchoolAreaInfoMap'"          @selectSchoolOneEvent="selectOneEventPopEventFunc"></SchoolAreaInfoMap>
      <SchoolAreaInfoSubject    ref="schoolAreaInfoSubjectRef"    v-show="selectedComp=='SchoolAreaInfoSubject'"    @selectSchoolOneEvent="selectOneEventPopEventFunc"></SchoolAreaInfoSubject>
      <SchoolAreaInfoRank       ref="schoolAreaInfoRankRef"       v-show="selectedComp=='SchoolAreaInfoRank'"       @selectSchoolOneEvent="selectOneEventPopEventFunc"></SchoolAreaInfoRank>
      <!-- component end -->
    </div>
    <teleport to="#modalPopUp">
      <!-- 학교상세 start -->
      <SchoolAreaInfoDetail v-if="$store.state.modalPopStore.schoolPopState==true"   ref="schoolAreaInfoDetailRef" @selectSchoolDetailCloseEvent="selectSchoolDetailCloseEventFunc"   />
      <!-- 학교상세 end  -->
    </teleport>
  </div>
</template>
<script>
import { ref,onMounted,onUpdated,onUnmounted,onBeforeMount,computed } from 'vue';
import { useStore } from "vuex";
import {useRoute} from "vue-router";
import CommonUtil   from "@/util/CommonUtil";
import SchoolAreaInfoMap from "@/views/SchoolAreaInfoMap";
import SchoolAreaInfoSubject from "@/views/SchoolAreaInfoSubject";
import SchoolAreaInfoRank from "@/views/SchoolAreaInfoRank";
import SchoolAreaInfoDetail from "@/views/SchoolAreaInfoDetail";


export default {
  name: "SchoolAreaInfo",
  components: {
    SchoolAreaInfoMap,
    SchoolAreaInfoSubject,
    SchoolAreaInfoRank,
    SchoolAreaInfoDetail,
  },
  setup(props){
    const storeData = useStore();
    const routeData = useRoute();
    let itemIndex = 0;
    let itemData = ref({});
    let subItemList =ref([]);
    let selectedComp= ref("");
    let schoolSelectionType=ref("");
    let saveStatsCd=ref("");
    let svgUrl=ref("");
    let schoolSelectionTypeList = ref([]);
    let schoolAreaInfoMapRef =ref();
    let schoolAreaInfoSubjectRef =ref();
    let schoolAreaInfoRankRef = ref();
    let schoolAreaInfoDetailRef = ref();

    //초기학교선택타입
    let firstSchoolSelectionType=ref("");
    //초기선택된 지역학교 개수정보
    let firstSchoolTypeMapCntUrl=ref("");
    //초기선택된 지역학교 코드정보(동 or 시)
    let firstSchoolTypeAreaCd=ref("");
    // 초기선택된 svg정보
    let firstSchoolTypeSvg =ref("");
    //초기선태된 svg 클래스
    let firstSchoolTypeClass=ref("");

    onBeforeMount(async ()=>{
      itemIndex = parseInt(routeData.query.itemIndex);
      itemData.value=CommonUtil.getConfigItemData(storeData.state.configStore.itemList,itemIndex);
      subItemList.value=itemData.value.subItemList;
      selectedComp.value=subItemList.value[0].subComp;

      let schoolAreaInfoMapData =  CommonUtil.getConfigSubCompData(subItemList.value,"SchoolAreaInfoMap")
      schoolSelectionTypeList.value=schoolAreaInfoMapData.schoolTypeList.schoolType;

      if (CommonUtil.replaceNull(itemData.value.highSchoolHowSection) !=""){
        schoolSelectionType.value=itemData.value.highSchoolHowSection;
        firstSchoolSelectionType.value=itemData.value.highSchoolHowSection;
      }else{
        schoolSelectionType.value="A";
        firstSchoolSelectionType.valu="A";
      }

      let selectAreaCdIndex= schoolSelectionTypeList.value.findIndex((schoolSubData)=>{
        if (schoolSubData.schoolTypeCd == schoolSelectionType.value){
          return true;
        }
      });

      firstSchoolTypeSvg.value = schoolSelectionTypeList.value[selectAreaCdIndex].schoolTypeSvg;
      firstSchoolTypeMapCntUrl.value = schoolSelectionTypeList.value[selectAreaCdIndex].schoolTypeMapCntUrl;
      firstSchoolTypeAreaCd.value =schoolSelectionTypeList.value[selectAreaCdIndex].schoolTypeAreaCd;
      firstSchoolTypeClass.value=schoolSelectionTypeList.value[selectAreaCdIndex].schoolTypeClass;
      saveStatsCd.value=subItemList.value[0].statsCd;
    });

    onMounted(()=>{
      CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,routeData.query.statisticCd);
      masterInitFunc(selectedComp.value,0);
    });

    onUnmounted(()=>{
      selectedComp.value="";
      //정의된 학교 타입이 있을경우 학교타입을 설정한다.
      if (CommonUtil.replaceNull(itemData.value.highSchoolHowSection) !=""){
        schoolSelectionType.value=itemData.value.highSchoolHowSection;
      }
      //정의된 학교 타입이 없을 경우 고등학교
      else{
        schoolSelectionType.value="A";
      }
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateYn":false,"stateNm":"schoolPopState"});
    });

    //지도,학과,검색순위를 클릭했을경우
    const selectMasterCallClick = (event,selectedId,dataIndex)=>{
      event.preventDefault();
      selectedComp.value =selectedId;
      saveStatsCd.value = subItemList.value[dataIndex].statsCd;

      //통계처리
      CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,saveStatsCd.value);
      masterInitFunc(selectedId,dataIndex);
    }

    //고등학교 섹션 클릭시
    const selectHighSchoolSectionClick = (event,pData)=>{
      event.preventDefault();
      schoolSelectionType.value=pData.schoolTypeCd;
      CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,saveStatsCd.value);
      let schoolSelectObj={}
      schoolSelectObj.schoolTypeCd=pData.schoolTypeCd;
      schoolSelectObj.schoolTypeSvg=pData.schoolTypeSvg;
      schoolSelectObj.schoolTypeMapCntUrl=pData.schoolTypeMapCntUrl;

      if (CommonUtil.replaceNull(pData.schoolTypeAreaCd) =="0"){
        schoolSelectObj.schoolTypeAreaCd="";
      }else{
        schoolSelectObj.schoolTypeAreaCd=pData.schoolTypeAreaCd;
      }

      schoolSelectObj.schoolTypeClass=pData.schoolTypeClass;
      schoolAreaInfoMapRef.value.connectInitFunc( schoolSelectionType.value, schoolSelectObj, "distance" , saveStatsCd.value);
    }

    const masterInitFunc = (selectedComponentId,dataIndex)=>{
      let statsCd = subItemList.value[dataIndex].statsCd;
      saveStatsCd.value=statsCd;

      //지도로 찾기 클릭시
      if (selectedComponentId =="SchoolAreaInfoMap"){
        let schoolSelectObj={}
        schoolSelectObj.schoolTypeCd=firstSchoolSelectionType.value;
        schoolSelectObj.schoolTypeSvg=firstSchoolTypeSvg.value;
        schoolSelectObj.schoolTypeMapCntUrl=firstSchoolTypeMapCntUrl.value;
        schoolSelectObj.schoolTypeAreaCd=firstSchoolTypeAreaCd.value;
        schoolSelectObj.schoolTypeClass=firstSchoolTypeClass.value
        schoolSelectionType.value=firstSchoolSelectionType.value;
        setTimeout(()=>{
          schoolAreaInfoMapRef.value.connectInitFunc( schoolSelectionType.value, schoolSelectObj, "distance" , statsCd , true);
        },200)

      }
      //학과로 찾기 클릭시
      else if (selectedComponentId =="SchoolAreaInfoSubject"){
        schoolAreaInfoSubjectRef.value.connectInitFunc(statsCd)
      }
      //검색순위 클릭시
      else if (selectedComponentId =="SchoolAreaInfoRank"){
        schoolAreaInfoRankRef.value.connectInitFunc(statsCd)
      }
    }

    const selectSchoolDetailCloseEventFunc = ()=>{
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateYn":false,"stateNm":"schoolPopState"});
    }

    //지도찾기,학과찾기,검색순위에 있는 고등학교 목록에서 학교를 클릭시 넘어온 이벤트 처리
    const selectOneEventPopEventFunc=async (sendParam)=>{
      let dataUrl = CONFIG.REMOTE_API_URL+"/api/save/highSchoolRankSave";
      let searchParam = new URLSearchParams();
      searchParam.append("searchSchulCd",sendParam.schulCd);
      searchParam.append("searchSysGroup",storeData.state.configStore.sysGroup);
      CommonUtil.ajaxGetAsyncProc(dataUrl,searchParam);

      await storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateYn":true,"stateNm":"schoolPopState"});
      let result = await schoolAreaInfoDetailRef.value.connectInitFunc(sendParam.schulCd,sendParam.searchDetailInfoType,sendParam.searchInfoPositionType,saveStatsCd.value);
    }

    return{
      schoolAreaInfoMapRef,
      schoolAreaInfoSubjectRef,
      schoolAreaInfoDetailRef,
      schoolAreaInfoRankRef,
      firstSchoolSelectionType,
      firstSchoolTypeMapCntUrl,
      firstSchoolTypeSvg,
      itemData,
      selectedComp,
      subItemList,
      schoolSelectionType,
      saveStatsCd,
      firstSchoolTypeClass,
      svgUrl,
      schoolSelectionTypeList,
      selectMasterCallClick,
      selectHighSchoolSectionClick,
      selectOneEventPopEventFunc,
      selectSchoolDetailCloseEventFunc,
    }
  }
}
</script>
<style lang="scss" scoped>
.content-outer{
  touch-action: none;
}
</style>