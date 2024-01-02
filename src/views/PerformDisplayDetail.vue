<template>
  <div :class="{'modal-outer':true,'active':activeYn==true}" >
    <div class="modal-inner">
      <div class="modal-title">공연·전시</div>
      <div class="modal-body">
        <div class="modal-content-outer">
          <div class="modal-content-inner">

            <div class="img-header-info">
              <div class="poster-img"><img :src="detailData.titleImg" alt="" /></div>
              <div class="img-info">
                <h3 class="title">{{detailData.title}}</h3>
                <ul class="sum-info">
                  <li><span>공연기간</span><span>{{detailData.beginDt}} ~ {{detailData.endDt}}</span></li>
                  <li><span>공연시간</span><span>{{detailData.pblprfrTime}}</span></li>
                  <li><span>공연가격</span><span>{{detailData.pblprfrPc}}</span></li>
                  <li><span>장소</span><span>{{detailData.pblprfrPlace}}</span></li>
                  <li><span>관람시간</span><span>{{detailData.viewngTime}}</span></li>
                  <li><span>문의</span><span>{{detailData.refrnc}}</span></li>
                </ul>
              </div>
            </div>
            <div class="modal-content-body">
              <!-- 내용 -->
              <div class="event-info-inner">
                <div>
                  <span>공연장명</span>
                  <p>{{detailData.prfplcNm}}</p>
                </div>
                <div>
                  <span>주소</span>
                  <p>{{detailData.addr}}</p>
                </div>
                <div>
                  <span>상세주소</span>
                  <p>{{detailData.detailAddr}}</p>
                </div>
                <div>
                  <span>전화번호</span>
                  <p>{{detailData.telNo}}</p>
                </div>
                <div>
                  <span>홈페이지</span>
                  <p>{{detailData.homePage}}</p>
                </div>
                <div></div>
              </div>
              <!-- //내용 -->
              <!-- 지도 api -->
              <div class="location-map" style="height: 500px">
                <iframe :src="naverMapUrl" height="100%" width="100%"></iframe>
              </div>
            </div>
          </div>
          <div class="cite">문화포털(www.culture.go.kr)에서 제공하는 정보입니다.</div>
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

//이벤트축제 상세 컴포넌트
export default {
  name: "PerformDisplayDetail",
  components: {

  },
  setup(props,context){
    const storeData = useStore();
    const routeData = useRoute();
    let activeYn =ref(false);
    let saveStatsCd =ref("");
    let detailData=ref("")
    let naverMapUrl=ref("")
    let searchListStartYn=ref(false);

    onBeforeMount(async ()=>{
      //
    });

    onMounted(()=>{
      //comment
    });

    onUnmounted(()=>{
      naverMapUrl.value=""
    });

    //외부에서 행사축제 상세정보를 클릭했을 때
    const connectInitFunc = async (pSaveStatsCd,lstStartYn,pDetailData)=> {
      saveStatsCd.value = pSaveStatsCd;
      searchListStartYn.value=lstStartYn;
      setTimeout(() => {
        activeYn.value = true;
      }, 200);

      detailData.value=pDetailData;
      naverMapUrl.value="/naverMap/eventFestivalMap.html?lttud="+detailData.value.lttud+"&lgtud="+detailData.value.lgtud+"&addrInf="+detailData.value.addr;
    }

    const selectCloseClick = (event)=>{
      event.preventDefault();
      activeYn.value=false;
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"eventFestivalDetailState","stateYn":false});

      if (searchListStartYn.value==true){
        storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"eventFestivalState","stateYn":true});
      }
      context.emit("close");
    }


    return{
      activeYn,
      saveStatsCd,
      connectInitFunc,
      selectCloseClick,
      detailData,
      naverMapUrl,
      searchListStartYn,

    }
  }
}
</script>