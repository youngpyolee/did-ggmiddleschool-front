<template>
  <div :class="{'modal-outer':true,'active':activeYn==true}" data-index="1">
    <div class="modal-inner">
      <div class="modal-title">{{ subDetailData.subTitle }}</div>
      <div class="modal-body">
        <div class="modal-content-outer">
          <div class="modal-content-inner">
            <!-- 내용 -->
            <div class="modal-content-body" ref="modalContentBodyRef">
              <ul class="notice-list">

                <li v-for="data in dataList" :key="data.bbsSnno">
                  <a href="javascript:void(0)" @click="selectNoticeDetailClick($event,data)" @touchend="selectNoticeDetailClick($event,data)"
                     @touchmove="selectTouchClick">
                    <i>공지</i>
                    <strong>{{ data.title }}</strong>
                    <span>{{ data.date }}</span>
                  </a>
                </li>

              </ul>
            </div>
            <!-- // 내용 -->
          </div>
        </div>
        <div class="modal-close-outer">
          <a href="javascript:void(0)" @click="selectCloseClick($event)" @touchend="selectCloseClick($event)">
            <div class="btn-modal-close">닫기</div>
          </a>
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
import commonUtil from "@/util/CommonUtil";

//게시판 컴포넌트
export default {
  name: "NoticeInfoList",
  components: {

  },
  setup(props,context){
    const storeData = useStore();
    const routeData = useRoute();
    let activeYn =ref(false);
    let saveStatsCd =ref("");
    let dataList = ref([]);
    let modalContentBodyRef =ref();
    let subDetailData = ref({})
    let isScrolling = false;

    onBeforeMount(async ()=>{
      //comment
    });

    onMounted(()=>{
      //comment
    });

    onUnmounted(()=>{
      dataList.value=[];
      subDetailData.value={}
      isScrolling = false;
    });

    //신직업 상세정보를 클릭했을 때
    const connectInitFunc = async (subData)=> {
      isScrolling=false;
      saveStatsCd.value=subData.statsCd;
      setTimeout(()=>{
        activeYn.value=true;
        modalContentBodyRef.value.scrollTop=0
      },200);

      subDetailData.value=subData;

      let sendDataurl = subData.dataUrl;
      if (sendDataurl.indexOf("http") < 0){
        sendDataurl = CONFIG.LOCAL_API_URL+sendDataurl;
      }


      selectDataProcFunc(sendDataurl)
    }

    const selectDataProcFunc = (dataUrl)=>{
       let dataResult = CommonUtil.ajaxGetAsyncProc(dataUrl,null);
       dataResult.then((response)=>{
         let noticeData = commonUtil.convertXmltoJson(response.data);

         if (Array.isArray(noticeData.notice.item)){
           dataList.value=noticeData.notice.item;
         }else{
           dataList.value=[]
           dataList.value.push(noticeData.notice.item)
         }
       });
    }

    const selectCloseClick = (event)=>{
      event.preventDefault();
      isScrolling=false;
      activeYn.value=false;
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"noticeInfoListState","stateYn":false});
      context.emit("close");
    }

    const selectNoticeDetailClick = (event,detailData)=>{
      event.preventDefault();

      if (isScrolling==false){
        CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,saveStatsCd.value);
        detailData.subTitle=subDetailData.value.subTitle;
        context.emit("selectDetailClickEvent",detailData);
      }

      isScrolling=false;
    }

    const selectTouchClick = ($e)=>{
      isScrolling = true;
    }

    return{
      activeYn,
      saveStatsCd,
      selectCloseClick,
      connectInitFunc,
      dataList,
      modalContentBodyRef,
      subDetailData,
      selectNoticeDetailClick,
      selectTouchClick,

    }
  }
}
</script>