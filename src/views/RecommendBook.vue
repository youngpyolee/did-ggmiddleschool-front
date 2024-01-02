<template>
  <div :class="{'modal-outer':true,'active':activeYn==true}" >
    <div class="modal-inner">
      <div class="modal-title">추천도서</div>
      <div class="modal-body">
        <div class="modal-content-outer">
          <div class="modal-content-inner">
            <div class="modal-content-body" ref="modalContentBodyRef">
              <!-- 내용 -->
              <ul class="book-list">
                <li :class="{'active':data.snno==selectedSnno}" v-for="data in dataList" :key="data.snno">
                  <div class="item-outer">
                    <div class="book-pic">
                      <img :src="data.titleImg" alt="" />
                    </div>
                    <div class="book-info" @click="selectMoreClick($event,data.snno)" @touchend="selectMoreClick($event,data.snno)" @touchmove="selectTouchClick">
                      <strong>{{ data.title }}</strong>
                      <div class="by"><span>저자 : {{ data.authr }}</span><span> 출판사 : {{ data.plscmpn }}</span></div>
                      <div class="more-info">{{ data.contents }}</div>
                      <div class="expand" >
                        <span>더보기</span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <!-- //내용 -->
            </div>
          </div>
          <div class="cite">경북독서친구(bookfriend.info.go.kr)에서 제공하는 정보입니다.</div>
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

//추천도서 컴포넌트
export default {
  name: "RecommendBook",
  components: {

  },
  setup(props,context){
    const storeData = useStore();
    const routeData = useRoute();
    let activeYn =ref(false);
    let saveStatsCd =ref("");
    let dataList = ref([]);
    let modalContentBodyRef =ref();
    let selectedSnno=ref("");
    let isScrolling = false;

    onBeforeMount(async ()=>{
      //comment
    });

    onMounted(()=>{
      //comment
    });

    onUnmounted(()=>{
      selectedSnno.value=""
    });

    //신직업 상세정보를 클릭했을 때
    const connectInitFunc = async (pSaveStatsCd)=> {
      saveStatsCd.value=pSaveStatsCd;
      isScrolling=false;
      setTimeout(()=>{
        activeYn.value=true;
        modalContentBodyRef.value.scrollTop=0
      },200);
      let bookFrame =storeData.state.dataStore.recommendBookDataFrame;
      let todayMonthStr=CommonUtil.getToday().substring(4,6)
      bookFrame =bookFrame.loc({rows:bookFrame["readMonth"].eq(todayMonthStr)});
      dataList.value = CommonUtil.dataFrameListToJson(bookFrame);
      selectedSnno.value=""
     }

    const selectCloseClick = (event)=>{
      event.preventDefault();

      activeYn.value=false;
      isScrolling=false;
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"recommendBookState","stateYn":false});
      context.emit("close");
    }

    const selectMoreClick = (event,selectSnno)=>{
      event.preventDefault();
      if (isScrolling==false){
        if (selectSnno == selectedSnno.value){
          selectedSnno.value="";
        }else{
          selectedSnno.value=selectSnno;
        }
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
      selectedSnno,
      selectMoreClick,
      selectTouchClick,
    }
  }
}
</script>