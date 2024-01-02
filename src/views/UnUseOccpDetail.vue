<template>
  <div :class="{'modal-outer':true,'active':activeYn==true}"  data-index="1">
    <div class="modal-inner">
      <div class="modal-title">이색 직업</div>
      <div class="modal-body">
        <div class="modal-content-outer">
          <div class="modal-content-inner">
            <div class="modal-content-header">
              <div class="single-title location">경영/기획/금융 > 귀농귀촌플래너</div>
            </div>
            <div class="modal-content-body">
              <div class="iframe-outer">
                <iframe :src="iframeUrl" frameborder="0"></iframe>
              </div>
            </div>
          </div>
          <div class="cite">워크넷(www.worknet.go.kr)에서 제공하는 정보입니다.</div>
        </div>
        <div class="modal-close-outer">
          <a href="javascript:void(0)"><div class="btn-modal-close" @click="selectCloseClick($event)" @touchend="selectCloseClick($event)">닫기</div></a>
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

//이색직업 상세 컴포넌트
export default {
  name: "UnUseOccpDetail",
  components: {

  },
  setup(props,context){
    const storeData = useStore();
    const routeData = useRoute();
    let activeYn =ref(false);
    let saveStatsCd =ref("");
    let detailSnno =ref("");
    let detailJobCategoryNm =ref("");
    let detailJobNm =ref("");
    let iframeUrl =ref("");

    onBeforeMount(async ()=>{
      //comment
    });

    onMounted(()=>{
      //comment
    });

    onUnmounted(()=>{
      //comment
    });

    //외부에서 대표직업 상세정보를 클릭했을 때
    const connectInitFunc = async (pSaveStatsCd,detailData)=> {
      saveStatsCd.value = pSaveStatsCd;
      setTimeout(() => {
        activeYn.value = true;
      }, 200);
      detailSnno.value=detailData.snno;
      detailJobCategoryNm.value=detailData.jobCategoryNm;
      detailJobNm.value=detailData.jobNm;
      selectDataFunc(detailSnno.value);
    }

    const selectDataFunc = (snno)=>{
      iframeUrl.value=CONFIG.REMOTE_API_URL+"/page/detail/variousUnUseOccpDetail?searchSnno="+snno;
    }

    const selectCloseClick = (event)=>{
      event.preventDefault();
      activeYn.value=false;
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"unUseOccpPopDetailState","stateYn":false});
      iframeUrl.value="";
      context.emit("close");
    }

    return{
      activeYn,
      saveStatsCd,
      connectInitFunc,
      detailSnno,
      detailJobCategoryNm,
      detailJobNm,
      selectCloseClick,
      iframeUrl,

    }
  }
}
</script>