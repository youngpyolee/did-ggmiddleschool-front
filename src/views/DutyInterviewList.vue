<template>
  <div :class="{'modal-outer':true, 'active':activeYn==true}">
    <div class="modal-inner">
      <div class="modal-title">직무인터뷰</div>
      <div class="modal-body">
        <div class="modal-content-outer" >
          <!-- 내용 -->
          <div class="flex-column">
            <div class="multi-tab">
              <div v-for="dutyData in dutyInterviewParamList" :class="{'active':searchDataIndex==dutyData.dutyInterviewIndex}" @click="selectDutyInterviewChoiceClick($event,dutyData.dutyInterviewIndex, dutyData.dataUrl)" @touchend="selectDutyInterviewChoiceClick($event,dutyData.dutyInterviewIndex, dutyData.dataUrl)"><span>{{dutyData.dutyInterviewTitle}}</span></div>
            </div>
            <div class="thumb-list-outer" ref="modalContentBodyRef">
              <ul class="thumb-list">

                <li v-for="interviewData in interviewDataList" :key="interviewData.snno" >
                  <a href="javascript:void(0)" @click="interviewDetailClick($event,interviewData)" @touchend="interviewDetailClick($event,interviewData)"  @touchmove="selectTouchClick">
                    <figure><img :src="interviewData.titleImg" alt="" /></figure>
                    <div class="content-info-outer">
                      <div class="sub-title">{{interviewData.register}}</div>
                      <div class="content-title">{{interviewData.title}}</div>
                      <div class="sub-info"><span class="part">{{interviewData.part}}</span><span class="date">{{interviewData.registDt}}</span></div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- // 내용 -->
          <div class="cite">잡코리아(www.jobkorea.co.kr)에서 제공하는 정보입니다.</div>
        </div>
        <div class="modal-close-outer">
          <a href="javascript:void(0)"  @click="selectCloseClick($event)" @touchend="selectCloseClick($event)"><div class="btn-modal-close">닫기</div></a>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import {ref, onMounted, onUpdated, onUnmounted, onBeforeMount, computed} from 'vue';
import {useStore} from "vuex";
import CommonUtil from "@/util/CommonUtil";
import DutyInterviewDetail from "@/views/DutyInterviewDetail";

export default {
  name: "DutyInterviewList",
  props:["dutyInterviewParamList"],
  components: {

  },
  setup(props,context) {
    const storeData = useStore();
    let activeYn = ref(false);
    let saveStatsCd =ref("");
    let interviewDataList = ref([]);
    let searchDataIndex =ref(0);
    let isScrolling = false;
    let modalContentBodyRef= ref();

    onBeforeMount(() => {
      isScrolling=false;
    });

    onMounted(() => {
      //comment
    });

    onUnmounted(() => {
      searchDataIndex.value=0
      isScrolling=false;
    });

    const selectTouchClick = ($e)=>{
      // 스크롤 중인지 확인
      isScrolling = true;
    }

    //외부에서 학교 상세정보를 클릭했을 때
    const connectInitFunc = async (pSaveStatsCd)=>{
      isScrolling=false;
      saveStatsCd.value=pSaveStatsCd;
      setTimeout(()=>{
        activeYn.value=true;
        modalContentBodyRef.value.scrollTop=0
      },200);
      let dataUrl = props.dutyInterviewParamList[0].dataUrl
      selectDutyInterviewChoiceFunc(dataUrl);
    }

    const selectCloseClick = (event)=>{
      event.preventDefault();
      activeYn.value=false;
      searchDataIndex.value=0;
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"dutyInterviewPopState","stateYn":false});
      context.emit("close");
    }

    //직무인터뷰정보를클릭할때
    const selectDutyInterviewChoiceClick = (event,searchIndex,searchUrl)=>{
      CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,saveStatsCd.value);
      searchDataIndex.value=searchIndex;
      selectDutyInterviewChoiceFunc(searchUrl);
    }

    const selectDutyInterviewChoiceFunc = (searchUrl)=>{

      let searchDataUrl = CONFIG.LOCAL_API_URL+searchUrl;
      let result =  CommonUtil.ajaxGetAsyncJsonParamProc(searchDataUrl);
      result.then((reponse)=>{
        interviewDataList.value=reponse.data.item;
      });
    }

    //직무인터부 상세 클릭
    const interviewDetailClick= (event,interviewData)=>{
      event.preventDefault();
      if (isScrolling==false){
        CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,saveStatsCd.value);
        storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"dutyInterviewPopState","stateYn":false});
        context.emit("selectInterviewDetailEvent",interviewData);
      }

      isScrolling=false;
    }

    return {
      connectInitFunc,
      selectCloseClick,
      activeYn,
      saveStatsCd,
      interviewDataList,
      searchDataIndex,
      selectDutyInterviewChoiceClick,
      interviewDetailClick,
      selectTouchClick,
      modalContentBodyRef,
    }
  }
}
</script>
