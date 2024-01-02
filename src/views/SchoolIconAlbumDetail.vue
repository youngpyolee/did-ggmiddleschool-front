<template>
  <div :class="{'modal-outer':true, 'active':activeYn==true}"  data-index="1">
    <div class="modal-inner">
      <div class="modal-title">{{ detailData.subTitle }}</div>
      <div class="modal-body">
        <div class="modal-content-outer">
          <div class="modal-content-inner">
            <!-- 내용 -->
            <div class="modal-content-header">
              <div class="title">{{ detailData.noti }}</div>
              <div class="infobox"><span class="date">{{detailData.regDate}}</span></div>
            </div>
            <div class="modal-content-body">
              <div class="iframe-outer">
                <iframe :src="detailData.dataUrl" frameborder="0"></iframe>
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

export default {
  name: "SchoolIconAlbumDetail",
  components: {

  },
  setup(props,context) {
    const storeData = useStore();
    let activeYn=ref(true);
    let detailData = ref({});
    const modalContentBodyRef =ref();

    onBeforeMount(() => {
      //comment
    });

    onMounted(() => {
      //comment
    });

    onUnmounted(() => {
      //comment
    });

    //외부에서 앨범 상세정보를 클릭했을 때
    const connectInitFunc = async (pDetailData)=>{
      setTimeout(()=>{
        activeYn.value=true;
      },200);
      detailData.value=pDetailData
    }

    const selectCloseClick = (event)=>{
      event.preventDefault();
      activeYn.value=false;
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"schoolIconAlbumDetailState","stateYn":false});
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"schoolIconAlbumListState","stateYn":true});
      context.emit("close");
    }

    return {
      connectInitFunc,
      selectCloseClick,
      activeYn,
      detailData,
      modalContentBodyRef,
    }
  }
}
</script>
