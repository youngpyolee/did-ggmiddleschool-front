<template>
  <div :class="{'modal-outer':true,'active':activeYn==true}" data-index="1">
    <div class="modal-inner">
      <div class="modal-title">{{ detailData.subTitle }}</div>
      <div class="modal-body">
        <div class="modal-content-outer">
          <div class="modal-content-inner">
            <!-- 내용 -->
            <div class="modal-content-header">
              <div class="title">{{ detailData.noti }}</div>
              <div class="infobox"><span class="date">{{detailData.startDate}} ~ {{detailData.endDate}}</span></div>
            </div>
            <div class="modal-content-body">
              <div class="competi-detail-outer">
                <div class="pic-competi">
                  <img :src="detailData.contestImage" alt="" />
                  <ul>
                    <li><span>주최 </span> {{ detailData.host }}</li>
                    <li><span>분야 </span> {{ detailData.field }}</li>
                    <li><span>기간 </span> {{detailData.startDate}} ~ {{detailData.endDate}}</li>
                    <li><span>대상 </span> {{ detailData.target }}</li>
                    <li><span>상금 </span> {{ detailData.money }}</li>
                  </ul>
                </div>
                <div class="competi-detail-inner">
                  <strong>주제</strong>
                  <div class="par" v-html="detailData.subject"></div>
                  <strong>기간 및 일정</strong>
                  <div class="par" v-html="detailData.schedule"></div>
                  <strong>참가대상</strong>
                  <div class="par" v-html="detailData.qualification"></div>
                  <strong>시상내역(혜택)</strong>
                  <div class="par" v-html="detailData.benefit"></div>
                  <strong>참가방법</strong>
                  <div class="par" v-html="detailData.receipt"></div>
                  <strong>활동내용</strong>
                  <div class="par" v-html="detailData.content"></div>
                  <strong>문의처</strong>
                  <div class="par" v-html="detailData.contact"></div>
                </div>
              </div>
            </div>
            <!-- //내용 -->
          </div>
          <div class="cite">대티즌닷컴(www.detizen.com)에서 제공하는 정보입니다.</div>
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

//공모전 상세 컴포넌트
export default {
  name: "ContestDetail",
  components: {

  },
  setup(props,context){
    const storeData = useStore();
    const routeData = useRoute();
    let activeYn =ref(false);
    let saveStatsCd =ref("");
    let detailData=ref("");
    let searchListStartYn=ref(false);

    onBeforeMount(async ()=>{
      //comment
    });

    onMounted(()=>{
      //comment
    });

    onUnmounted(()=>{
      //comment
    });

    //외부에서 행사축제 상세정보를 클릭했을 때
    const connectInitFunc = async (pSaveStatsCd,lstStartYn,pDetailData)=> {
      saveStatsCd.value = pSaveStatsCd;
      searchListStartYn.value=lstStartYn;
      setTimeout(() => {
        activeYn.value = true;
      }, 200);

      detailData.value=pDetailData;
    }

    const selectCloseClick = (event)=>{
      event.preventDefault();
      activeYn.value=false;
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"contestDetailState","stateYn":false});

      //리스트목록에서 상세를 클릭해서  왔을경우
      if (searchListStartYn.value==true){
        storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"contestListState","stateYn":true});
      }

      context.emit("close");
    }

    return{
      activeYn,
      saveStatsCd,
      connectInitFunc,
      selectCloseClick,
      detailData,
      searchListStartYn,

    }
  }
}
</script>