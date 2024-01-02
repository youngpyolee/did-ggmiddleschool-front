<template>
  <div class="content-outer">
    <div class="main-title">{{ itemData.title }}</div>
      <div class="sch-info-outer">
        <div class="sch-tabmenu">
          <div v-for="(subItem,dataIndex) in subItemList" :class="{'active':subItem.subComp==selectedComp}"  @click="selectMasterCallClick($event,subItem.subComp,dataIndex)" @touchend="selectMasterCallClick($event,subItem.subComp,dataIndex)" :key="subItem.subComp"><a href="javascript:void(0)">{{subItem.subTitle}}</a></div>
        </div>
        <div class="tab-submenu" v-show="selectedComp == 'SchoolInfoMap'" >
          <div :class="{'active':schoolMapSection=='A'}">
            <a href="javascript:void(0)" @click="selectHighschoolClick($event,'A')" @touchend="selectHighschoolClick($event,'A')">일반고<span></span></a>
          </div>
          <div :class="{'active':schoolMapSection=='C'}">
            <a href="javascript:void(0)" @click="selectHighschoolClick($event,'C')" @touchend="selectHighschoolClick($event,'C')">특성화고<span></span></a>
          </div>
          <div :class="{'active':schoolMapSection=='B'}">
            <a href="javascript:void(0)" @click="selectHighschoolClick($event,'B')" @touchend="selectHighschoolClick($event,'B')">자율고<span></span></a>
          </div>
          <div :class="{'active':schoolMapSection=='D'}">
            <a href="javascript:void(0)" @click="selectHighschoolClick($event,'D')" @touchend="selectHighschoolClick($event,'D')">특수목적고<span></span></a>
          </div>
        </div>
        <div class="tab-submenu" v-show="selectedComp == 'SchoolInfoSubject'">
          <div class="active"><a href="javascript:void(0)">특성화고·특수목적고</a></div>
        </div>
        <SchoolInfoMap      ref="schoolInfoMapRef"      v-show="selectedComp=='SchoolInfoMap'"      @selectSchoolOneEvent="selectOneEventPopEvent"></SchoolInfoMap >
        <SchoolInfoSubject  ref="schoolInfoSubjectRef"  v-show="selectedComp=='SchoolInfoSubject'"  @selectSchoolOneEvent="selectOneEventPopEvent"></SchoolInfoSubject>
        <SchoolInfoRank     ref="schoolInfoRankRef"     v-show="selectedComp=='SchoolInfoRank'"     @selectSchoolOneEvent="selectOneEventPopEvent"> </SchoolInfoRank>
      </div>
      <teleport to="#modalPopUp">
        <!-- 학교상세 start -->
        <SchoolInfoDetail v-if="$store.state.modalPopStore.schoolPopState==true"   ref="schoolInfoDetailRef" @selectSchoolCloseEvent="selectSchoolCloseEvent"   />
        <!-- 학교상세 end  -->
      </teleport>
  </div>
</template>
<script>
import { ref,onMounted,onUpdated,onUnmounted,onBeforeMount,computed } from 'vue';
import { useStore } from "vuex";
import {useRoute} from "vue-router";
import CommonUtil   from "@/util/CommonUtil";
import SchoolInfoMap   from "@/views/SchoolInfoMap";
import SchoolInfoSubject   from "@/views/SchoolInfoSubject";
import SchoolInfoRank   from "@/views/SchoolInfoRank";
import SchoolInfoDetail from "@/views/SchoolInfoDetail";

