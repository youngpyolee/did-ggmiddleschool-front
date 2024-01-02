<template>
  <div class="content-outer">
    <div class="main-title">{{ itemData.title }}</div>
    <!-- 봉사활동 -->
    <div class="content-box">
      <div class="title-outer">
        <div class="title">봉사활동</div>
        <a href="javascript:void(0)" @click="selectServiceActClick($event,0)" @touchend="selectServiceActClick($event,0)"><div class="btn btn-more">더보기</div></a>
      </div>
      <ul class="simple-list">
        <li v-for="serviceMasterData in serviceMasterActList" :key="serviceMasterData.serviceActCd">{{serviceMasterData.title}}</li>
      </ul>
    </div>
    <!-- 공연전시 기타 등등 -->
    <div class="content-box hidden">
      <div class="title-outer">
        <div class="tabmenu">
          <div :class="{'active':detailGroup1DpType=='A'}" data-event-menu="1" @click="selectDetail1TypeClick($event,'A')" @touchend="selectDetail1TypeClick($event,'A')">공연·전시</div>
          <div :class="{'active':detailGroup1DpType=='B'}" data-etc-menu="2"   @click="selectDetail1TypeClick($event,'B')" @touchend="selectDetail1TypeClick($event,'B')">행사·축제</div>
        </div>
        <a href="javascript:void(0)" @click="selectDetailGroup1ListDataClick($event)" @touchend="selectDetailGroup1ListDataClick($event)"><div class="btn btn-more">더보기</div></a>
      </div>
      <div class="tab-content active" data-event-content="1"  v-show="detailGroup1DpType=='A'">
        <div class="outdoor-outer">
          <div class="thumb-img"><img :src="pblprfrDisplayMainData.titleImg" alt="" /></div>
          <div class="thumb-info">
            <div class="thumb-tit">{{ pblprfrDisplayMainData.title }}</div>
            <div>제공 {{ pblprfrDisplayMainData.provd }}</div>
            <div>기간 {{ pblprfrDisplayMainData.beginDt }} ~ {{ pblprfrDisplayMainData.endDt }}</div>
            <div>문의처 {{ pblprfrDisplayMainData.refrnc }}</div>
          </div>
        </div>
      </div>
      <div class="tab-content active" data-event-content="1"  v-show="detailGroup1DpType=='B'">
        <div class="outdoor-outer" @click="selectDetailFestivalClick($event)" @touchend="selectDetailFestivalClick($event)">
          <div class="thumb-img"><img :src="tourMainData.titleImg" alt="" /></div>
          <div class="thumb-info">
            <div class="thumb-tit">{{ tourMainData.title }}</div>
            <div>주소 {{ tourMainData.addr }}</div>
            <div>기간 {{ tourMainData.beginDt }} ~ {{ tourMainData.endDt }}</div>
            <div>문의 {{ tourMainData.refrnc }}</div>
          </div>
        </div>
      </div>
      <div class="tab-content active" data-etc-content="2"  >
      </div>
    </div>
    <!-- 공모전 -->
    <div class="content-box hidden">
      <div class="title-outer">
        <div class="tabmenu">
          <div :class="{'active':detailGroup2DpType=='A'}"  data-event-menu="1" @click="selectDetail2TypeClick($event,'A')" @touchend="selectDetail2TypeClick($event,'A')">공모전</div>
          <div :class="{'active':detailGroup2DpType=='B'}"  data-etc-menu="2"   @click="selectDetail2TypeClick($event,'B')" @touchend="selectDetail2TypeClick($event,'B')">대외활동</div>
        </div>
        <a href="javascript:void(0)" @click="selectDetailGroup2ListDataClick($event)" @touchend="selectDetailGroup2ListDataClick($event)"><div class="btn btn-more">더보기</div></a>
      </div>
      <div class="tab-content active" data-event-content="1" v-show="detailGroup2DpType=='A'">
        <div class="outdoor-outer" @click="selectDetailContestClick($event)" @touchend="selectDetailContestClick($event)">
          <div class="thumb-img"><img :src="contestMainData.contestImage" alt="" /></div>
          <div class="thumb-info">
            <div class="thumb-tit">{{contestMainData.noti}}</div>
            <div>기간 {{contestMainData.startDate}} ~ {{contestMainData.endDate}}</div>
            <div>분야 {{contestMainData.field}}</div>
            <div>시상 {{contestMainData.award}}</div>
            <div>주최 {{contestMainData.host}}</div>
          </div>
        </div>
      </div>
      <div class="tab-content active" data-event-content="1" v-show="detailGroup2DpType=='B'">
        <div class="outdoor-outer" @click="selectExtrnlActDetailClick($event)" @touchend="selectExtrnlActDetailClick($event)">
          <div class="thumb-img"><img :src="outsideMainData.contestImage" alt="" /></div>
          <div class="thumb-info">
            <div class="thumb-tit">{{outsideMainData.noti}}</div>
            <div>기간 {{outsideMainData.startDate}} ~ {{outsideMainData.endDate}}</div>
            <div>분야 {{outsideMainData.field}}</div>
            <div>시상 {{outsideMainData.award}}</div>
            <div>주최 {{outsideMainData.host}}</div>
          </div>
        </div>
      </div>
      <div class="tab-content active" data-etc-content="2"></div>
    </div>
    <!-- 추천도서 -->
    <div class="content-box hidden">
      <div class="title-outer">
        <div class="title">추천도서</div>
        <a href="javascript:void(0)" @click="selectRecommendBookClick($event)" @touchend="selectRecommendBookClick($event)"><div class="btn btn-more">더보기</div></a>
      </div>
      <div class="tab-content" style="display: block !important">
        <div class="outdoor-outer">
          <div class="thumb-img"><img :src="recommentBookData.titleImg" alt="" /></div>
          <div class="thumb-info">
            <div class="thumb-tit">{{ recommentBookData.title }}</div>
            <div>저자 : {{ recommentBookData.authr }}</div>
            <div class="multi-text">{{ recommentBookData.contents }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <teleport to="#modalPopUp">
      <ServiceAct           v-show="$store.state.modalPopStore.serviceActPopState==true"        ref="serviceActRef"      />
      <PerformDisplay       v-show="$store.state.modalPopStore.performDisplayState==true"       ref="performDisplayRef"  @selectDetailClickEvent="selectPerformDisplayFunc" />
      <PerformDisplayDetail v-show="$store.state.modalPopStore.performDisplayDetailState==true" ref="performDisplayDetailRef"  />
      <EventFestival        v-show="$store.state.modalPopStore.eventFestivalState==true"        ref="eventFestivalRef"   @selectDetailClickEvent="selectEventFestivalFunc" />
      <EventFestivalDetail  v-show="$store.state.modalPopStore.eventFestivalDetailState==true"  ref="eventFestivalDetailRef"  />
      <Contest              v-show="$store.state.modalPopStore.contestListState==true"          ref="contestRef"   @selectDetailClickEvent="selectContestFunc" />
      <ContestDetail        v-show="$store.state.modalPopStore.contestDetailState==true"        ref="contestDetailRef"  />
      <RecommendBook        v-show="$store.state.modalPopStore.recommendBookState==true"        ref="recommendBookRef"  />
      <ExtrnlAct            v-show="$store.state.modalPopStore.extrnlActListState==true"        ref="extrnlActRef"      @selectDetailClickEvent="selectExtrnlActFunc" />
      <ExtrnlActDetail      v-show="$store.state.modalPopStore.extrnlActDetailState==true"      ref="extrnlActDetailRef" />
    </teleport>
  </div>
</template>
<script>
import { ref,onMounted,onUpdated,onUnmounted,onBeforeMount,computed } from 'vue';
import { useStore } from "vuex";
import {useRoute} from "vue-router";
import CommonUtil   from "@/util/CommonUtil";
import ServiceAct   from "@/views/ServiceAct";
import PerformDisplay   from "@/views/PerformDisplay";
import EventFestival   from "@/views/EventFestival";
import EventFestivalDetail   from "@/views/EventFestivalDetail";
import Contest   from "@/views/Contest";
import ContestDetail   from "@/views/ContestDetail";
import RecommendBook   from "@/views/RecommendBook";
import ExtrnlAct   from "@/views/ExtrnlAct";
import ExtrnlActDetail   from "@/views/ExtrnlActDetail";
import PerformDisplayDetail   from "@/views/PerformDisplayDetail";


import {DataFrame,readJSON} from "danfojs";
export default {
  name: "SuburbsAct",
  components: {
    ServiceAct,
    PerformDisplay,
    EventFestival,
    EventFestivalDetail,
    Contest,
    ContestDetail,
    RecommendBook,
    ExtrnlAct,
    ExtrnlActDetail,
    PerformDisplayDetail,
  },
  setup(props){
    const storeData = useStore();
    const routeData = useRoute();
    let itemIndex = 0;
    let itemData = ref({});
    let serviceMasterActList =ref([]);
    let pblprfrDisplayMainData = ref({}); //공연전시
    let tourMainData = ref({}); //투어메인데이터
    let detailGroup1DpType =ref(""); //A공연전시, B:행사축제
    let detailGroup2DpType =ref(""); //A공모전, B:대외활동
    let contestMainData =ref({}); //공모전 데이터
    let outActMainData=ref({});
    let recommentBookData=ref({})
    let saveStatsCd=ref("")
    let subItemList =ref([]);
    let serviceActRef=ref();
    let performDisplayRef=ref();
    let eventFestivalRef=ref();
    let eventFestivalDetailRef =ref();
    let contestRef=ref();
    let contestDetailRef=ref();
    let recommendBookRef =ref();
    let outsideMainData =ref();
    let extrnlActRef =ref();
    let extrnlActDetailRef =ref();
    let performDisplayDetailRef =ref();

    onBeforeMount(async ()=>{
      console.log("before")
      itemIndex = parseInt(routeData.query.itemIndex);
      itemData.value=CommonUtil.getConfigItemData(storeData.state.configStore.itemList,itemIndex);
      subItemList.value=itemData.value.subItemList;
      detailGroup1DpType.value="A"
      detailGroup2DpType.value="A"

      masterInitFunc();
      CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,routeData.query.statisticCd);
    });

    onMounted(()=>{
      //
    });

    onUnmounted(()=>{
      serviceMasterActList.value=[];
      pblprfrDisplayMainData.value={}
      tourMainData.value={};
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"serviceActPopState","stateYn":false});
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"performDisplayState","stateYn":false});
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"eventFestivalState","stateYn":false});
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"contestListState","stateYn":false});
    });

    const masterInitFunc = ()=>{
      console.log("masterInitFunc")
      outsideMainData.value={};
      contestMainData.value={};

      //봉사활동 보여주기
      let dataUrl ="";
      let tempDataUrl=""
      let dataResult =null;
      if (storeData.state.dataStore.serviceActStateList.length>0){
        serviceMasterActList.value=storeData.state.dataStore.serviceActStateList.slice(0,3);
      }else{
        tempDataUrl = CommonUtil.replaceNull(CommonUtil.getConfigSubCompData(subItemList.value,"ServiceAct").dataUrl);
        if (tempDataUrl ==""){
          dataUrl = CONFIG.LOCAL_API_URL+"/data/data_store/config_volunteer_"+storeData.state.configStore.volunteerAreaCd+".json";
        }else{
          dataUrl = CONFIG.LOCAL_API_URL+tempDataUrl;
        }

        dataResult = CommonUtil.ajaxGetAsyncJsonParamProc(dataUrl,null);
        dataResult.then((response)=>{
          let serviceActList=response.data.dataList;
          serviceMasterActList.value=serviceActList.slice(0,3);
          storeData.dispatch("dataStore/serviceActStateListSaveAction" ,serviceActList);
        });
      }
      //공연전시 데이터 보여주기
      if (storeData.state.dataStore.pblprfrDspyStateList.length>0){
        pblprfrDisplayMainData.value=storeData.state.dataStore.pblprfrDspyStateList[0];
      }else{
        dataUrl =    CONFIG.LOCAL_API_URL+"/"+CommonUtil.getConfigSubCompData(subItemList.value,"PerformDisplay").dataUrl;
        dataResult = CommonUtil.ajaxGetAsyncJsonParamProc(dataUrl,null);
        dataResult.then((response)=>{
          let pblprfrDspyStateList = response.data.itemList;
          pblprfrDisplayMainData.value=pblprfrDspyStateList[0];
          storeData.dispatch("dataStore/pblprfrDspyStateListSaveAction" ,pblprfrDspyStateList);
        });
      }

      //축제 투어
      if (storeData.state.dataStore.tourStateList.length >0){
        tourMainData.value=storeData.state.dataStore.tourStateList[0];
      }else{
        dataUrl =    CONFIG.LOCAL_API_URL+"/"+CommonUtil.getConfigSubCompData(subItemList.value,"EventFestival").dataUrl;
        dataResult = CommonUtil.ajaxGetAsyncJsonParamProc(dataUrl,null);
        dataResult.then((response)=>{
          let tourList = response.data.itemList;
          tourMainData.value=tourList[0];
          storeData.dispatch("dataStore/tourStateListSaveAction" ,tourList);
        });
      }

      //공모전
      if (storeData.state.dataStore.contestStateList.length > 0){
        contestMainData.value=storeData.state.dataStore.contestStateList[0];
        contestMainData.value.award= (contestMainData.value.award instanceof Object)?"":contestMainData.value.award;
      }else{
        tempDataUrl = CommonUtil.replaceNull(CommonUtil.getConfigSubCompData(subItemList.value,"Contest").dataUrl);
        if (tempDataUrl ==""){
          dataUrl = `${CONFIG.LOCAL_API_URL}/data/data_store/contest_total.xml`;
        }else{
          dataUrl = CONFIG.LOCAL_API_URL+tempDataUrl;
        }

        dataResult = CommonUtil.ajaxGetAsyncProc(dataUrl,null);
        dataResult.then((response)=>{
          let contentData = CommonUtil.convertXmltoJson(response.data);
          contestMainData.value=contentData.data.item[0];
          contestMainData.value.award= (contestMainData.value.award instanceof Object)?"":contestMainData.value.award;
          storeData.dispatch("dataStore/contestStateListSaveAction" ,contentData.data.item);
        });
      }

      //대외활동
      if (storeData.state.dataStore.outSideStateList.length > 0){
        outsideMainData.value=storeData.state.dataStore.outSideStateList[0];
        outsideMainData.value.award= (outsideMainData.value.award instanceof Object)?"":outsideMainData.value.award;
      }else{
        tempDataUrl = CommonUtil.replaceNull(CommonUtil.getConfigSubCompData(subItemList.value,"ExtrnlAct").dataUrl);
        if (tempDataUrl ==""){
          dataUrl = `${CONFIG.LOCAL_API_URL}/data/data_store/outside_act_total.xml`;
        }else{
          dataUrl = CONFIG.LOCAL_API_URL+tempDataUrl;
        }

        dataResult = CommonUtil.ajaxGetAsyncProc(dataUrl,null);
        dataResult.then((response)=>{
          let outSideData = CommonUtil.convertXmltoJson(response.data);
          outsideMainData.value=outSideData.data.item[0];
          outsideMainData.value.award= (outsideMainData.value.award instanceof Object)?"":outsideMainData.value.award;
          storeData.dispatch("dataStore/outSideStateListSaveAction" ,outSideData.data.item);
        });
      }
      //추천책목록
      if (storeData.state.dataStore.recommendBookDataFrame !=null){
        let bookFrame = storeData.state.dataStore.recommendBookDataFrame;
        let todayMonthStr=CommonUtil.getToday().substring(4,6)
        bookFrame =bookFrame.loc({rows:bookFrame["readMonth"].eq(todayMonthStr)});
        recommentBookData.value=CommonUtil.dataFrameToJson(bookFrame.head(1));
      }else{
        tempDataUrl = CommonUtil.replaceNull(CommonUtil.getConfigSubCompData(subItemList.value,"RecommendBook").dataUrl);
        if (tempDataUrl ==""){
          dataUrl = `${CONFIG.LOCAL_API_URL}/data/data_store/month_read_gb_all.json`;
        }else{
          dataUrl = CONFIG.LOCAL_API_URL+tempDataUrl;
        }

        dataResult = CommonUtil.ajaxGetAsyncJsonParamProc(dataUrl,null);
        dataResult.then((response)=>{
          let bookList = response.data.itemList;
          let dataFrame = new DataFrame(bookList)
          let newDataFrame = dataFrame.setIndex({column: "snno", inplace: false});
          dataFrame=null;
          let todayMonthStr=CommonUtil.getToday().substring(4,6)
          let bookFrame =newDataFrame.loc({rows:newDataFrame["readMonth"].eq(todayMonthStr)});
          recommentBookData.value=CommonUtil.dataFrameToJson(bookFrame.head(1));
          storeData.dispatch("dataStore/recommendBookDataFrameSaveAction" ,newDataFrame);
        });
      }
    }

    //봉사활동 클릭시
    const selectServiceActClick = (event,itemIndex)=>{
      event.preventDefault();
      let subItemData = CommonUtil.getConfigSubItemData(subItemList.value,itemIndex);
      saveStatsCd.value = subItemData.statsCd;
      //통계처리
      CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,saveStatsCd.value);
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"serviceActPopState","stateYn":true});
      serviceActRef.value.connectInitFunc(saveStatsCd.value )
    }

    //굥연전시,행사축제 클릭시
    const selectDetail1TypeClick = (event,pDetailGroup1DpType)=>{
      event.preventDefault();
      detailGroup1DpType.value=pDetailGroup1DpType;
    }

    //공모전,대외활동 클릭시
    const selectDetail2TypeClick = (event,pDetailGroup2DpType)=>{
      event.preventDefault();
      detailGroup2DpType.value=pDetailGroup2DpType;
    }

    //공연전시,행사축제란에 더 보기를 클릭했을 경우
    const selectDetailGroup1ListDataClick = (event)=>{
      event.preventDefault();

      let subItemData ={};
      if (detailGroup1DpType.value=="A"){
        subItemData = CommonUtil.getConfigSubCompData(subItemList.value,"PerformDisplay");
        saveStatsCd.value = subItemData.statsCd;
        storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"performDisplayState","stateYn":true});
        performDisplayRef.value.connectInitFunc(saveStatsCd.value)
      }
      else if (detailGroup1DpType.value=="B"){
        subItemData = CommonUtil.getConfigSubCompData(subItemList.value,"EventFestival");
        saveStatsCd.value = subItemData.statsCd;
        storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"eventFestivalState","stateYn":true});
        eventFestivalRef.value.connectInitFunc(saveStatsCd.value)
      }
      //통계처리
      CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,saveStatsCd.value);
    }

    //축제목록에서 상세를 클릭했을 경우 처리할 이벤트
    const selectEventFestivalFunc = (detailData)=>{
      CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,saveStatsCd.value);
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"eventFestivalDetailState","stateYn":true});
      eventFestivalDetailRef.value.connectInitFunc(saveStatsCd.value ,true,detailData);
    }

    //공연전시목록에서 상세를 클릭했을 경우 처리할 이벤트
    const selectPerformDisplayFunc = (detailData)=>{
      CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,saveStatsCd.value);
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"performDisplayDetailState","stateYn":true});
      performDisplayDetailRef.value.connectInitFunc(saveStatsCd.value ,true,detailData);
    }
    //
    const selectDetailGroup2ListDataClick = (event)=>{
      event.preventDefault();
      let subItemData ={};
      //공모전일경우
      if (detailGroup2DpType.value=="A"){
        subItemData = CommonUtil.getConfigSubCompData(subItemList.value,"Contest");
        storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"contestListState","stateYn":true});
        contestRef.value.connectInitFunc(subItemData);
      }
      //대외활동일경우
      else if (detailGroup2DpType.value=="B"){
        subItemData = CommonUtil.getConfigSubCompData(subItemList.value,"ExtrnlAct");
        storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"extrnlActListState","stateYn":true});
        extrnlActRef.value.connectInitFunc(subItemData)
      }

      //통계처리
      CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,subItemData.statsCd);
    }

    //공모전에서 상세를 클릭했을 경우 넘어온 이벤트 처리
    const selectContestFunc = (detailData)=>{
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"contestDetailState","stateYn":true});
      contestDetailRef.value.connectInitFunc(saveStatsCd.value ,true,detailData);
    }

    //행사,축제에서 상세를 클릭했들 경우
    const selectDetailFestivalClick= (event)=>{
      event.preventDefault();
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"eventFestivalDetailState","stateYn":true});
      eventFestivalDetailRef.value.connectInitFunc(saveStatsCd.value ,false ,tourMainData.value);
    }

   //메인에서 공모전 상세를 클릭했을 경우
   const selectDetailContestClick= (event)=>{
     event.preventDefault();
     storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"contestDetailState","stateYn":true});
     contestDetailRef.value.connectInitFunc(saveStatsCd.value ,false ,contestMainData.value);
   }

    //메인에서 대외활동에서 상세를 클릭했을 경우
    const selectExtrnlActDetailClick= (event)=>{
      event.preventDefault();
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"extrnlActDetailState","stateYn":true});
      extrnlActDetailRef.value.connectInitFunc(saveStatsCd.value ,false ,outsideMainData.value);
    }

    //추천도서목록을 클릭할 경우
    const selectRecommendBookClick = (event)=>{
      event.preventDefault();
      let subItemData = CommonUtil.getConfigSubCompData(subItemList.value,"RecommendBook");
      saveStatsCd.value = subItemData.statsCd;
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"recommendBookState","stateYn":true});
      recommendBookRef.value.connectInitFunc(saveStatsCd.value);
      //통계처리
      CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,saveStatsCd.value);
    }

    //대외활동목록에서 상세를 클릭했을 경우 넘어온 이벤트 처리
    const selectExtrnlActFunc = (detailData)=>{
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"extrnlActDetailState","stateYn":true});
      extrnlActDetailRef.value.connectInitFunc(saveStatsCd.value,true,detailData);
    }

    return{
      itemData,
      serviceMasterActList,
      pblprfrDisplayMainData,
      tourMainData,
      detailGroup1DpType,
      detailGroup2DpType,
      selectDetail1TypeClick,
      selectDetail2TypeClick,
      contestMainData,
      outActMainData,
      recommentBookData,
      saveStatsCd,
      selectServiceActClick,
      subItemList,
      serviceActRef,
      selectDetailGroup1ListDataClick,
      selectDetailGroup2ListDataClick,
      performDisplayRef,
      eventFestivalRef,
      selectEventFestivalFunc,
      eventFestivalDetailRef,
      contestRef,
      selectContestFunc,
      contestDetailRef,
      selectDetailFestivalClick,
      recommendBookRef,
      selectRecommendBookClick,
      outsideMainData,
      extrnlActRef,
      extrnlActDetailRef,
      selectExtrnlActFunc,
      selectDetailContestClick,
      selectExtrnlActDetailClick,
      performDisplayDetailRef,
      selectPerformDisplayFunc,
    }
  }
}
</script>
