<template>
  <div :class="{'modal-outer':true,active:activeYn==true}">
    <div class="modal-inner">
      <div class="modal-title">대한민국 대표직업</div>
      <div class="modal-body">
        <div class="modal-content-outer">
          <div class="job-division-outer">
            <div class="job-division-title">
              <div>직업분류 1차 선택</div>
              <div>직업분류 2차 선택</div>
            </div>
            <div class="search-job">
              <!-- li 클릭 -->
              <div>
                <ul class="select-item">
                  <li v-for="masterData in masterCdList" :class="{'active':masterSelectedCd==masterData.itemCd}" @click="selectMasterClick($event,masterData.itemCd)" @touchend="selectMasterClick($event,masterData.itemCd)">{{ masterData.itemNm }}</li>
                </ul>
              </div>
              <div>
                <ul class="select-item">
                  <li :class="{'active':detailSelectedCd==datailData.wfJobCd}" v-for="(datailData,index) in detailList" @touchmove="selectTouchClick" @click="selectDetailClick($event,datailData.wfJobCd,datailData.wfJobNm)" @touchend="selectDetailClick($event,datailData.wfJobCd,datailData.wfJobNm)" :key="datailData.wfJobCd">{{datailData.wfJobNm}}</li>
                </ul>
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
  name: "KoreaPresentOccp",
  components: {

  },
  setup(props,context){
    const storeData = useStore();
    const routeData = useRoute();
    let activeYn =ref(false);
    let saveStatsCd =ref("");
    let masterCdList =ref([]);
    let detailList =ref([]);
    let isScrolling = false;
    let masterSelectedCd =ref("");
    let detailSelectedCd =ref("");

    onBeforeMount(async ()=>{
      isScrolling=false;
    });

    onMounted(()=>{
      masterSelectedCd.value="";
      detailSelectedCd.value="";
    });

    onUnmounted(()=>{
      isScrolling=false;
    });

    const selectTouchClick = ($e)=>{
      isScrolling = true;
    }

    //외부에서 학교 상세정보를 클릭했을 때
    const connectInitFunc = async (pSaveStatsCd)=>{
      saveStatsCd.value=pSaveStatsCd;
      isScrolling=false;
      setTimeout(()=>{
        activeYn.value=true;
      },200);
      masterInitFunc();
    }

    const masterInitFunc = ()=>{
      let dataUrl = CONFIG.LOCAL_API_URL+"/data/data_store/config_worknet_occp_prspect_cd.json";
      let masterResult = CommonUtil.ajaxGetAsyncJsonParamProc(dataUrl,null);
      masterResult.then((response)=>{
        masterCdList.value=response.data;
        masterSelectedCd.value=masterCdList.value[0].itemCd;
        masterSelectFunc(masterSelectedCd.value);
      });
    }

    const masterSelectFunc = (masterCd)=>{
      let dataIndex = masterCdList.value.findIndex((data,index)=>{
        if (data.itemCd == masterCd){
          detailList.value=data.dataList;
          return true;
        }
      });
    }

    const selectCloseClick = (event)=>{
      event.preventDefault();
      activeYn.value=false;
      isScrolling=false;
      //searchDataIndex.value=0;
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"koreaPresentOccpState","stateYn":false});
      context.emit("close");
    }

    const selectMasterClick = (event,masterCd)=>{
      console.log("selectMasterClick event="+event.type)
      event.preventDefault();
      masterSelectedCd.value=masterCd;
      detailSelectedCd.value="";
      masterSelectFunc(masterCd)
    }

    //대표직업 상세를 클릭할 경우
    const selectDetailClick = (event,detailCd,detailTitle)=>{
      event.preventDefault();
      if (isScrolling==false){
        CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,saveStatsCd.value);
        storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"koreaPresentOccpState","stateYn":false});
        let detailDta={"wfJobCd":detailCd,"wfJobNm":detailTitle}
        context.emit("selectDetailClickEvent",detailDta);
      }

      isScrolling=false;
    }


    return{
      activeYn,
      saveStatsCd,
      connectInitFunc,
      selectCloseClick,
      masterCdList,
      detailList,
      masterSelectedCd,
      detailSelectedCd,
      selectMasterClick,
      selectDetailClick,
      selectTouchClick,

    }
  }
}
</script>
