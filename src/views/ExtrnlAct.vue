<template>
  <div :class="{'modal-outer':true,'active':activeYn==true}" >
    <div class="modal-inner">
      <div class="modal-title">{{ subDetailItem.subTitle }}</div>
      <div class="modal-body">
        <div class="modal-content-outer">
          <div class="modal-content-inner">
            <div class="modal-content-body" ref="modalContentBodyRef">
              <!-- 내용 -->
              <ul class="competi-list" v-for="data in dataList" :key="data.seq">
                <li>
                  <a href="javascript:void(0)" @click="selectDetailClick($event,data)" @touchend="selectDetailClick($event,data)" @touchmove="selectTouchClick">
                    <div class="competi-pic"><img :src="data.contestImage" alt="" /></div>
                    <div class="competi-info-outer">
                      <strong>{{data.noti}}</strong>
                      <ul>
                        <li><span>주최 :</span> {{data.host}}</li>
                        <li><span>분야 :</span> {{data.field}}</li>
                        <li><span>기간 :</span> {{data.startDate}} ~ {{data.endDate}}</li>
                        <li><span>대상 :</span> {{data.target}}</li>
                        <li><span>상금 :</span>  {{data.money}}</li>
                      </ul>
                    </div>
                  </a>
                </li>
              </ul>
              <!-- //내용 -->
            </div>
          </div>
          <div class="cite">대티즌닷컴(www.detizen.com)에서 제공하는 정보입니다</div>
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

//대외활동 컴포넌트
export default {
  name: "ExtrnlAct",
  components: {

  },
  setup(props,context){
    const storeData = useStore();
    const routeData = useRoute();
    let activeYn =ref(false);
    let saveStatsCd =ref("");
    let dataList = ref([]);
    let modalContentBodyRef =ref();
    let subDetailItem =ref({});
    let isScrolling = false;

    onBeforeMount(async ()=>{
      //comment
    });

    onMounted(()=>{
      //comment
    });

    onUnmounted(()=>{
      isScrolling = false;
    });

    //대외활동 상세정보를 클릭했을 때
    const connectInitFunc = async (subItem)=> {
      subDetailItem.value=subItem;
      isScrolling = false;

      setTimeout(()=>{
        activeYn.value=true;
        modalContentBodyRef.value.scrollTop=0
      },200);
      dataList.value=storeData.state.dataStore.outSideStateList;
     }

    const selectCloseClick = (event)=>{
      event.preventDefault();
      activeYn.value=false;
      isScrolling = false;
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"extrnlActListState","stateYn":false});
      context.emit("close");
    }

    const selectDetailClick = (event,pData)=>{
      event.preventDefault();

      if (isScrolling==false){
        let returnObject=pData;
        returnObject.subTitle=subDetailItem.value.subTitle;

        CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,subDetailItem.value.statsCd);
        context.emit("selectDetailClickEvent",returnObject);
      }
      isScrolling=false;
    }

    const selectTouchClick = ($e)=>{
      // 스크롤 중인지 확인
      isScrolling = true;
    }

    return{
      activeYn,
      saveStatsCd,
      selectCloseClick,
      connectInitFunc,
      dataList,
      modalContentBodyRef,
      selectDetailClick,
      subDetailItem,
      selectTouchClick,

    }
  }
}
</script>