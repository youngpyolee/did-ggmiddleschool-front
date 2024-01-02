<template>
  <div class="modal-content-body">
    <div class="pic-grid">
      <div class="pic-item"  v-for="album in albumLit" :key="album.seq" @click="selectAlbumClick(album)">
        <a href="#">
          <div class="pic"><img :src="album.titleImg" alt="" /></div>
          <div class="pic-info">
            <span class="photo-title">{{ album.noti }}</span>
            <span class="date">{{ album.regDate }}</span>
          </div>
        </a>
      </div>
    </div>
    <teleport to="#modalPopUp">
      <!-- 학교앨범상세 start -->
      <SchoolInfoAlbum v-show="$store.state.modalPopStore.schoolPopAlbumState==true" ref="schoolInfoAlbumRef" @close="albumPopCloseEvent" />
      <!-- 학교앨범상세 end  -->
    </teleport>
  </div>
</template>
<script>
import {ref, onMounted, onUpdated, onUnmounted, onBeforeMount, computed} from 'vue';
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import CommonUtil from "@/util/CommonUtil";
import SchoolInfoAlbum from "@/views/SchoolInfoAlbum";
export default {
  name: "SchoolInfoAlbumMain",
  components: {
    SchoolInfoAlbum
  },
  setup(props,context) {
    const storeData = useStore();
    const routeData = useRoute();
    let searchSchulCd = ref("");
    let saveStatsCd = ref("");
    let albumLit = ref([]);
    let schoolInfoAlbumRef = ref();


    onBeforeMount(() => {

    });


    onMounted(() => {

    });

    onUnmounted(() => {
      albumLit.value=[];
    });

    const connectInitFunc = async (pSchulCd,pSaveStatsCd)=>{
      searchSchulCd.value=pSchulCd;
      saveStatsCd.value=pSaveStatsCd;
      let result = await selectAlbumDataFunc()
    }

    const selectAlbumDataFunc = async ()=>{
      let datUrl=CONFIG.LOCAL_API_URL+`/data/data_store/config_school_album_${searchSchulCd.value}.json`;
      let result ="Y";
      let resultData = await CommonUtil.ajaxGetSyncJsonProc(datUrl);

      if (resultData.result=="Y" && resultData.data.totalCnt !=null && resultData.data.totalCnt >0 ){
        albumLit.value=resultData.data.dataList;
      }else{
        albumLit.value=[];
      }
      return result;
    }

    const selectAlbumClick = async (albumData)=>{
      CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,saveStatsCd.value);
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateYn":true,"stateNm":"schoolPopAlbumState"});

      let result = await  schoolInfoAlbumRef.value.connectInitFunc(searchSchulCd.value,albumData.seq,albumData.noti,albumData.regDate,albumData.dataUrl);
    }

    //앨범상세에서 클로즈를 넘길경우
    const albumPopCloseEvent = async ()=>{
      let res = await storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateYn":false,"stateNm":"schoolPopAlbumState"});
     // res = await storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateYn":true,"stateNm":"schoolPopState"});
    }


    return {
      searchSchulCd,
      saveStatsCd,
      schoolInfoAlbumRef,
      albumLit,
      connectInitFunc,
      selectAlbumClick,
      albumPopCloseEvent,

    }
  }
}
</script>
