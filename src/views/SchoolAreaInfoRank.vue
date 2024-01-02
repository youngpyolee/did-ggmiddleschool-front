<template>
  <div data-schtab-content="3" class="active">
    <div class="rank-outer" :style="{'grid-template-columns': repeatCount}">
      <div v-show="hasSchoolTypeAreaCdFunc('A')">
        <h3>일반고</h3>
        <div class="rank-inner">
          <ol>
            <li :class="{'active':searchSelectAschulCd==data.schulCd}" v-for="(data,index) in highSchoolAlist" @touchmove="selectTouchClick"  @click="selectHighschoolSelectedClick($event,data.schulCd,'A')" @touchend="selectHighschoolSelectedClick($event,data.schulCd,'A')" v-show="index <20"><a href="javascript:void(0)"><span>{{index+1}}</span>{{ data.schulNm }}</a></li>
          </ol>
        </div>
      </div>
      <div v-show="hasSchoolTypeAreaCdFunc('C')">
        <h3>특성화고</h3>
        <div class="rank-inner">
          <ol>
            <li :class="{'active':searchSelectCschulCd==data.schulCd}" v-for="(data,index) in highSchoolClist" @touchmove="selectTouchClick" @click="selectHighschoolSelectedClick($event, data.schulCd,'C')" @touchend="selectHighschoolSelectedClick($event, data.schulCd,'C')" v-show="index <20"><a href="javascript:void(0)"><span>{{index+1}}</span>{{ data.schulNm }}</a></li>
          </ol>
        </div>
      </div>
      <div v-show="hasSchoolTypeAreaCdFunc('B')">
        <h3>자율고</h3>
        <div class="rank-inner">
          <ol>
            <li :class="{'active':searchSelectBschulCd==data.schulCd}" v-for="(data,index) in highSchoolBlist" @touchmove="selectTouchClick" @click="selectHighschoolSelectedClick($event,data.schulCd,'B')" @touchend="selectHighschoolSelectedClick($event,data.schulCd,'B')" v-show="index <20"><a href="javascript:void(0)"><span>{{index+1}}</span>{{ data.schulNm }}</a></li>
          </ol>
        </div>
      </div>
      <div v-show="hasSchoolTypeAreaCdFunc('D')">
        <h3>특수목적고</h3>
        <div class="rank-inner">
          <ol>
            <li :class="{'active':searchSelectDschulCd==data.schulCd}" v-for="(data,index) in highSchoolDlist" @touchmove="selectTouchClick"  @click="selectHighschoolSelectedClick($event,data.schulCd,'D')" @touchend="selectHighschoolSelectedClick($event,data.schulCd,'D')" v-show="index <20"><a href="javascript:void(0)"><span>{{index+1}}</span>{{ data.schulNm }}</a></li>
          </ol>
        </div>
      </div>
      <!--
       <div>
          <h3>학과</h3>
          <div class="rank-inner">
            <ol>
              <li :class="{'active':searchSelectSubjectCd==data.subjectCd}" v-for="(data,index) in subjectRankList" v-show="index <20"><a href="javascript:void(0)"><span>{{index+1}}</span>{{ data.subjectNm }}</a></li>
            </ol>
          </div>
        </div>
      -->
      <div v-show="hasSchoolTypeAreaCdFunc('E')">
        <h3>종합고</h3>
        <div class="rank-inner">
          <ol>
            <li :class="{'active':searchSelectEschulCd==data.schulCd}" v-for="(data,index) in highSchoolElist" @touchmove="selectTouchClick" @click="selectHighschoolSelectedClick($event,data.schulCd,'E')" @touchend="selectHighschoolSelectedClick($event,data.schulCd,'E')" v-show="index <20"><a href="javascript:void(0)"><span>{{index+1}}</span>{{ data.schulNm }}</a></li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {ref, onMounted, onUpdated, onUnmounted, onBeforeMount, computed} from 'vue';
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import CommonUtil from "@/util/CommonUtil";

