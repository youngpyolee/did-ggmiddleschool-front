<template>
  <div data-schtab-content="1" class="active">
    <div class="map-outer">
      <div class="map-inner">
        <!-- 아이콘 -->
        <div :class="{'icon-map':true, 'active':sectionData.areaCd==searchWorkAreaCd}" :data-map="sectionData.areaNm" v-for="(sectionData,index) in sectionSchoolList" @click="selectMapClick($event, sectionData.areaCd,sectionData.areaNm)" @touchend="selectMapClick($event, sectionData.areaCd,sectionData.areaNm)">
          <div>{{sectionData.areaNm}}</div>
          <span>{{sectionData.totalCnt}}</span>
        </div>

        <object type="image/svg+xml" data="/data/images/svg/경기도.svg" class="map-sch 경기" ref="mapSvgRef" id="mapSvgRefId" ></object>
      </div>
    </div>
    <div class="map-distance">
      <div :class="{'active':searchHowSection =='A'}" @click="selectHowListClick($event,'A')" @touchend="selectHowListClick($event,'A')">거리순</div>
      <div :class="{'active':searchHowSection =='B'}" @click="selectHowListClick($event,'B')" @touchend="selectHowListClick($event,'B')">조회순</div>
      <div :class="{'active':searchHowSection =='C'}" @click="selectHowListClick($event,'C')" @touchend="selectHowListClick($event,'C')">가나다순</div>
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
  name: "SchoolInfoMap",
  setup(props,context){
    const storeData = useStore();
    const routeData = useRoute();
    let sectionSchoolList = ref([]); //지도에 그려질 학교 수
    let areaHighschoolList = ref([]); //검색방법에 따른 고등학교 목록
    let searchSection = ref("");
    let searchWorkAreaCd = ref("");
    let searchHowSection =ref(""); //거리순,조회순,가나다순 조회방법
    let subSaveStatsCd = ref("");
    let mapSvgRef =ref();
    let schoolSvg=null;
    let searchAreaNm= ""
    let searchStartYn=ref(true);
    let isScrolling = false;
    let localApiUrl = ref("")

    onBeforeMount(async ()=>{
      sectionSchoolList.value=[];
      searchWorkAreaCd.value="";
      areaHighschoolList.value=[];
      searchHowSection.value="A";
      searchAreaNm=""
      localApiUrl.value=CONFIG.LOCAL_API_URL;

    });

    onMounted( ()=>{
      let obj = mapSvgRef.value;
      obj.onload = () => {
        schoolSvg = obj.contentDocument;
        schoolSvg.oncontextmenu = (e)=>{
          e.preventDefault();
        }
      }
    });

    onUnmounted(()=>{
      connectOutFunc();
    });

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

    //고등학교 목록 조회 함수
    const highschoolSelectListFunc = async ()=>{
      let result="Y";
      let fileName="";
      let dataUrl="";
      //거리순일 경우
      if (searchHowSection.value=="A"){
        fileName="config_school_distance_"+storeData.state.configStore.didCd+"_"+searchWorkAreaCd.value+"_"+searchSection.value+".json";
        dataUrl =  CONFIG.LOCAL_API_URL+storeData.state.configStore.fileSaveDir+"/"+fileName;
      }

      //조회순 config_school_count_47110_C
      else if(searchHowSection.value=="B"){
        fileName="config_school_count_"+searchWorkAreaCd.value+"_"+searchSection.value+".json";
        dataUrl =  CONFIG.LOCAL_API_URL+storeData.state.configStore.fileSaveDir+"/"+fileName;
      }
      //이름순 config_school_schulnm_47940_D
      else if(searchHowSection.value=="C"){
        fileName="config_school_schulnm_"+searchWorkAreaCd.value+"_"+searchSection.value+".json";
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

    //고등학교구분,통계코드,지역코드
    const connectInitFunc =  async (pSearchSection,areaCd,howSection,statsCd)=>{
      isScrolling=false;
      if ( CommonUtil.replaceNull(pSearchSection) !=""){
        searchSection.value=pSearchSection;
      }

      if ( CommonUtil.replaceNull(areaCd) !=""){
        searchWorkAreaCd.value=areaCd;
      }

      if ( CommonUtil.replaceNull(howSection) !=""){
        searchHowSection.value=howSection;
      }

      if ( CommonUtil.replaceNull(statsCd) !=""){
        subSaveStatsCd.value=statsCd;
      }

      sectionSchoolList.value= HighschoolUtil.getSectionAreaCntList(pSearchSection,storeData.state.dataStore.highschoolCntList);

      let highschoolResult = await highschoolSelectListFunc();
      let index = sectionSchoolList.value.findIndex((secdata)=>{
        if (secdata.areaCd == searchWorkAreaCd.value){
          searchAreaNm=secdata.areaNm;
          return true;
        }
      })

      if (searchStartYn.value==true){
        setTimeout(()=>{
          schoolSvg.querySelectorAll("[id]").forEach((ele)=>{
            ele.classList.remove("active")
          });
          schoolSvg.getElementById(searchAreaNm).classList.add("active");
        },150);
        searchStartYn.value=false;
      }else{
        schoolSvg.querySelectorAll("[id]").forEach((ele)=>{
          ele.classList.remove("active")
        });
        schoolSvg.getElementById(searchAreaNm).classList.add("active");
      }
    }

    const connectOutFunc = ()=>{
      sectionSchoolList.value=[];
      searchWorkAreaCd.value="";
      areaHighschoolList.value=[];
      searchHowSection.value="A";
      subSaveStatsCd.value="";
    }

    //거리순,조회순,가나다순 클릭시
    const selectHowListClick = async (event,howSectionParam)=>{
      event.preventDefault()
      CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,subSaveStatsCd.value);
      searchHowSection.value=howSectionParam;
      let result = await highschoolSelectListFunc()
    }

    //고등락교 클릭시
    const selectHighschoolSelectedClick = async (event,schulCd)=>{
      event.preventDefault();
      if (isScrolling == false){
        let sendParam={"schulCd":schulCd,"searchInfoType":"A","searchInfoPositionType":"SchoolInfoMap"}
        context.emit("selectSchoolOneEvent",sendParam);
      }

      isScrolling =false;
    }

    const selectTouchClick = ($e)=>{
      // 스크롤 중인지 확인
      isScrolling = true;
    }

    return{
      connectInitFunc,
      connectOutFunc,
      sectionSchoolList,
      searchWorkAreaCd,
      searchSection,
      selectMapClick,
      areaHighschoolList,
      subSaveStatsCd,
      selectHowListClick,
      searchHowSection,
      selectHighschoolSelectedClick,
      mapSvgRef,
      searchStartYn,
      selectTouchClick,
      localApiUrl,
    }
  }
}
</script>
