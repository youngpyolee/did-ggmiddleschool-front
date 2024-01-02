<template>
  <div :class="{'modal-outer':true, 'active':activeYn==true}">
    <div class="modal-inner">
      <div class="modal-title">학교앨범</div>
      <div class="modal-body">
        <div class="modal-content-outer">
          <div class="modal-content-inner">
            <!-- 내용 -->
            <div class="modal-content-header">
              <div class="title">{{albumTitle}}</div>
              <div class="infobox"><span class="date">{{albumRegDate}}</span></div>
            </div>
            <div class="modal-content-body">
              <div class="iframe-outer">
                <iframe :src="albumDataUrl" frameborder="0"></iframe>
              </div>
            </div>
            <!-- //내용 -->
          </div>
        </div>
        <div class="modal-close-outer">
          <a href="javascript:void(0)" @touchend="selectCloseClick($event)" @click="selectCloseClick($event)"><div class="btn-modal-close">닫기</div></a>
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
  name: "SchoolAreaInfoAlbum",
  components: {

  },
  setup(props,context) {
    const storeData = useStore();
    let activeYn=ref(true);
    let albumTitle=ref("");
    let albumRegDate=ref("");
    let albumContents=ref("");
    let albumDataUrl=ref("");

    onBeforeMount(() => {
      //comment
    });

    onMounted(() => {
      //comment
    });

    onUnmounted(() => {
      //comment
    });

    //외부에서 학교 상세정보를 클릭했을 때
    const connectInitFunc = async (pSchulCd,pSeq,title,regDate,dataUrl)=>{
      albumTitle.value=title;
      albumRegDate.value=regDate;
      albumDataUrl.value=dataUrl;
      let result ="Y";
      return result;
    }

    const selectCloseClick = (event)=>{
      event.preventDefault()
       context.emit("close");
    }

    return {
      connectInitFunc,
      selectCloseClick,
      activeYn,
      albumTitle,
      albumRegDate,
      albumContents,
      albumDataUrl,

    }
  }
}
</script>
