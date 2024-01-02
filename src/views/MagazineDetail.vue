<template>
  <div :class="{'modal-outer':true, 'active':activeYn==true}">

    <div class="modal-inner magazine">
      <div class="modal-title">이슈매거진</div>
      <div class="magazine-inner">
        <img :src="magazineTitleImg" alt="" srcset="" />
      </div>
      <div class="magazine-nav-outer">
        <div class="magazine-selector">
          <div class="custom-select" style="width: 400px">
            <div  :class="{'select-selected':true,'select-arrow-active':magazineSelectedYn==false}" @click="selectMagazineSelectClick" >{{magazineSelectTitle}}</div>
            <div :class="{'select-items':true, 'select-hide':magazineSelectedYn==true}">
              <div :class="{'same-as-selected':searchMgzNo==item.mgznNo}" v-for="(item, index) in magazineMasterList" :key="item.mgznNo" @click="selectMagazineOptionClick($event,item.mgznNo,item.mgznNm)" >{{item.mgznNm}}</div>
            </div>
          </div>
       </div>
       <div :class="{'prev':true,'dimmed':detailFileIndex==0}" @touchend="detailImgMoveClick($event,'MINUS')" @click="detailImgMoveClick($event,'MINUS')">이전</div>
       <div :class="{'next':true,'dimmed':detailFileIndex+1 == detailFileList.length}" @touchend="detailImgMoveClick($event,'PLUS')" @click="detailImgMoveClick($event,'PLUS')">다음</div>
       <div>
          <a href="javascript:void(0)" @click="selectCloseClick($event)" @touchend="selectCloseClick($event)"><div class="close">닫기</div></a>
       </div>
      </div>
      <div class="cite">워크넷(www.worknet.go.kr)에서 제공하는 정보입니다.</div>
    </div>
  </div>
</template>
<script>
import {ref, onMounted, onUpdated, onUnmounted, onBeforeMount, computed} from 'vue';
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import CommonUtil from "@/util/CommonUtil";
export default {
  name: "MagazineDetail",
  components: {

  },
  setup(props,context) {
    const storeData = useStore();
    const routeData = useRoute();
    let activeYn = ref(false);
    let saveStatsCd =ref("");
    let magazineMasterList=ref([]); //잡지목록
    let magazineSelectTitle=ref("");
    let magazineSelectedYn=ref(true);
    let magazineTitleImg=ref("");
    let searchMgzNo=ref("");
    let detailFileList =ref([]); //해당잡지의 파일목록
    let detailFileIndex=ref(0);
    let localApiUrl = ref("")
    let isScrolling =false;

    onBeforeMount( async () => {
      let result = await magazineDtailFunc();
      localApiUrl.value=CONFIG.LOCAL_API_URL;
    });

    onMounted(async () => {
      //comment
    });

    onUnmounted(() => {
      activeYn.value=false;
      saveStatsCd.value="";
      detailFileIndex.value=0;
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"magazinePopState","stateYn":false});
    });

    const selectTouchClick = ($e)=>{
      // 스크롤 중인지 확인
      isScrolling = true;
    }

    //외부에서 학교 상세정보를 클릭했을 때
    const magazineDtailFunc = async ()=>{
      let dataUrl = CONFIG.LOCAL_API_URL+"/data/data_store/config_magazine.json";
      let result = await CommonUtil.ajaxGetSyncJsonProc(dataUrl);
      if (result.result=="Y"){
        magazineMasterList.value=result.data.dataList;
      }
      return result;
    };

    const connectInitFunc =async  (pSaveStatsCd)=>{
      saveStatsCd.value=pSaveStatsCd;
      magazineSelectedYn.value=true;
      detailFileList.value=magazineMasterList.value[0].detailFileList;
      magazineSelectTitle.value=magazineMasterList.value[0].mgznNm;
      searchMgzNo.value=magazineMasterList.value[0].mgznNo;
      let snedTitleImg=detailFileList.value[0].sysFileNm;

      if (snedTitleImg.indexOf("http") < 0){
        snedTitleImg = CONFIG.LOCAL_API_URL+snedTitleImg;
      }

      magazineTitleImg.value=snedTitleImg;

      detailFileIndex.value=0;

      setTimeout(()=>{
        activeYn.value=true;
      },200);
    }

    //선택된 잡지를 클릭했을 경우
    const selectMagazineSelectClick = (event)=>{
        magazineSelectedYn.value=false;

    }

    //잡지의 목록을 클릭했을 경우
    const selectMagazineOptionClick =(event,mgznNo,mgznNm)=>{
    //  event.preventDefault()
      if (isScrolling==false){
        magazineSelectTitle.value=mgznNm
        magazineSelectedYn.value=true;
        searchMgzNo.value=mgznNo;
        selectMagazineListFunc(mgznNo);
      }

      isScrolling=false;
    }

    //잡지에 따른 세부이미조 목록을 만든다.
    const selectMagazineListFunc = (pMgznNo)=>{

     let index= magazineMasterList.value.findIndex((data,index)=>{
        if (data.mgznNo == pMgznNo){
          detailFileList.value= data.detailFileList;
          return true;
        }
      });

      let tempSysFileNm = detailFileList.value[0].sysFileNm;
      if (tempSysFileNm.indexOf("http") < 0){
        tempSysFileNm = CONFIG.LOCAL_API_URL+tempSysFileNm;
      }

      magazineTitleImg.value=tempSysFileNm
      detailFileIndex.value=0;
    }

    const selectCloseClick = (event)=>{
      event.preventDefault()
      activeYn.value=false;
      magazineSelectTitle.value=""
      magazineSelectedYn.value=true;
      searchMgzNo.value=""
      saveStatsCd.value="";
      detailFileList.value=[];
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"magazinePopState","stateYn":false});
      context.emit("close");
    }

    // 이전 다음 클릭시
    const detailImgMoveClick = (event,paramYn)=>{
      event.preventDefault()
      if (paramYn=="PLUS"){
        if (detailFileIndex.value+1 !=detailFileList.value.length){
          detailFileIndex.value=detailFileIndex.value+1;
          let tempSysFileNm = detailFileList.value[detailFileIndex.value].sysFileNm;
          if (tempSysFileNm.indexOf("http") < 0){
            tempSysFileNm = CONFIG.LOCAL_API_URL+tempSysFileNm;
          }

          magazineTitleImg.value=tempSysFileNm
        }
      }
      else if (paramYn=="MINUS"){
        if (detailFileIndex.value != 0){
          detailFileIndex.value=detailFileIndex.value-1;
          let tempSysFileNm = detailFileList.value[detailFileIndex.value].sysFileNm;
          if (tempSysFileNm.indexOf("http") < 0){
            tempSysFileNm = CONFIG.LOCAL_API_URL+tempSysFileNm;
          }
          magazineTitleImg.value=tempSysFileNm
        }
      }
    }

    return {
      connectInitFunc,
      activeYn,
      saveStatsCd,
      magazineMasterList,
      magazineSelectTitle,
      selectMagazineSelectClick,
      selectMagazineOptionClick,
      magazineSelectedYn,
      searchMgzNo,
      selectCloseClick,
      magazineTitleImg,
      detailFileList,
      detailFileIndex,
      detailImgMoveClick,
      localApiUrl,
      selectTouchClick
    }
  }
}
</script>
