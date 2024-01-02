<template>
    <div class="icon-grid">
      <div class="grid-item" v-for="(iconData,sindex) in iconList" :key="iconData.subIndex" @click="selectIconClick($event,iconData)" @touchend="selectIconClick($event,iconData)">
        <a href="javascript:void(0)">
          <div :class="{'icon':true, 'grd':sindex+1==randomIndex}"><img :src="iconData.iconUrl" alt=""></div>
          <div class="name">{{iconData.subTitle}}</div>
        </a>
      </div>
    </div>
    <teleport to="#modalPopUp">
      <IframePopComponent         v-show="$store.state.modalPopStore.iconPopState==true"                 ref="iframePopRef" />
      <NoticeInfoList             v-show="$store.state.modalPopStore.noticeInfoListState==true"          ref="noticeInfoListRef" @selectDetailClickEvent="selectNoticeListEventFunc"/>
      <NoticeInfoDetail           v-show="$store.state.modalPopStore.noticeInfoDetailState==true"        ref="noticeDetailRef" />
      <SchoolIconAlbum            v-show="$store.state.modalPopStore.schoolIconAlbumListState==true"     ref="schoolIconAlbumRef" @selectDetailClickEvent="selectIconAlbumListEventFunc"/>
      <SchoolIconAlbumDetail      v-show="$store.state.modalPopStore.schoolIconAlbumDetailState==true"   ref="schoolIconAlbumDetailRef"  />
      <SchoolMeal                 v-show="$store.state.modalPopStore.schoolMealState==true"              ref="schoolMealRef"  />
      <TestDiagnosisPopComponent  v-show="$store.state.modalPopStore.testDiagnosisState==true"            ref="testDiagnosisRef"  />
    </teleport>
</template>
<script>
import { ref,onMounted,onUpdated,onUnmounted,onBeforeMount,computed } from 'vue';
import { useStore } from "vuex";
import {useRoute} from "vue-router";
import CommonUtil   from "@/util/CommonUtil";
import IframePopComponent   from "@/components/IframePopComponent";
import NoticeInfoList from "@/views/NoticeInfoList";
import NoticeInfoDetail from "@/views/NoticeInfoDetail";
import SchoolIconAlbum from "@/views/SchoolIconAlbum";
import SchoolIconAlbumDetail from "@/views/SchoolIconAlbumDetail";
import SchoolMeal from "@/views/SchoolMeal";
import TestDiagnosisPopComponent from "@/components/TestDiagnosisPopComponent";

export default {
  name: "IconViewList",
  components: {
    IframePopComponent,
    SchoolIconAlbum,
    NoticeInfoList,
    NoticeInfoDetail,
    SchoolIconAlbumDetail,
    SchoolMeal,
    TestDiagnosisPopComponent,
  },
  setup(props){
    const storeData = useStore();
    const routeData = useRoute();
    let itemData = ref({});
    let iconList = ref([]);
    let randomIndex=ref(0);
    let interValId=null;
    let timeOut = 1500; //1400
    let iframePopRef =ref();
    let noticeInfoListRef =ref();
    let noticeDetailRef = ref();
    let schoolIconAlbumRef =ref();
    let schoolIconAlbumDetailRef =ref();
    let schoolMealRef = ref();
    let testDiagnosisRef =ref();

    onBeforeMount(async ()=>{
       //comment
    });

    onMounted(()=>{
      //comment
    });

    onUnmounted(()=>{
      randomIndex.value=0;
    });

    const connectInit = (pItemData)=>{
      itemData.value=pItemData;
      if (Array.isArray(itemData.value.subIconList.subIcon)){
        iconList.value=itemData.value.subIconList.subIcon;
      }else{
        iconList.value.push(itemData.value.subIconList.subIcon)
      }
      let iconCount = iconList.value.length;
      interValId = setInterval(()=>{
        let st=Math.floor(Math.random() * iconCount)
        randomIndex.value=st;
      },timeOut);
    }

    //아이콘을 클릭했을경우
    const selectIconClick =(event,pIconData)=>{
      //comment
      event.preventDefault();
      //공지사항
      if (pIconData.popUpType == "noticeInfoList"){
        noticeInfoListRef.value.connectInitFunc(pIconData);
        storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"noticeInfoListState","stateYn":true});
      }
      //학교앨범
      else if (pIconData.popUpType == "schoolIconAlbum"){
        schoolIconAlbumRef.value.connectInitFunc(pIconData);
        storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"schoolIconAlbumListState","stateYn":true});
      }
      //식단
      else if (pIconData.popUpType == "schoolMeal"){
        schoolMealRef.value.connectInitFunc(pIconData);
        storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"schoolMealState","stateYn":true});
      }
      //
      else if (pIconData.popUpType == "iframe1"){
        storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"iconPopState","stateYn":true});
        iframePopRef.value.connectInitFunc(pIconData);
      }
      //자체로 만든 검사진단항목을 클릭하였을 경우
      else if (pIconData.popUpType == "testDiagnosis"){
        storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"testDiagnosisState","stateYn":true});
        testDiagnosisRef.value.connectInitFunc(pIconData);
      }

      CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,pIconData.statsCd);
    }

    //공지사항 목록에서 상세목록에서  처리할 이벤트 처리
    const selectNoticeListEventFunc = (detailData)=>{
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"noticeInfoDetailState","stateYn":true});
      noticeDetailRef.value.connectInitFunc(detailData);
    }

    //학교앨범 목록에서 데이터를 클릭시 넘어올 이벤트 처리
    const selectIconAlbumListEventFunc = (pAlbumData)=>{
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"schoolIconAlbumDetailState","stateYn":true});
      schoolIconAlbumDetailRef.value.connectInitFunc(pAlbumData)
    }

    return{
      itemData,
      iconList,
      randomIndex,
      iframePopRef,
      selectIconClick,
      noticeInfoListRef,
      noticeDetailRef,
      schoolIconAlbumRef,
      schoolIconAlbumDetailRef,
      schoolMealRef,
      selectNoticeListEventFunc,
      selectIconAlbumListEventFunc,
      testDiagnosisRef,
      connectInit,
    }
  }
}
</script>
