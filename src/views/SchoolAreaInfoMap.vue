<template>
  <div data-schtab-content="1" class="active">
    <div class="map-outer">
      <div class="map-inner">
        <!-- 아이콘 -->
        <div :class="{'icon-map':true, 'active':sectionData.areaCd==searchWorkAreaCd}" :data-map="sectionData.areaNm"  :data-name="sectionData.areaNm" v-show="sectionData.totalCnt !='0' || sectionData.areaCd ==initSearchWorkAreaCd" v-for="(sectionData,index) in sectionSchoolList"
             @click="selectMapClick($event, sectionData.areaCd,sectionData.areaNm)"
             @touchend="selectMapClick($event, sectionData.areaCd,sectionData.areaNm)">
          <div>{{sectionData.areaNm}}</div>
          <span>{{sectionData.totalCnt}}</span>
        </div>
        <object type="image/svg+xml" :data="svgUrl" :class="{'map-sch':true, '부천':schoolTypeClass=='부천', '경기':schoolTypeClass=='경기'}" ref="mapSvgRef" id="mapSvgRefId" ></object>
      </div>
    </div>
    <div class="map-distance">
      <div :class="{'active':searchHowSection =='distance'}" @click="selectHowSectionListClick($event,'distance')" @touchend="selectHowSectionListClick($event,'distance')">거리순</div>
      <div :class="{'active':searchHowSection =='search'}"   @click="selectHowSectionListClick($event,'search')"   @touchend="selectHowSectionListClick($event,'search')">조회순</div>
      <div :class="{'active':searchHowSection =='name'}"     @click="selectHowSectionListClick($event,'name')"     @touchend="selectHowSectionListClick($event,'name')">가나다순</div>
    </div>
    <!-- 고등학교 지도 end -->
    <div class="scroll-outer">
      <!-- sch-list start -->
      <div class="sch-list" >
        <div class="sch-list-item" v-for="(data,index) in areaHighschoolList"  @click="selectHighschoolSelectedClick($event, data.schulCd)" @touchend="selectHighschoolSelectedClick($event, data.schulCd)" @touchmove="selectTouchClick">
          <div class="pic">
            <span class="num">{{index+1}}</span>
            <a href="javascript:void(0)" v-if="data.thumbImgNmUrl.indexOf('http') >=0"><img :src="data.thumbImgNmUrl" alt="" /></a>
            <a href="javascript:void(0)" v-else><img :src="localApiUrl+data.thumbImgNmUrl" alt="" /></a>
          </div>
          <div class="sch-name">{{data.schulNm}}</div>
        </div>
      </div>

      <!-- 고등학교 지도 end -->
    </div>
  </div>
</template>
<script>
import { ref,onMounted,onUpdated,onUnmounted,onBeforeMount,computed } from 'vue';
import { useStore } from "vuex";
import {useRoute} from "vue-router";
import CommonUtil   from "@/util/CommonUtil";
import HighschoolUtil   from "@/util/HighschoolUtil";

