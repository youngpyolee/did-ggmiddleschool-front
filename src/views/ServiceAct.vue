<template>
  <div :class="{'modal-outer':true,'active':activeYn==true}" >
      <div class="modal-inner">
        <div class="modal-title">봉사활동</div>
        <div class="modal-body">
          <div class="modal-content-outer">
            <div class="modal-content-inner">
              <!-- 내용 -->
              <div class="modal-content-body" ref="modalContentBodyRef">
                <ul class="service-list">

                  <li v-for="data in dataList" :key="data.serviceActCd">
                    <div class="info-head">
                      <div class="location">{{ data.displayAreaNm }}</div>
                      <div class="part">{{ data.actTypeNm }}</div>
                      <div class="time">{{ data.actTime }}</div>
                    </div>
                    <div class="info-outer">
                      <strong>{{ data.title }}</strong>
                      <ul>
                        <li><strong>{{ data.auspc }}</strong></li>
                        <li><span>모집교급 :</span> {{ data.rcritSchul }}</li>
                        <li><span>활동일시 : </span>{{ data.actDt }}</li>
                        <li><span>활동장소 :</span> {{ data.actPlace }}</li>
                      </ul>
                    </div>
                    <div class="remain">
                      <!--
                      <div class="top">
                        <strong>2</strong>
                        <span>잔여</span>
                      </div>-->
                      <div class="bottom">
                        <strong>{{ data.rcritNmpr }}</strong>
                        <span>모집</span>
                      </div>
                    </div>
                  </li>

                </ul>
                <!-- //내용 -->
              </div>
            </div>
            <div class="cite">청소년활동정보서비스(www.youth.go.kr)에서 제공하는 정보입니다.</div>
          </div>
          <div class="modal-close-outer"><a href="javascript:void(0)"  @click="selectCloseClick($event)" @touchend="selectCloseClick($event)"><div class="btn-modal-close">닫기</div></a></div>
        </div>
      </div>
    </div>
</template>
<script>
import { ref,onMounted,onUpdated,onUnmounted,onBeforeMount,computed } from 'vue';
import { useStore } from "vuex";
import {useRoute} from "vue-router";
import CommonUtil   from "@/util/CommonUtil";

//봉사활동 컴포넌트
export default {
  name: "ServiceAct",
  components: {

  },
  setup(props,context){
    const storeData = useStore();
    const routeData = useRoute();
    let activeYn =ref(false);
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
      //comment
    });

    //신직업 상세정보를 클릭했을 때
    const connectInitFunc = async (pSaveStatsCd)=> {
      saveStatsCd.value=pSaveStatsCd;
      setTimeout(()=>{
        activeYn.value=true;
        modalContentBodyRef.value.scrollTop=0;
      },200);
      dataList.value=storeData.state.dataStore.serviceActStateList;

     }

    const selectCloseClick = (event)=>{
      event.preventDefault();
      activeYn.value=false;
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"serviceActPopState","stateYn":false});
      context.emit("close");
    }

    return{
      activeYn,
      saveStatsCd,
      selectCloseClick,
      connectInitFunc,
      dataList,
      modalContentBodyRef

    }
  }
}
</script>