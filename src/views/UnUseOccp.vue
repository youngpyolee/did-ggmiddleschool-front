<template>
  <div :class="{'modal-outer':true,active:activeYn==true}">
    <div class="modal-inner">
      <div class="modal-title">이색직업</div>
      <div class="modal-body">
        <div class="modal-content-outer">
          <div class="modal-content-inner">
            <div class="modal-content-header">
              <div class="job-theme-menu" data-grid-column="5">
                <div :class="{'grid-item':true, 'active':masterSelectedCd==masterData.itemCd}" v-for="masterData in masterCdList" @click="selectMasterClick($event,masterData.itemCd)" @touchend="selectMasterClick($event,masterData.itemCd)">
                  <div class="icon"><img :src="masterData.itemImg" alt="" /></div>
                  <div class="name">{{masterData.itemTitle}}</div>
                </div>
                <div class="grid-item"></div>
              </div>
            </div>

            <div class="modal-content-body" ref="modalContentBodyRef">
              <ul class="thumb-two-list" data-column="2">
                <li v-for="detailData in detailList"  @touchmove="selectTouchClick" @click="selectDetailClick($event,detailData.snno,detailData.jobCategoryNm,detailData.jobNm)"
                    @touchend="selectDetailClick($event,detailData.snno,detailData.jobCategoryNm,detailData.jobNm)"
                    :key="detailData.snno">
                  <a href="javascript:void(0)">
                    <div class="figure"><img :src="detailData.titleImg" alt="" /></div>
                    <div>
                      <div>{{detailData.jobCategoryNm}}</div>
                      <strong>{{detailData.jobNm}}</strong>
                    </div>
                  </a>
                </li>
                <li></li>
              </ul>
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

//이색직업 컴로턴트
export default {
  name: "UnUseOccp",
  props:["masterCdList"],
  components: {
  },
  setup(props,context){
    const storeData = useStore();
    const routeData = useRoute();
    let activeYn =ref(false);
    let saveStatsCd =ref("");
    let masterSelectedCd =ref("")
    let detailList = ref([]);
    let modalContentBodyRef =ref()
    let isScrolling = false;

    onBeforeMount(async ()=>{
      isScrolling = false;
    });

    onMounted(()=>{
      //comment
    });

    onUnmounted(()=>{
      //comment
    });

    const connectInitFunc = async (pSaveStatsCd)=>{
      saveStatsCd.value=pSaveStatsCd;
      isScrolling = false;
      setTimeout(()=>{
        activeYn.value=true;
      },200);

      masterInitFunc();
    }

    const masterInitFunc = ()=>{
      masterSelectedCd.value=props.masterCdList[0].itemCd;
      masterSelectFunc(masterSelectedCd.value);
    }

    const masterSelectFunc = (masterCd)=>{
      let dataUrl = `${CONFIG.LOCAL_API_URL}/data/data_store/config_various_3_${masterCd}.json`;
      let dataResult = CommonUtil.ajaxGetAsyncJsonParamProc(dataUrl,null);
      dataResult.then((response)=>{
        detailList.value=response.data.itemList;
        modalContentBodyRef.value.scrollTop=0
      });
    }

    const selectCloseClick = (event)=>{
      event.preventDefault();
      activeYn.value=false;
      isScrolling = false;
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"unUseOccpPopState","stateYn":false});
      context.emit("close");
    }

    const selectMasterClick = (event,masterCd)=>{
      event.preventDefault();
      masterSelectedCd.value=masterCd;
      masterSelectFunc(masterCd)
    }

    //이색직업 상세를 클릭할 경우
    const selectDetailClick = (event,snno,jobCategoryNm,jobNm)=>{
      event.preventDefault();

      if (isScrolling==false){
        CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,saveStatsCd.value);
       // storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"unUseOccpPopState","stateYn":false});
        let detailDta={"snno":snno,"jobCategoryNm":jobCategoryNm,"jobNm":jobNm}
        context.emit("selectDetailClickEvent",detailDta);
      }

      isScrolling=false;
    }

    const selectTouchClick = ($e)=>{
      isScrolling = true;
    }

    return{
      activeYn,
      saveStatsCd,
      connectInitFunc,
      selectCloseClick,
      masterSelectedCd,
      selectMasterClick,
      detailList,
      modalContentBodyRef,
      selectDetailClick,
      selectTouchClick,
    }
  }
}
</script>
