<template>
  <div :class="{'modal-outer':true, 'active':activeYn==true}">
    <div class="modal-inner">
      <div class="modal-title">{{ subDetailData.subTitle }}</div>
      <div class="modal-body">
        <div class="modal-content-outer">
          <div class="modal-content-inner">
            <!-- 내용 -->
            <div class="modal-content-body" ref="modalContentBodyRef">
              <div class="pic-grid">

                <div class="pic-item" v-for="album in albumList" :key="album.seq">
                  <a href="javascript:void(0)" @touchend="selectAlbumClick($event,album)" @click="selectAlbumClick($event,album)" @touchmove="selectTouchClick">
                    <div class="pic"><img :src="album.titleImg" alt="" /></div>
                    <div class="pic-info">
                      <span class="photo-title">{{album.noti}}</span>
                      <span class="date">{{album.regDate}}</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <!-- //내용 -->
          </div>
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
import commonUtil from "@/util/CommonUtil";

export default {
  name: "SchoolIconAlbum",
  components: {

  },
  setup(props,context) {
    const storeData = useStore();
    let activeYn=ref(false);
    let subDetailData = ref({})
    let albumList = ref([]);
    let saveStatsCd =ref("");
    const modalContentBodyRef =ref();
    let isScrolling = false;

    onBeforeMount(() => {
      //comment
    });

    onMounted(() => {
      //comment
    });

    onUnmounted(() => {
      isScrolling = false;
    });


    //외부에서 학교 상세정보를 클릭했을 때
    const connectInitFunc = async (subData)=>{
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
      //console.log(sendDataurl)
      selectDataProcFunc(sendDataurl)
    }

    const selectDataProcFunc = (dataUrl)=>{
      let dataResult = CommonUtil.ajaxGetAsyncJsonParamProc(dataUrl,null);
      dataResult.then((response)=>{
        albumList.value=response.data.dataList;
      });
    }

    //앨범목록에서 상세를 클릭했을 경우
    const selectAlbumClick = (event,pAlbum)=>{
      event.preventDefault();
      if (isScrolling==false){
        CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,saveStatsCd.value);
        pAlbum.subTitle=subDetailData.value.subTitle;
        context.emit("selectDetailClickEvent",pAlbum);
      }
      isScrolling=false;
    }

    const selectCloseClick = (event)=>{
      event.preventDefault();
      isScrolling=false;
      activeYn.value=false;
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"schoolIconAlbumListState","stateYn":false});
      context.emit("close");
    }

    const selectTouchClick = ($e)=>{
      isScrolling = true;
    }

    return {
      connectInitFunc,
      selectCloseClick,
      activeYn,
      modalContentBodyRef,
      subDetailData,
      albumList,
      selectAlbumClick,
      saveStatsCd,
      selectTouchClick,

    }
  }
}
</script>
