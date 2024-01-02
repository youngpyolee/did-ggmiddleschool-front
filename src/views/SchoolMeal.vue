<template>
  <div :class="{'modal-outer':true,'active':activeYn==true}" data-index="1">
    <div class="modal-inner">
      <div class="modal-title">{{ subDetailData.subTitle }}</div>
      <div class="modal-body">
        <div class="modal-content-outer">
          <div class="modal-content-inner" style="background-color: #e7eaf7">
            <!-- 내용 -->
            <div class="modal-content-body" ref="modalContentBodyRef">
              <div class="food-wrap">
                <div class="card-outer" v-for="data in dataList" :key="data.mlsvYmd">
                  <div class="date">{{data.displayMlsYmd}}</div>
                  <div class="card-inner">
                    <div v-if="data.mornFood">
                      <div class="food-time">[아침]</div>
                      <ul class="food-data">
                        <li v-for="foodData in (data.mornFood.split('<br/>'))">{{foodData}}</li>
                      </ul>
                    </div>
                    <div v-if="data.lunchFood">
                      <div class="food-time">[점심]</div>
                      <ul class="food-data">
                        <li v-for="foodData in (data.lunchFood.split('<br/>'))">{{foodData}}</li>
                      </ul>
                    </div>
                    <div v-if="data.dinnerFood">
                      <div class="food-time">[저녁]</div>
                      <ul class="food-data">
                        <li v-for="foodData in (data.dinnerFood.split('<br/>'))">{{foodData}}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- // 내용 -->
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
import { ref,onMounted,onUpdated,onUnmounted,onBeforeMount,computed } from 'vue';
import { useStore } from "vuex";
import {useRoute} from "vue-router";
import CommonUtil   from "@/util/CommonUtil";
import commonUtil from "@/util/CommonUtil";

//게시판 컴포넌트
export default {
  name: "SchoolMeal",
  components: {

  },
  setup(props,context){
    const storeData = useStore();
    const routeData = useRoute();
    let activeYn =ref(false);
    let saveStatsCd =ref("");
    let modalContentBodyRef =ref();
    let dataList = ref([]);
    let subDetailData = ref({})


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
    const connectInitFunc = async (subData)=> {
      saveStatsCd.value=subData.statsCd;
      subDetailData.value=subData;
      setTimeout(()=>{
        activeYn.value=true;
        modalContentBodyRef.value.scrollTop=0
      },200);

      let sendDataurl = subData.dataUrl;
      if (sendDataurl.indexOf("http") < 0){
        sendDataurl = CONFIG.LOCAL_API_URL+sendDataurl;
      }

      selectDataProcFunc(sendDataurl)
    }

    const selectDataProcFunc = (subDataUrl)=>{
      let dataResult = CommonUtil.ajaxGetAsyncJsonParamProc(subDataUrl,null);
      dataResult.then((response)=>{
        dataList.value=response.data;
      });
    }



    const selectCloseClick = (event)=>{
      event.preventDefault();
      activeYn.value=false;
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"schoolMealState","stateYn":false});
      context.emit("close");
    }

    return{
      activeYn,
      saveStatsCd,
      selectCloseClick,
      connectInitFunc,
      modalContentBodyRef,
      dataList,
      subDetailData,

    }
  }
}
</script>