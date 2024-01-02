<template>
  <div data-schtab-content="2" class="active">
    <div class="search-sch">
      <div>
        <ul class="select-item subside">
          <li :class="{active:upperData.upperSubjectCd==searchUpperSubjectCd}" v-for="upperData in upperSubjectList" @click="upperSubjectListClick($event, upperData.upperSubjectCd)" @touchend="upperSubjectListClick($event, upperData.upperSubjectCd)" :key="upperData.upperSubjectCd">{{upperData.upperSubjectNm}}</li>
        </ul>
      </div>
      <div>
        <ul class="select-item">
          <li :class="{active:detailSubjectData.subjectCd==searchDetailSubjectCd}" v-for="detailSubjectData in detailSubjectList" :key="detailSubjectData.subjectCd" @touchmove="selectTouchClick" @click="detailSubjectClick($event, detailSubjectData.subjectCd)" @touchend="detailSubjectClick($event,detailSubjectData.subjectCd)" >{{detailSubjectData.subjectNm}}</li>
        </ul>
      </div>
    </div>
    <div class="scroll-outer">
      <!-- sch-list start -->
      <div class="sch-list" >
        <div class="sch-list-item" v-for="(data,index) in highschoolList"  @touchmove="selectTouchClick" @click="selectHighschoolSelectedClick($event, data.schulCd)" @touchend="selectHighschoolSelectedClick($event,data.schulCd)">
          <div class="pic">
            <span class="num">{{index+1}}</span>
            <a href="javascript:void(0)" v-if="data.thumbImgNmUrl.indexOf('http') >=0"><img :src="data.thumbImgNmUrl" alt="" /></a>
            <a href="javascript:void(0)" v-else><img :src="localApiUrl+data.thumbImgNmUrl" alt="" /></a>
          </div>
          <div class="sch-name">{{data.schulNm}}</div>
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
import {DataFrame,Groupby} from "danfojs";