export default {
  name: "SchoolInfo",
  components: {
    SchoolInfoMap,
    SchoolInfoSubject,
    SchoolInfoRank,
    SchoolInfoDetail,

  },
  setup(props){
    const storeData = useStore();
    const routeData = useRoute();
    let itemIndex = 0;
    let itemData = ref({});
    let subItemList =ref([]);
    const schoolInfoMapRef = ref();
    const schoolInfoSubjectRef =ref();
    const schoolInfoRankRef =ref();
    let selectedComp= ref("");
    let schoolMapSection=ref("");
    let saveStatsCd=ref("");
    let schoolInfoDetailRef=ref();
    let subSchoolTypeList = ref([])

    onBeforeMount(async ()=>{
      itemIndex = parseInt(routeData.query.itemIndex);
      itemData.value=CommonUtil.getConfigItemData(storeData.state.configStore.itemList,itemIndex);
      subItemList.value=itemData.value.subItemList;
      selectedComp.value=subItemList.value[0].subComp;

      if (CommonUtil.replaceNull(itemData.value.highSchoolHowSection) !=""){
        schoolMapSection.value=itemData.value.highSchoolHowSection;
      }else{
        schoolMapSection.value="A";
      }
      saveStatsCd.value=subItemList.value[0].statsCd;
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateYn":false,"stateNm":"schoolPopState"});
    });

    onMounted(()=>{
      CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,routeData.query.statisticCd);
      masterInitFunc(selectedComp.value,0);
    });

    onUnmounted(()=>{
      selectedComp.value="";

      if (CommonUtil.replaceNull(itemData.value.highSchoolHowSection) !=""){
        schoolMapSection.value=itemData.value.highSchoolHowSection;
      }else{
        schoolMapSection.value="A";
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

    //onmount시 초기실행
    const masterInitFunc = (selectedId,dataIndex)=>{
      let statsCd = subItemList.value[dataIndex].statsCd;
      saveStatsCd.value=statsCd;
      if (CommonUtil.replaceNull(itemData.value.highSchoolHowSection) !=""){
        schoolMapSection.value=itemData.value.highSchoolHowSection;
      }else{
        schoolMapSection.value="A";
      }
      if (selectedId =="SchoolInfoMap"){
        schoolInfoMapRef.value.connectInitFunc(schoolMapSection.value,storeData.state.configStore.workAreaCd, "A", statsCd,true);
      }
      else if (selectedId =="SchoolInfoSubject"){
        schoolInfoSubjectRef.value.connectInitFunc(statsCd)
      }
      else if (selectedId =="SchoolInfoRank"){
        schoolInfoRankRef.value.connectInitFunc(statsCd)
      }
    }

    //고등학고 구분 클릭시
    const selectHighschoolClick = (event,searchSection)=>{
      event.preventDefault();
      schoolMapSection.value=searchSection;
      CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,saveStatsCd.value);
      schoolInfoMapRef.value.connectInitFunc(schoolMapSection.value);
    }

    //고등학교 목록에서 클릭시 전달 할 이벤트
    const selectOneEventPopEvent = async (sendParam)=>{
      let dataUrl = CONFIG.REMOTE_API_URL+"/api/save/highSchoolRankSave";
      let searchParam = new URLSearchParams();
      searchParam.append("searchSchulCd",sendParam.schulCd);
      searchParam.append("searchSysGroup",storeData.state.configStore.sysGroup);
      CommonUtil.ajaxGetAsyncProc(dataUrl,searchParam);

      await storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateYn":true,"stateNm":"schoolPopState"});
      let result = await schoolInfoDetailRef.value.connectInitFunc(sendParam.schulCd,sendParam.searchInfoType,sendParam.searchInfoPositionType,saveStatsCd.value);

    }

    const selectSchoolCloseEvent=()=>{
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateYn":false,"stateNm":"schoolPopState"});
    }




    return{
      itemData,
      schoolInfoMapRef,
      selectedComp,
      schoolInfoSubjectRef,
      subItemList,
      schoolInfoRankRef,
      selectMasterCallClick,
      schoolMapSection,
      selectHighschoolClick,
      saveStatsCd,
      selectOneEventPopEvent,
      schoolInfoDetailRef,
      selectSchoolCloseEvent,
      subSchoolTypeList,
    }
  }
}
</script>
<style lang="scss" scoped>
.content-outer{
  touch-action: none;
}
</style>