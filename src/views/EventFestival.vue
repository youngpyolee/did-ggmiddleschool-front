<template>
  <div :class="{'modal-outer':true,'active':activeYn==true}" >
    <div class="modal-inner">
      <div class="modal-title">행사·축제</div>
      <div class="modal-body" >
        <div class="modal-content-outer" >
          <div class="modal-content-inner">
            <div class="modal-content-body" ref="modalContentBodyRef">
              <!-- 내용 -->
              <ul class="competi-list nolink" >
                <li v-for="data in dataList" :key="data.snno" @click="selectFestivalDetailClick($event,data.snno)" @touchend="selectFestivalDetailClick($event,data.snno)" @touchmove="selectTouchClick">
                  <div class="competi-pic"><img :src="data.titleImg" alt="" /></div>
                  <div class="competi-info-outer">
                    <strong>{{data.title}}</strong>
                    <ul>
                      <li><span>주소 :</span> {{data.addr}}</li>
                      <li><span>기간 :</span> {{data.beginDt}} ~ {{data.endDt}}</li>
                      <li><span>문의처:</span> {{data.refrnc}}</li>
                    </ul>
                  </div>
                </li>
              </ul>
              <!-- //내용 -->
            </div>
          </div>
          <div class="cite">문화포털(www.culture.go.kr)에서 제공하는 정보입니다.</div>
        </div>
        <div class="modal-close-outer"><a href="javascript:void(0)" @click="selectCloseClick($event)" @touchend="selectCloseClick($event)"><div class="btn-modal-close">닫기</div></a></div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref,onMounted,onUpdated,onUnmounted,onBeforeMount,computed } from 'vue';
import { useStore } from "vuex";
import {useRoute} from "vue-router";
import CommonUtil   from "@/util/CommonUtil";

//이벤트축제 컴포넌트
export default {
  name: "EventFestival",
  components: {

  },
  setup(props,context){
    const storeData = useStore();
    const routeData = useRoute();
    let activeYn =ref(false);
    let isScrolling = false;
    let saveStatsCd =ref("");
    let dataList = ref([]);
    let modalContentBodyRef =ref();

    onBeforeMount(async ()=>{
      //comment
    });

    onMounted(()=>{
      //comment
    });

    onUnmounted(()=>{
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"eventFestivalState","stateYn":false});
      isScrolling=false;
    });

    //신직업 상세정보를 클릭했을 때
    const connectInitFunc = async (pSaveStatsCd)=> {
      saveStatsCd.value=pSaveStatsCd;
      isScrolling=false;
      setTimeout(()=>{
        activeYn.value=true;
        modalContentBodyRef.value.scrollTop=0;
      },200);
      dataList.value=storeData.state.dataStore.tourStateList;
    }

    const selectCloseClick = (event)=>{
      event.preventDefault();
      activeYn.value=false;
      isScrolling=false;
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"eventFestivalState","stateYn":false});
      context.emit("close");
    }

    //행사축데목록에서 상세를 클릭했을경우
    const selectFestivalDetailClick =(event,pSnno)=>{
      event.preventDefault();
      if (isScrolling==false){
        let returnObject={}
        let fIndex = dataList.value.find((data)=>{
          if (data.snno ==pSnno){
            returnObject=data;
            return true;
          }
        });

        CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,saveStatsCd.value);
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
      selectFestivalDetailClick,
      selectTouchClick,

    }
  }
}
</script>