export default {
  name: "SchoolInfoSubject",
  components: {},
  setup(props,context) {
    const storeData = useStore();
    const routeData = useRoute();
    let upperSubjectList = ref([]);
    let detailSubjectList = ref([]);
    let subSaveStatsCd =ref("");
    let highschoolList=ref([]);
    let dataFrame =null;
    let searchUpperSubjectCd =ref("");
    let searchDetailSubjectCd =ref("");
    let isScrolling = false;
    let localApiUrl = ref("")

    onBeforeMount(async () => {
      let dataUrl=CONFIG.LOCAL_API_URL+"/data/data_store/config_school_subject_info_all.json";
      let resultData = await CommonUtil.ajaxGetSyncJsonProc(dataUrl);
      let upperList = resultData.data.dataList;
      let subjectList = [];
      localApiUrl.value=CONFIG.LOCAL_API_URL;

      //상위과목을 체운다.
      upperList.forEach((data,index)=>{
        let tempDataList = data.subjectList.map((subData)=>{
          subData["upperSubjectCd"]=data.upperSubjectCd;
          subData["upperSubjectNm"]=data.upperSubjectNm;
          return subData;
        })

        subjectList=subjectList.concat(tempDataList);
        let upperObject={};
        upperObject["upperSubjectCd"]=data.upperSubjectCd;
        upperObject["upperSubjectNm"]=data.upperSubjectNm;
        if (index==0){
          searchUpperSubjectCd.value=data.upperSubjectCd;
        }
        upperSubjectList.value.push(upperObject)
      });

      dataFrame = new DataFrame(subjectList);
      dataFrame = dataFrame.setIndex({column: "subjectCd", inplace: false});

      let upResult =  await upperSubectSelectedFunc(searchUpperSubjectCd.value, true);
    });

    onMounted(async () => {
      //comment
    });

    onUnmounted(() => {
      subSaveStatsCd.value="";
      upperSubjectList.value=[];
      detailSubjectList.value=[];
      highschoolList.value=[];
      dataFrame =null;
      searchUpperSubjectCd.value="";
      searchDetailSubjectCd.value="";
      isScrolling=false;
    });

    const connectInitFunc = async (statsCd)=>{
      isScrolling=false;
      if ( CommonUtil.replaceNull(statsCd) !=""){
        subSaveStatsCd.value=statsCd;
      }

      searchUpperSubjectCd.value=upperSubjectList.value[0].upperSubjectCd;
      let result = await upperSubectSelectedFunc(searchUpperSubjectCd.value,false);
    }

    //상위학과를 클릭했을 경우
    const upperSubjectListClick= async  (event,upperSubjectCd)=>{
      event.preventDefault()
      searchUpperSubjectCd.value=upperSubjectCd;
      CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,subSaveStatsCd.value);
      let upResult = await upperSubectSelectedFunc(upperSubjectCd,false);
    }

     //상위학과에 다른 세부 항목코드
    const upperSubectSelectedFunc= async (upperSubjectCd,beforeYn)=>{
      let detailSubjectDataList = dataFrame.loc({rows:dataFrame["upperSubjectCd"].eq(upperSubjectCd)});
      let rowArr = detailSubjectDataList.index.length;
      let start=0;
      let tempDataList = []
      for (start=0;start<rowArr;start++){
        let dataObject = {};
        dataObject.subjectCd= detailSubjectDataList["subjectCd"].values[start];
        dataObject.subjectNm= detailSubjectDataList["subjectNm"].values[start];
        dataObject.upperSubjectCd= detailSubjectDataList["upperSubjectCd"].values[start];

        if (start==0){
          searchDetailSubjectCd.value=dataObject.subjectCd;
        }
        tempDataList.push(dataObject);
      }

      detailSubjectList.value=tempDataList;
      //학과통계처리
      if (beforeYn==false){
        subjectStaticProcFunc(searchDetailSubjectCd.value);
      }

      let result = await highschoolSelectListFunc(searchDetailSubjectCd.value)
    }

    const subjectStaticProcFunc = (searchDetailSubjectCd)=>{
      let dataUrl = CONFIG.REMOTE_API_URL+"/api/save/highSchoolSubjectRankSave";
      let searchParam = new URLSearchParams();
      searchParam.append("searchSubjectCd",searchDetailSubjectCd);
      searchParam.append("searchSysGroup",storeData.state.configStore.sysGroup);
      CommonUtil.ajaxGetAsyncProc(dataUrl,searchParam);
    }

    //고등학교 목록 조회 함수
    const highschoolSelectListFunc = async (detailSubjectCd)=>{
      CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,subSaveStatsCd.value);

      let result="Y";
      let dataUrl=CONFIG.LOCAL_API_URL+"/data/data_store/config_school_subject_"+detailSubjectCd+"_all.json";
      let resultData = await CommonUtil.ajaxGetSyncJsonProc(dataUrl);
      highschoolList.value=[];

      if (resultData.result=="Y"){
        if (resultData.data.totalCnt >0){
          highschoolList.value=resultData.data.dataList;
        }
      }else{
        result="N"
      }

      return result;
    }

    //고등락교 클릭시
    const selectHighschoolSelectedClick = async (event,schulCd)=>{
      if (isScrolling==false){
        let sendParam={"schulCd":schulCd,"searchInfoType":"B","searchInfoPositionType":"SchoolInfoSubject"}
        context.emit("selectSchoolOneEvent",sendParam);
      }

      isScrolling=false;
    }

    //세부학과정보를 클릭했을 경우
    const detailSubjectClick= async (event,detailSubjectCd)=>{
      event.preventDefault()
      if (isScrolling==false){
        searchDetailSubjectCd.value=detailSubjectCd;
        //학과통계처리
        subjectStaticProcFunc(detailSubjectCd);
        let result = await highschoolSelectListFunc(detailSubjectCd);
      }

      isScrolling=false;
    }

    const selectTouchClick = ($e)=>{
      // 스크롤 중인지 확인
      isScrolling = true;
    }

    return {
      upperSubjectList,
      detailSubjectList,
      connectInitFunc,
      subSaveStatsCd,
      highschoolList,
      searchUpperSubjectCd,
      searchDetailSubjectCd,
      upperSubjectListClick,
      selectHighschoolSelectedClick,
      detailSubjectClick,
      selectTouchClick,
      localApiUrl,
    }
  }
}
</script>
