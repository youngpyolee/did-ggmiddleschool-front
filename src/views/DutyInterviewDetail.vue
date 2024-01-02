<template>
  <div :class="{'modal-outer':true,'active':activeYn==true}" data-index="1">
    <div class="modal-inner">
      <div class="modal-title">직무인터뷰</div>
      <div class="modal-body">
        <div class="modal-content-outer">
          <div class="modal-content-inner">
            <!-- 내용 -->
            <div class="modal-content-header">
              <div class="title">{{ interviewData.title }}</div>
              <div class="infobox"><span class="sub-info">{{ interviewData.register }}</span><span class="date">{{ interviewData.registDt }}</span></div>
            </div>
            <div class="modal-content-body">
                <div class="iframe-outer">
                  <iframe :src="interviewData.interviewUrl" frameborder="0"></iframe>
                </div>
              </div>
            <!-- //내용 -->
          </div>
          <div class="cite">잡코리아(www.jobkorea.co.kr)에서 제공하는 정보입니다.</div>
        </div>
        <div class="modal-close-outer">
          <a href="javascript:void(0)" @click="selectCloseClick($event)" @touchend="selectCloseClick($event)"><div class="btn-modal-close">닫기</div></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {ref, onMounted, onUpdated, onUnmounted, onBeforeMount, computed} from 'vue';
import {useStore} from "vuex";
import CommonUtil from "@/util/CommonUtil";

export default {
  name: "DutyInterviewDetail",
  components: {

  },
  setup(props,context) {
    const storeData = useStore();
    let activeYn = ref(false);
    let saveStatsCd =ref("");
    let searchListStartYn=ref(false);
    let interviewData =ref({});

    onBeforeMount(() => {
      //comment
    });

    onMounted(() => {
      //comment
    });

    onUnmounted(() => {
      activeYn.value=false;
      interviewData.value={};
    });

    //외부에서 학교 상세정보를 클릭했을 때
    const connectInitFunc = async (pSaveStatsCd,lstStartYn,pInterviewData)=>{
      saveStatsCd.value=pSaveStatsCd;
      searchListStartYn.value=lstStartYn;
      interviewData.value=pInterviewData;

      if (!lstStartYn){
        setTimeout(()=>{
          activeYn.value=true;
        },200);
      }else{
        activeYn.value=true;
      }

    }

    const selectCloseClick = (event)=>{
      event.preventDefault();
      activeYn.value=false;
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"dutyInterviewDetailPopState","stateYn":false});
      if (searchListStartYn.value==true){
        storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"dutyInterviewPopState","stateYn":true});
      }
      context.emit("close");
    }

    return {
      connectInitFunc,
      selectCloseClick,
      activeYn,
      saveStatsCd,
      searchListStartYn,
      interviewData,


    }
  }
}
</script>
