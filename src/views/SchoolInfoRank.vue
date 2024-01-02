<template>
  <div data-schtab-content="3" class="active">
    <div class="rank-outer">
      <div>
        <h3>일반고</h3>
        <div class="rank-inner">
          <ol>
            <li :class="{'active':searchSelectAschulCd==data.schulCd}" v-for="(data,index) in highschoolAlist" @touchmove="selectTouchClick"  @click="selectHighschoolSelectedClick($event,data.schulCd,'A')" @touchend="selectHighschoolSelectedClick($event,data.schulCd,'A')" v-show="index <20"><a href="javascript:void(0)"><span>{{index+1}}</span>{{ data.schulNm }}</a></li>
          </ol>
        </div>
      </div>
      <div>
        <h3>특성화고</h3>
        <div class="rank-inner">
          <ol>
            <li :class="{'active':searchSelectCschulCd==data.schulCd}" v-for="(data,index) in highschoolClist" @touchmove="selectTouchClick" @click="selectHighschoolSelectedClick($event, data.schulCd,'C')" @touchend="selectHighschoolSelectedClick($event, data.schulCd,'C')" v-show="index <20"><a href="javascript:void(0)"><span>{{index+1}}</span>{{ data.schulNm }}</a></li>
          </ol>
        </div>
      </div>
      <div>
        <h3>자율고</h3>
        <div class="rank-inner">
          <ol>
            <li :class="{'active':searchSelectBschulCd==data.schulCd}" v-for="(data,index) in highschoolBlist" @touchmove="selectTouchClick" @click="selectHighschoolSelectedClick($event,data.schulCd,'B')" @touchend="selectHighschoolSelectedClick($event,data.schulCd,'B')" v-show="index <20"><a href="javascript:void(0)"><span>{{index+1}}</span>{{ data.schulNm }}</a></li>
          </ol>
        </div>
      </div>
      <div>
        <h3>특수목적고</h3>
        <div class="rank-inner">
          <ol>
            <li :class="{'active':searchSelectDschulCd==data.schulCd}" v-for="(data,index) in highschoolDlist" @touchmove="selectTouchClick" @click="selectHighschoolSelectedClick($event,data.schulCd,'D')" @touchend="selectHighschoolSelectedClick($event,data.schulCd,'D')" v-show="index <20"><a href="javascript:void(0)"><span>{{index+1}}</span>{{ data.schulNm }}</a></li>
          </ol>
        </div>
      </div>
      <div>
        <h3>학과</h3>
        <div class="rank-inner">
          <ol>
            <li :class="{'active':searchSelectSubjectCd==data.subjectCd}" v-for="(data,index) in subjectRankList" v-show="index <20"><a href="javascript:void(0)"><span>{{index+1}}</span>{{ data.subjectNm }}</a></li>
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
  name: "SchoolInfoRank",
  components: {},
  setup(props,context) {
    const storeData = useStore();
    const routeData = useRoute();
    let saveStatsCd=ref("");
    let highschoolAlist = ref([]);
    let highschoolBlist = ref([]);
    let highschoolClist = ref([]);
    let highschoolDlist = ref([]);
    let subjectRankList = ref([]);
    let searchSelectAschulCd = ref("")
    let searchSelectBschulCd = ref("")
    let searchSelectCschulCd = ref("")
    let searchSelectDschulCd = ref("")
    let searchSelectSubjectCd = ref("");
    let isScrolling = false;

    onBeforeMount(async () => {
      isScrolling=false;
    });

    onMounted(() => {
      //comment
    });

    onUnmounted(() => {
      isScrolling=false;
    });

    const connectInitFunc = async (statsCd)=>{
      saveStatsCd.value=statsCd;
      isScrolling=false;
      selectRankListFunc();
    }


    const selectRankListFunc =  ()=>{
      let searchUrl=CONFIG.LOCAL_API_URL+"/data/data_store/config_school_section_rank_A.json";
      let result = CommonUtil.ajaxGetAsyncJsonParamProc(searchUrl,null);
      result.then((response)=>{
        highschoolAlist.value=response.data.dataList
      });

      searchUrl=CONFIG.LOCAL_API_URL+"/data/data_store/config_school_section_rank_B.json";
      result = CommonUtil.ajaxGetAsyncJsonParamProc(searchUrl,null);
      result.then((response)=>{
        highschoolBlist.value=response.data.dataList
      });

      searchUrl=CONFIG.LOCAL_API_URL+"/data/data_store/config_school_section_rank_C.json";
      result = CommonUtil.ajaxGetAsyncJsonParamProc(searchUrl,null);
      result.then((response)=>{
        highschoolClist.value=response.data.dataList
      });

      searchUrl=CONFIG.LOCAL_API_URL+"/data/data_store/config_school_section_rank_D.json";
      result = CommonUtil.ajaxGetAsyncJsonParamProc(searchUrl,null);
      result.then((response)=>{
        highschoolDlist.value=response.data.dataList
      });

      searchUrl=CONFIG.LOCAL_API_URL+"/data/data_store/config_school_subject_rank.json";
      result = CommonUtil.ajaxGetAsyncJsonParamProc(searchUrl,null);
      result.then((response)=>{
        subjectRankList.value=response.data.dataList
      });
    }

    //고등락교 클릭시
    const selectHighschoolSelectedClick = async (event, schulCd,selectSection)=>{
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

        let sendParam={"schulCd":schulCd,"searchInfoType":"A","searchInfoPositionType":"SchoolInfoRank"}
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
      highschoolAlist,
      highschoolBlist,
      highschoolClist,
      highschoolDlist,
      subjectRankList,
      searchSelectAschulCd,
      searchSelectBschulCd,
      searchSelectCschulCd,
      searchSelectDschulCd,
      searchSelectSubjectCd,
      selectHighschoolSelectedClick,
      selectTouchClick,
    }
  }
}
</script>