export default {
  name: "SchoolAreaInfoRank",
  components: {},
  setup(props,context) {
    const storeData = useStore();
    const routeData = useRoute();
    let saveStatsCd=ref("");
    let highSchoolAlist = ref([]);
    let highSchoolBlist = ref([]);
    let highSchoolClist = ref([]);
    let highSchoolDlist = ref([]);
    let highSchoolElist = ref([]);
    let subjectRankList = ref([]);
    let searchSelectAschulCd = ref("");
    let searchSelectBschulCd = ref("");
    let searchSelectCschulCd = ref("");
    let searchSelectDschulCd = ref("");
    let searchSelectEschulCd = ref("");
    let searchSelectSubjectCd = ref("");
    let isScrolling = false;
    let displayList = ref([]);
    let repeatCount =ref("");

    onBeforeMount(async () => {
      isScrolling=false;
      let subItemList = CommonUtil.getConfigCompItemData(storeData.state.configStore.itemList,"SchoolAreaInfo").subItemList;
      displayList.value = CommonUtil.getConfigSubCompData(subItemList,"SchoolAreaInfoRank").displayList.split(",");
      repeatCount.value=`repeat(${displayList.value.length}, 1fr)`
    });

    onMounted(() => {
      //comment
    });

    onUnmounted(() => {
      isScrolling=false;
    });

    const hasSchoolTypeAreaCdFunc =(pSchoolTypeAreaCd)=> {
      let printResult=false;
      if (displayList.value.some(element => element === pSchoolTypeAreaCd)) {
        printResult=true;
      }

      return printResult;
    }

    const connectInitFunc = async (statsCd)=>{
      saveStatsCd.value=statsCd;
      isScrolling=false;
      selectRankListFunc();
    }

    //랭킹
    const selectRankListFunc =  ()=>{
      let searchUrl=CONFIG.LOCAL_API_URL+"/data/data_store/config_school_section_rank_A.json";
      let result = CommonUtil.ajaxGetAsyncJsonParamProc(searchUrl,null);

      result.then((response)=>{
        highSchoolAlist.value=response.data.dataList;
      });

      searchUrl=CONFIG.LOCAL_API_URL+"/data/data_store/config_school_section_rank_B.json";
      result = CommonUtil.ajaxGetAsyncJsonParamProc(searchUrl,null);
      result.then((response)=>{
        highSchoolBlist.value=response.data.dataList;
      });

      searchUrl=CONFIG.LOCAL_API_URL+"/data/data_store/config_school_section_rank_C.json";
      result = CommonUtil.ajaxGetAsyncJsonParamProc(searchUrl,null);
      result.then((response)=>{
        highSchoolClist.value=response.data.dataList;
      });

      searchUrl=CONFIG.LOCAL_API_URL+"/data/data_store/config_school_section_rank_D.json";
      result = CommonUtil.ajaxGetAsyncJsonParamProc(searchUrl,null);
      result.then((response)=>{
        highSchoolDlist.value=response.data.dataList;
      });

      searchUrl=CONFIG.LOCAL_API_URL+"/data/data_store/config_school_section_rank_E.json";
      result = CommonUtil.ajaxGetAsyncJsonParamProc(searchUrl,null);
      result.then((response)=>{
        highSchoolElist.value=response.data.dataList;
      });

      searchUrl=CONFIG.LOCAL_API_URL+"/data/data_store/config_school_subject_rank.json";
      result = CommonUtil.ajaxGetAsyncJsonParamProc(searchUrl,null);
      result.then((response)=>{
        subjectRankList.value=response.data.dataList;
      });
    }

    //고등학교 클릭시
    const selectHighschoolSelectedClick = async (event, schulCd, selectSection)=>{
      event.preventDefault()
      if (isScrolling ==false){
        if (selectSection=="A"){
          searchSelectAschulCd.value=schulCd;
        }
        else if (selectSection=="B"){
          searchSelectBschulCd.value=schulCd;
        }
        else if (selectSection=="C"){
          searchSelectCschulCd.value=schulCd;
        }
        else if (selectSection=="D"){
          searchSelectDschulCd.value=schulCd;
        }
        else if (selectSection=="E"){
          searchSelectEschulCd.value=schulCd;
        }

        let sendParam={"schulCd":schulCd , "searchDetailInfoType":"DA" , "searchInfoPositionType":"SchoolAreaInfoRank"};
        context.emit("selectSchoolOneEvent",sendParam);
      }

      isScrolling=false;
    }

    const selectTouchClick = ($e)=>{
      // 스크롤 중인지 확인
      isScrolling = true;
    }

    return {
      connectInitFunc,
      saveStatsCd,
      highSchoolAlist,
      highSchoolBlist,
      highSchoolClist,
      highSchoolDlist,
      highSchoolElist,
      subjectRankList,
      displayList,
      repeatCount,
      searchSelectAschulCd,
      searchSelectBschulCd,
      searchSelectCschulCd,
      searchSelectDschulCd,
      searchSelectEschulCd,
      searchSelectSubjectCd,
      hasSchoolTypeAreaCdFunc,
      selectHighschoolSelectedClick,
      selectTouchClick,
    }
  }
}
</script>
