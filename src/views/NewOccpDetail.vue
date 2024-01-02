<template>
  <div :class="{'modal-outer':true,active:true}"  data-index="1">
    <div class="modal-inner">
      <div class="modal-title">신직업·미래직업</div>
      <div class="modal-body">
        <div class="modal-content-outer">
          <div class="modal-content-inner">
            <div class="modal-content-body">
              <div class="iframe-outer">
                <iframe :src="iframeUrl" frameborder="0"></iframe>
              </div>
            </div>
          </div>
          <div class="cite">워크넷(www.worknet.go.kr)에서 제공하는 정보입니다.</div>
        </div>
        <div class="modal-close-outer">
          <a href="javascript:void(0)" @click="selectCloseClick($event)" @touchend="selectCloseClick($event)"><div class="btn-modal-close">닫기</div></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref,onMounted,onUpdated,onUnmounted,onBeforeMount,computed } from 'vue';
import { useStore } from "vuex";
import {useRoute} from "vue-router";
import CommonUtil   from "@/util/CommonUtil";

//신직업 상세 컴포넌트
export default {
  name: "NewOccpDetail",
  components: {

  },
  setup(props,context){
    const storeData = useStore();
    const routeData = useRoute();
    let activeYn =ref(false);
    let saveStatsCd =ref("");
    let iframeUrl =ref("");
    let detailSnno =ref("");
    let detailJobCategoryNm =ref("");
    let detailJobNm =ref("");

    onBeforeMount(async ()=>{
      //comment
    });

    onMounted(()=>{
      //comment
    });

    onUnmounted(()=>{
      //comment
    });

    //신직업 상세정보를 클릭했을 때
    const connectInitFunc = async (pSaveStatsCd,detailData)=> {
      saveStatsCd.value = pSaveStatsCd;
      setTimeout(() => {
        activeYn.value = true;
      }, 200);
      detailSnno.value=detailData.snno;
      detailJobCategoryNm.value=detailData.jobCategoryNm;
      detailJobNm.value=detailData.jobNm;
      selectDataFunc(detailSnno.value)
    }

    const selectDataFunc = (jobSnno)=>{
      iframeUrl.value=CONFIG.REMOTE_API_URL+"/page/detail/variousNewOccpDetail?searchSnno="+jobSnno;
    }

    const selectCloseClick = (event)=>{
      event.preventDefault();
      activeYn.value=false;
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"newOccpDetailState","stateYn":false});
      iframeUrl.value="";
      context.emit("close");
    }

    return{
      activeYn,
      saveStatsCd,
      connectInitFunc,
      selectCloseClick,
      iframeUrl,
      detailSnno,
      detailJobCategoryNm,
      detailJobNm,

    }
  }
}
</script>