export default {
  name: "SchoolAreaInfoMap",
  setup(props,context){
    const storeData = useStore();
    const routeData = useRoute();
    let sectionSchoolList = ref([]); //지도에 그려질 학교 수
    let areaHighschoolList = ref([]); //검색방법에 따른 고등학교 목록
    let searchSchoolSection = ref(""); //고등학교,일반고,특목고인지 구분
    let searchWorkAreaCd = ref("");
    let searchWorkSubAreaCd = ref("");
    let searchWorkMastgerAreaCd=ref("")
    let searchHowSection =ref(""); //거리순,조회순,가나다순 조회방법
    let subSaveStatsCd = ref("");
    let mapSvgRef =ref();
    let schoolSvg=null;
    let searchAreaNm= ""
    let searchStartYn=ref(true);
    let isScrolling = false;
    let localApiUrl = ref("");
    let svgUrl = ref("");
    let schoolTypeClass = ref("");
    let initSearchWorkAreaCd=ref("")


    onBeforeMount(async ()=>{
      console.log("SchoolAreaImomap beforemount")
      sectionSchoolList.value=[];
      searchWorkAreaCd.value="";
      areaHighschoolList.value=[];
      searchHowSection.value="distance";
      searchAreaNm=""
      localApiUrl.value=CONFIG.LOCAL_API_URL;
      schoolTypeClass.value="";
      searchWorkMastgerAreaCd.value=""
      initSearchWorkAreaCd.value="";
    });

    onMounted( ()=>{
      console.log("SchoolAreaImomap onmount")

    });

    onUnmounted(()=>{
      connectOutFunc();
    });

    //svg지도 클릳ㄱ시
    const selectMapClick = async (event ,pSearchWorkAreaCd,pSearchAreaNm)=>{
      event.preventDefault();
      searchWorkAreaCd.value = pSearchWorkAreaCd;
      searchAreaNm = pSearchAreaNm;

      schoolSvg.querySelectorAll("[id]").forEach((ele)=>{
        ele.classList.remove("active")
      })
      schoolSvg.getElementById(searchAreaNm).classList.add("active");

      //통계처리
      CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,subSaveStatsCd.value);
      let result = await  highschoolSelectListFunc();
    }

    //고등학교구분,통계코드,지역코드
    //const connectInitFunc =  async (schoolSelectionType , pSchoolTypeSvg,  pSchoolTypeMapCntUrl, pSearchHowComp , statsCd , pSchoolTypeAreaCd, startYn)=>{
    const connectInitFunc =  async (pSearchSection,schoolSelectObj,pSearchHowComp , statsCd , startYn)=>{
      console.log("SchoolAreaImomap connectInitFunc")

      isScrolling=false;
      schoolTypeClass.value=schoolSelectObj.schoolTypeClass;
      searchSchoolSection.value=pSearchSection;
      svgUrl.value=schoolSelectObj.schoolTypeSvg;

      if (CommonUtil.replaceNull(schoolSelectObj.schoolTypeAreaCd) !=""){
        searchWorkAreaCd.value=schoolSelectObj.schoolTypeAreaCd;
      }

      initSearchWorkAreaCd.value=searchWorkAreaCd.value;

      searchStartYn.value=startYn;
      let jsonUrl = CONFIG.LOCAL_API_URL+schoolSelectObj.schoolTypeMapCntUrl;
      let result =  await CommonUtil.ajaxGetSyncJsonProc(jsonUrl,null);
      if (result.result=="Y") {
        sectionSchoolList.value= HighschoolUtil.getSectionAreaCntList(schoolSelectObj.schoolTypeCd,result.data);
      }

      let searchAreaIndex = sectionSchoolList.value.findIndex((secdata)=>{
        if (secdata.areaCd == searchWorkAreaCd.value){
          searchAreaNm=secdata.areaNm;
          return true;
        }
      });


      let svgObj = mapSvgRef.value;
      svgObj.onload = ()=>{
        schoolSvg = svgObj.contentDocument;
        schoolSvg.oncontextmenu = (e)=>{
          e.preventDefault();
        }
        schoolSvg.querySelectorAll("[id]").forEach((ele)=>{
          ele.classList.remove("active")
        });
        schoolSvg.getElementById(searchAreaNm).classList.add("active");
      }
       //setTimeout(()=>{
         /*console.log("svg onload")
         schoolSvg = svgObj.contentDocument;
         schoolSvg.oncontextmenu = (e)=>{
           e.preventDefault();
         }
         schoolSvg.querySelectorAll("[id]").forEach((ele)=>{
           ele.classList.remove("active")
         });
         schoolSvg.getElementById(searchAreaNm).classList.add("active");*/
      // },100);

      let highschoolResult = await highschoolSelectListFunc();
    }

    //고등학교 목록 클릭시
    const selectHighschoolSelectedClick = (event, schulCd)=>{
      event.preventDefault();
      if (isScrolling == false){
        let sendParam={"schulCd":schulCd,"searchDetailInfoType":"DA","searchInfoPositionType":"SchoolAreaInfoMap"}
        context.emit("selectSchoolOneEvent",sendParam);
      }

      isScrolling =false;
    }

    const connectOutFunc = ()=>{
      sectionSchoolList.value=[];
      searchWorkAreaCd.value="";
      areaHighschoolList.value=[];
      searchHowSection.value="";
      subSaveStatsCd.value="";
      svgUrl.value=""
    }

    const svgFirstInit=(svgUrl)=>{

    }

    const selectTouchClick = ($e)=>{
      // 스크롤 중인지 확인
      isScrolling = true;
    }

    //거리순,조회순,가나다순 클릭시
    const selectHowSectionListClick = async (event,howSectionParam)=>{
      event.preventDefault()
      CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,subSaveStatsCd.value);
      searchHowSection.value=howSectionParam;
      let result = await highschoolSelectListFunc()
    }

    //고등학교 목록 조회 함수
    const highschoolSelectListFunc = async ()=>{
      let result="Y";
      let fileName="";
      let dataUrl="";
      //거리순일 경우
      if (searchHowSection.value=="distance"){
        fileName="config_school_distance_"+storeData.state.configStore.didCd+"_"+searchWorkAreaCd.value+"_"+searchSchoolSection.value+".json";
        dataUrl =  CONFIG.LOCAL_API_URL+storeData.state.configStore.fileSaveDir+"/"+fileName;
      }

      //조회순 config_school_count_47110_C
      else if(searchHowSection.value=="search"){
        fileName="config_school_count_"+searchWorkAreaCd.value+"_"+searchSchoolSection.value+".json";
        dataUrl =  CONFIG.LOCAL_API_URL+storeData.state.configStore.fileSaveDir+"/"+fileName;
      }
      //이름순 config_school_schulnm_47940_D
      else if(searchHowSection.value=="name"){
        fileName="config_school_schulnm_"+searchWorkAreaCd.value+"_"+searchSchoolSection.value+".json";
        dataUrl =  CONFIG.LOCAL_API_URL+storeData.state.configStore.fileSaveDir+"/"+fileName;
      }

      let resultData = await CommonUtil.ajaxGetSyncJsonProc(dataUrl);
      areaHighschoolList.value=[];
      if (resultData.result=="Y"){
        if (resultData.data.totalCnt >0){
          areaHighschoolList.value=resultData.data.dataList;
        }
      }else{
        result="N"
      }
      return result;
    }

    return{
      connectInitFunc,
      connectOutFunc,
      sectionSchoolList,
      areaHighschoolList,
      searchWorkAreaCd,
      searchSchoolSection,
      selectMapClick,
      subSaveStatsCd,
      searchHowSection,
      mapSvgRef,
      searchStartYn,
      searchWorkMastgerAreaCd,
      searchWorkSubAreaCd,
      selectTouchClick,
      selectHowSectionListClick,
      selectHighschoolSelectedClick,
      localApiUrl,
      svgUrl,
      schoolTypeClass,
      svgFirstInit,
      initSearchWorkAreaCd,
    }
  }
}
</script>
