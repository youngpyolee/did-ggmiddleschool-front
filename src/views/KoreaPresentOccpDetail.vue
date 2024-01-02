<template>
  <div :class="{'modal-outer':true,active:activeYn==true}"  data-index="1">
    <div class="modal-inner">
      <div class="modal-title">대한민국 대표직업</div>
      <div class="modal-body">
        <div class="modal-content-outer">
          <div class="modal-content-inner">
            <div class="modal-content-header">
              <div class="job-name">{{detailTitle}}</div>
              <!-- tab menu -->
              <div class="job-tabmenu">
                <div :class="{'active':searchType=='WHAT_WORK'}"        @click="selectSearchTypeClick($event,'WHAT_WORK')" @touchend="selectSearchTypeClick($event,'WHAT_WORK')">하는 일</div>
                <div :class="{'active':searchType=='EDU_TRANNING'}"     @click="selectSearchTypeClick($event,'EDU_TRANNING')" @touchend="selectSearchTypeClick($event,'EDU_TRANNING')">되는 길</div>
                <div :class="{'active':searchType=='WF_JOB_PROSPECT'}"  @click="selectSearchTypeClick($event,'WF_JOB_PROSPECT')" @touchend="selectSearchTypeClick($event,'WF_JOB_PROSPECT')">전망</div>
              </div>
            </div>
            <div class="job-content">
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

//대한민국대표직업 컴로턴트
export default {
  name: "KoreaPresentOccpDetail",
  components: {

  },
  setup(props,context){
    const storeData = useStore();
    const routeData = useRoute();
    let activeYn =ref(false);
    let saveStatsCd =ref("");
    let detailTitle=ref("");
    let detailWfJobCd=ref("")
    let searchType=ref("");
    let iframeUrl=ref("")


    onBeforeMount(async ()=>{
      //comment
    });

    onMounted(()=>{
      //comment
    });

    onUnmounted(()=>{
      iframeUrl.value="";
      searchType.value="";
      detailTitle.value=""
    });

    //외부에서 대표직업 상세정보를 클릭했을 때
    const connectInitFunc = async (pSaveStatsCd,detailData,pSearchType)=> {
      saveStatsCd.value = pSaveStatsCd;
      searchType.value=pSearchType;
      detailWfJobCd.value=detailData.wfJobCd;
      detailTitle.value=detailData.wfJobNm;
      activeYn.value = true;
      /*setTimeout(() => {
        activeYn.value = true;
      }, 200);*/

      selectDataFunc(pSearchType)
      //EDU_TRANNING,F_JOB_PROSPECT,WHAT_WORK
    }

    const selectDataFunc = (searchType)=>{
      iframeUrl.value=CONFIG.REMOTE_API_URL+"/page/detail/occpPrspectDetail?searchType="+searchType+"&searchWfJobCd="+detailWfJobCd.value;
    }

    const selectCloseClick = (event)=>{
      event.preventDefault();
      activeYn.value=false;
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"koreaPresentOccpDetailState","stateYn":false});
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"koreaPresentOccpState","stateYn":true});
      iframeUrl.value="";
      searchType.value="";
      context.emit("close");
    }

    const selectSearchTypeClick = (event, pSearchtype)=>{
      event.preventDefault();
      searchType.value=pSearchtype;
      selectDataFunc(pSearchtype);
    }

    return{
      activeYn,
      saveStatsCd,
      connectInitFunc,
      selectCloseClick,
      detailTitle,
      detailWfJobCd,
      searchType,
      iframeUrl,
      selectSearchTypeClick,


    }
  }
}
</script>