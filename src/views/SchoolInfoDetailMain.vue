<template>
  <div class="modal-content-body">
    <div class="schInfo-outer" data-schinfo-tab="1">
      <div class="schInfo-header min-h">
        <div class="video-outer">
          <video :src="disPlaySchulVidoNm" id="videoId" ref="videoRef" preload="auto" ></video>
        </div>
        <div class="small-map-outer">
          <iframe :src="naverMapUrl" height="100%" width="100%"></iframe>
        </div>
      </div>
      <h3>교육지원시설</h3>
      <div class="icon-group">
        <div v-show="displayGmnsmCnt==true">
          <span class="icon-img"><img src="/data/images/icon-sch-1.png" alt="" /></span>
          <span class="icon-name">체육관</span>
        </div>
        <div v-show="displayLctrumCnt==true">
          <span class="icon-img"><img src="/data/images/icon-sch-2.png" alt="" /></span>
          <span class="icon-name">강당</span>
        </div>
        <div v-show="displayBrhsCnt==true">
          <span class="icon-img"><img src="/data/images/icon-sch-3.png" alt="" /></span>
          <span class="icon-name">기숙사</span>
        </div>
        <div v-show="displaySwmplCnt==true">
          <span class="icon-img"><img src="/data/images/icon-sch-4.png" alt="" /></span>
          <span class="icon-name">수영장</span>
        </div>
        <div v-show="displayCnsltCnt==true">
          <span class="icon-img"><img src="/data/images/icon-sch-5.png" alt="" /></span>
          <span class="icon-name">진료상담실</span>
        </div>
      </div>
      <div class="sch-chart">
        <div>
          <div class="chart-title">남녀 성별 학생수</div>
          <div>
            <canvas id="schoolChart" style="width:360px;height: 300px"></canvas>
          </div>
        </div>
        <!-- 막대 차트 -->
        <!-- 대학교 진학률 start -->
        <div>
          <div class="chart-title">대학교 진학률</div>
          <div class="chart-bar-outer">
            <div class="chart-bar-inner">
              <div class="chart-item">
                <div class="chart-name">{{ displaySchulNm }}</div>
                <div class="graph-outer">
                  <div class="graph-inner" :style="{'width': displayUnivErtdsPercent+'%'}"></div>
                  <div class="chart-value">{{displayUnivErtdsRate}}%</div>
                </div>
              </div>
              <div class="chart-item" v-for="univData in displayUnivErtdsRateList" :key="univData.schulCd">
                <div class="chart-name">{{univData.schulNm}}</div>
                <div class="graph-outer">
                  <div class="graph-inner" :style="{'width': univData.displayPercent+'%'}"></div>
                  <div class="chart-value">{{univData.totalPercent}}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 대학교 진학률 end -->
        <!-- 전문대학 진학률 start -->
        <div>
          <div class="chart-title">전문대학 진학률</div>
          <div class="chart-bar-outer">
            <div class="chart-bar-inner">
              <div class="chart-item">
                <div class="chart-name">{{ displaySchulNm }}</div>
                <div class="graph-outer">
                  <div class="graph-inner" :style="{'width': displayJncllErtdsPercent+'%'}"></div>
                  <div class="chart-value">{{displayJncllErtdsRate}}%</div>
                </div>
              </div>
              <div class="chart-item" v-for="junData in displayJncllErtdsRateList" :key="junData.schulCd">
                <div class="chart-name">{{junData.schulNm}}</div>
                <div class="graph-outer">
                  <div class="graph-inner" :style="{'width': junData.displayPercent+'%'}"></div>
                  <div class="chart-value">{{junData.totalPercent}}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 전문대학 진학률 end -->
        <!-- 취업률 start -->
        <div>
          <div class="chart-title">취업률</div>
          <div class="chart-bar-outer">
            <div class="chart-bar-inner">
              <div class="chart-item">
                <div class="chart-name">{{ displaySchulNm }}</div>
                <div class="graph-outer">
                  <div class="graph-inner" :style="{'width': displayEmpymnPercent+'%'}"></div>
                  <div class="chart-value">{{displayEmpymnRate}}%</div>
                </div>
              </div>
              <div class="chart-item" v-for="empData in displayEmpymnRateList" :key="empData.schulCd">
                <div class="chart-name">{{empData.schulNm}}</div>
                <div class="graph-outer">
                  <div class="graph-inner" :style="{'width': empData.displayPercent+'%'}"></div>
                  <div class="chart-value">{{empData.totalPercent}}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 취업률 end -->
        <!-- 학생수 -->
        <div>
          <div class="chart-title">학생수</div>
          <div class="chart-bar-outer">
            <div class="chart-bar-inner">
              <div class="chart-item">
                <div class="chart-name">{{ displaySchulNm }}</div>
                <div class="graph-outer">
                  <div class="graph-inner" :style="{'width': displayStdntPercent+'%'}"></div>
                  <div class="chart-value">{{displayStdntCnt}}명</div>
                </div>
              </div>
              <div class="chart-item" v-for="(cntData,sindex) in displayStdntCntList" :key="cntData.schulCd">
                <div class="chart-name">{{cntData.schulNm}}</div>
                <div class="graph-outer">
                  <div class="graph-inner" :style="{'width': cntData.displayPercent+'%'}"></div>
                  <div class="chart-value">{{cntData.totalCnt}}명</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 학생수 end -->
        <!-- 학급당 학생수 start -->
        <div>
          <div class="chart-title">학급당 학생수</div>
          <div class="chart-bar-outer">
            <div class="chart-bar-inner">
              <div class="chart-item">
                <div class="chart-name">{{ displaySchulNm }}</div>
                <div class="graph-outer">
                  <div class="graph-inner" :style="{'width': displayClassStdntPercent+'%'}"></div>
                  <div class="chart-value">{{displayClassStdntCnt}}명</div>
                </div>
              </div>
              <div class="chart-item" v-for="classData in displayClassStdntCntList" :key="classData.schulCd">
                <div class="chart-name">{{classData.schulNm}}</div>
                <div class="graph-outer">
                  <div class="graph-inner" :style="{'width': classData.displayPercent+'%'}"></div>
                  <div class="chart-value">{{classData.totalCnt}}명</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 학급당 학생수 end -->
        <!-- 교원1인당 학생수 start  -->
        <div>
          <div class="chart-title">교원1인당 학생수</div>
          <div class="chart-bar-outer">
            <div class="chart-bar-inner">
              <div class="chart-item">
                <div class="chart-name">{{ displaySchulNm }}</div>
                <div class="graph-outer">
                  <div class="graph-inner" :style="{'width': displayTcherStdntPercent+'%'}"></div>
                  <div class="chart-value">{{displayTcherStdntCnt}}명</div>
                </div>
              </div>
              <div class="chart-item" v-for="tcherData in displayTcherStdntCntList" :key="tcherData.schulCd">
                <div class="chart-name">{{tcherData.schulNm}}</div>
                <div class="graph-outer">
                  <div class="graph-inner" :style="{'width': tcherData.displayPercent+'%'}"></div>
                  <div class="chart-value">{{tcherData.totalCnt}}명</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 교원1인당 학생수 end  -->
        <!-- 학년당 학생수 start  -->
        <div>
          <div class="chart-title">학년당 학생수</div>
          <div class="chart-bar-outer one-color">
            <div class="chart-bar-inner">

              <div class="chart-item">
                <div class="chart-name">1학년</div>
                <div class="graph-outer">
                  <div class="graph-inner" :style="{'width': displayOneStdntPercent+'%'}"></div>
                  <div class="chart-value">{{displayOneStdntCnt}}명</div>
                </div>
              </div>
              <div class="chart-item">
                <div class="chart-name">2학년</div>
                <div class="graph-outer">
                  <div class="graph-inner" :style="{'width': displayTwoStdntPercent+'%'}"></div>
                  <div class="chart-value">{{displayTwoStdntCnt}}명</div>
                </div>
              </div>
              <div class="chart-item">
                <div class="chart-name">3학년</div>
                <div class="graph-outer">
                  <div class="graph-inner" :style="{'width': displayThreeStdntPercent+'%'}"></div>
                  <div class="chart-value">{{displayThreeStdntCnt}}명</div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <!-- 학년당 학생수 end  -->
        <!-- 학년당 학급수 start  -->
        <div>
          <div class="chart-title">학년별 학급당 학급수</div>
          <div class="chart-bar-outer one-color">
            <div class="chart-bar-inner">
              <div class="chart-item">
                <div class="chart-name">1학년</div>
                <div class="graph-outer">
                  <div class="graph-inner" :style="{'width': displayOneClassStdntCntPercent+'%'}"></div>
                  <div class="chart-value">{{displayOneClassStdntCnt}}명</div>
                </div>
              </div>
              <div class="chart-item">
                <div class="chart-name">2학년</div>
                <div class="graph-outer">
                  <div class="graph-inner" :style="{'width': displayTwoClassStdntCntPercent+'%'}"></div>
                  <div class="chart-value">{{displayTwoClassStdntCnt}}명</div>
                </div>
              </div>
              <div class="chart-item">
                <div class="chart-name">3학년</div>
                <div class="graph-outer">
                  <div class="graph-inner" :style="{'width': displayThreeClassStdntCntPercent+'%'}"></div>
                  <div class="chart-value">{{displayThreeClassStdntCnt}}명</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 학년당 학급수 end  -->
      </div>
      <div class="pic-group" v-show='displaySchulImgNm !=""'>
        <P><img :src="displaySchulImgNm"></P>
      </div>
    </div>
  </div>          <!-- //내용 -->
</template>
<script>
import {ref, onMounted, onUpdated, onUnmounted, onBeforeMount, computed} from 'vue';
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import CommonUtil from "@/util/CommonUtil";
export default {
  name: "SchoolInfoDetailMain",
  components: {
  },
  setup(props,context) {
    const storeData = useStore();
    const routeData = useRoute();
    let activeYn = ref(false);
    let itemIndex = 0;
    let itemData = ref({});
    let videoRef=ref();
    let videoObj =null;
    let loadChart =null;
    let disPlaySchulVidoNm =ref("");

    let saveStatsCd =ref("");
    let naverMapUrl =ref("")

    let maxStdCnt =0;
    let maxTcherStdntCnt = 0;
    let maxClassStdntCnt = 0;
    let maxUnivErtdsRate = 0;
    let maxJncllErtdsRate = 0;
    let maxEmpymnRate = 0;
    let searchSchulCd = ref("");
    let displaySchulNm = ref("");
    let displaySchulImgNm =ref("");
    let displayLttud =ref();
    let displayLgtud  =ref();
    let displaySchulRdnma  =ref();
    let displayWomanStdntCnt =ref();
    let displayManStdntCnt =ref();

    let displayGmnsmCnt=ref(false); //체육관
    let displayLctrumCnt=ref(false); //강당수
    let displayBrhsCnt=ref(false); //기숙사수
    let displaySwmplCnt=ref(false); //수영장수
    let displayCnsltCnt=ref(false); //진로상담실수

    //학생수정보
    let displayStdntCnt=ref(0);
    let displayStdntCntList =ref([]);
    let displayStdntPercent=ref(0);

    //교원1인당학생수 정보
    let displayTcherStdntCnt=ref(0);
    let displayTcherStdntPercent=ref(0);
    let displayTcherStdntCntList=ref([]);

    //1인당 학급수 정보
    let displayClassStdntCnt=ref(0);
    let displayClassStdntPercent=ref(0);
    let displayClassStdntCntList=ref([]);

    //대학진학률 정보
    let displayUnivErtdsRate=ref(0);
    let displayUnivErtdsPercent=ref(0);
    let displayUnivErtdsRateList=ref([]);

    //전문대진학률 정보
    let displayJncllErtdsRate=ref(0);
    let displayJncllErtdsPercent=ref(0);
    let displayJncllErtdsRateList=ref([]);

    //취업률 정보
    let displayEmpymnRate=ref(0);
    let displayEmpymnPercent=ref(0);
    let displayEmpymnRateList=ref([]);

    //학년별 학생수 정보정보
    let maxStudentPerCnt =0;
    let displayOneStdntPercent = ref(0);
    let displayTwoStdntPercent = ref(0);
    let displayOneStdntCnt= ref(0);

    let displayTwoStdntCnt=ref(0);
    let displayThreeStdntCnt=ref(0);
    let displayThreeStdntPercent = ref(0)

    //학년별 학급수정보
    let maxClassStdntCntPerCnt = 0;
    let displayOneClassStdntCnt= ref(0);
    let displayTwoClassStdntCnt= ref(0);
    let displayThreeClassStdntCnt= ref(0);

    let displayOneClassStdntCntPercent = ref(0);
    let displayTwoClassStdntCntPercent = ref(0);
    let displayThreeClassStdntCntPercent = ref(0);

    onBeforeMount(() => {
     //
    });

    onMounted(() => {
      //
    });

    onUnmounted(() => {
      if (videoObj !=null){
        videoObj.pause();
        videoObj.muted=true;
      }
    });

    //외부에서 학교 상세정보를 클릭했을 때
    const connectInitFunc = async (pSchulCd,pSaveStatsCd)=>{
      searchSchulCd.value=pSchulCd;
      saveStatsCd.value=pSaveStatsCd;
      let result = await selectFindSchoolInfoFunc(pSchulCd);
      loadChart=drawChart();
      videoObj=videoRef.value;
      videoObj.muted = false;
      videoPlay(true);
    }

    const connectOutFunc = async (pSchulCd,pSaveStatsCd)=>{
      videoObj.pause();
      videoObj.muted=true;
    }

    const drawChart = ()=>{
      let tempLoadChart = loadChart
      if (tempLoadChart ==null){
        const ctx = document.getElementById('schoolChart');
        tempLoadChart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['남성 ('+displayManStdntCnt.value+"명)",'여성 ('+displayWomanStdntCnt.value+"명)"],
            datasets: [{
              data: [displayManStdntCnt.value, displayWomanStdntCnt.value],
              hoverOffset: 2,
              borderWidth:1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  font: {
                    size: 16 // 레이블 크기 조절
                  }
                },
                display: true
              }
            }
          }
        });
      }
      return tempLoadChart;
    }

    const selectFindSchoolInfoFunc = async (pSchulCd)=>{
      let result="Y";
      let dataFrame = storeData.state.dataStore.highschoolDataFrame;
      let schulInfoData =dataFrame.loc({rows:dataFrame["schulCd"].eq(pSchulCd)});

      displaySchulNm.value=schulInfoData["schulNm"].values[0];
      let tempVideoFile=CommonUtil.replaceNull(schulInfoData["schulVidoNm"].values[0]);
      if (tempVideoFile !==""){
        disPlaySchulVidoNm.value=CONFIG.LOCAL_API_URL+"/data/data_file/"+tempVideoFile;
      }else{
        disPlaySchulVidoNm.value="";
      }

      let tempSchulImgNm = schulInfoData["schulImgNm"].values[0];
      if (CommonUtil.replaceNull(tempSchulImgNm) !=""){
        displaySchulImgNm.value=CONFIG.LOCAL_API_URL+"/data/data_file/"+tempSchulImgNm;
      }else{
        displaySchulImgNm.value="";
      }
      displayLttud.value=schulInfoData["lttud"].values[0];
      displayLgtud.value=schulInfoData["lgtud"].values[0];

      displaySchulRdnma.value=schulInfoData["schulRdnma"].values[0];
      naverMapUrl.value="/naverMap/schoolPosition.html?lttud="+displayLttud.value+"&lgtud="+displayLgtud.value+"&schulRdnma="+displaySchulRdnma.value;


      let manStdntCntStr=schulInfoData["manStdntCnt"].values[0];
      if (CommonUtil.replaceNull(manStdntCntStr)!=""){
        displayManStdntCnt.value=parseInt(manStdntCntStr);
      }else{
        displayManStdntCnt.value=0;
      }

      let womanStdntCntStr=schulInfoData["womanStdntCnt"].values[0];
      if (CommonUtil.replaceNull(womanStdntCntStr)!=""){
        displayWomanStdntCnt.value=parseInt(womanStdntCntStr);
      }else{
        displayWomanStdntCnt.value=0;
      }

      let displayGmnsmCntStr = schulInfoData["gmnsmCnt"].values[0];
      if (CommonUtil.replaceNull(displayGmnsmCntStr) !="" && Number(displayGmnsmCntStr) >0){
        displayGmnsmCnt.value=true;
      }else{
        displayGmnsmCnt.value=false;
      }

      let displayLctrumCntStr = schulInfoData["lctrumCnt"].values[0];
      if (CommonUtil.replaceNull(displayLctrumCntStr) !="" && Number(displayLctrumCntStr) >0){
        displayLctrumCnt.value=true;
      }else{
        displayLctrumCnt.value=false;
      }

      let displayBrhsCntStr = schulInfoData["brhsCnt"].values[0];
      if (CommonUtil.replaceNull(displayBrhsCntStr) !="" && Number(displayBrhsCntStr) >0){
        displayBrhsCnt.value=true;
      }else{
        displayBrhsCnt.value=false;
      }

      let displaySwmplCntStr=schulInfoData["swmplCnt"].values[0];
      if (CommonUtil.replaceNull(displaySwmplCntStr) !="" && Number(displaySwmplCntStr) >0){
        displaySwmplCnt.value=true;
      }else{
        displaySwmplCnt.value=false;
      }

      let displayCnsltCntStr=schulInfoData["cnsltCnt"].values[0];
      if (CommonUtil.replaceNull(displayCnsltCntStr) !="" && Number(displayCnsltCntStr) >0){
        displayCnsltCnt.value=true;
      }else{
        displayCnsltCnt.value=false;
      }

      let displayStdntCntStr = schulInfoData["stdntCnt"].values[0]; //
      if (CommonUtil.replaceNull(displayStdntCntStr)!=""){
        displayStdntCnt.value=parseInt(displayStdntCntStr);
      }else{
        displayStdntCnt.value=0;
      }

      let displayTcherStdntCntStr = schulInfoData["tcherStdntCnt"].values[0]; //
      if (CommonUtil.replaceNull(displayTcherStdntCntStr)!=""){
        displayTcherStdntCnt.value=parseFloat(displayTcherStdntCntStr);
      }else{
        displayTcherStdntCnt.value=0;
      }

      let displayClassStdntCntStr  = schulInfoData["classStdntCnt"].values[0]; //
      if (CommonUtil.replaceNull(displayClassStdntCntStr)!=""){
        displayClassStdntCnt.value=parseFloat(displayClassStdntCntStr);
      }else{
        displayClassStdntCnt.value=0;
      }

      let displayUnivErtdsRateStr  = schulInfoData["univErtdsRate"].values[0]; //
      if (CommonUtil.replaceNull(displayUnivErtdsRateStr)!=""){
        displayUnivErtdsRate.value=parseFloat(displayUnivErtdsRateStr);
      }else{
        displayUnivErtdsRate.value=0;
      }

      let displayJncllErtdsRateStr  = schulInfoData["jncllErtdsRate"].values[0]; //
      if (CommonUtil.replaceNull(displayJncllErtdsRateStr)!=""){
        displayJncllErtdsRate.value=parseFloat(displayJncllErtdsRateStr);
      }else{
        displayJncllErtdsRate.value=0;
      }

      let displayEmpymnRateStr  = schulInfoData["empymnRate"].values[0]; //
      if (CommonUtil.replaceNull(displayEmpymnRateStr)!=""){
        displayEmpymnRate.value=parseFloat(displayEmpymnRateStr);
      }else{
        displayEmpymnRate.value=0;
      }

      //maxClassPerStdCnt
      let displayOneStdntCntStr  = schulInfoData["oneStdntCnt"].values[0]; //
      if (CommonUtil.replaceNull(displayOneStdntCntStr)!=""){
        displayOneStdntCnt.value=parseInt(displayOneStdntCntStr);
      }else{
        displayOneStdntCnt.value=0;
      }

      let displayTwoStdntCntStr  = schulInfoData["twoStdntCnt"].values[0];
      if (CommonUtil.replaceNull(displayTwoStdntCntStr)!=""){
        displayTwoStdntCnt.value=parseInt(displayTwoStdntCntStr);
      }else{
        displayTwoStdntCnt.value=0;
      }

      let displayThreeStdntCntStr  = schulInfoData["threeStdntCnt"].values[0];
      if (CommonUtil.replaceNull(displayThreeStdntCntStr)!=""){
        displayThreeStdntCnt.value=parseInt(displayThreeStdntCntStr);
      }else{
        displayThreeStdntCnt.value=0;
      }

      let oneClassStdntCntStr  = schulInfoData["oneClassStdntCnt"].values[0];
      if (CommonUtil.replaceNull(oneClassStdntCntStr)!=""){
        displayOneClassStdntCnt.value=parseFloat(oneClassStdntCntStr);
      }else{
        displayOneClassStdntCnt.value=0;
      }

      let twoClassStdntCntStr  = schulInfoData["twoClassStdntCnt"].values[0];
      if (CommonUtil.replaceNull(twoClassStdntCntStr)!=""){
        displayTwoClassStdntCnt.value=parseFloat(twoClassStdntCntStr);
      }else{
        displayTwoClassStdntCnt.value=0;
      }

      let threeClassStdntCntStr  = schulInfoData["threeClassStdntCnt"].values[0];
      if (CommonUtil.replaceNull(threeClassStdntCntStr)!=""){
        displayThreeClassStdntCnt.value=parseFloat(threeClassStdntCntStr);
      }else{
        displayThreeClassStdntCnt.value=0;
      }

      maxStudentPerCnt=displayOneStdntCnt.value;

      if (maxStudentPerCnt <= displayTwoStdntCnt.value){
        maxStudentPerCnt=displayTwoStdntCnt.value;
      }

      if (maxStudentPerCnt <= displayThreeStdntCnt.value){
        maxStudentPerCnt=displayThreeStdntCnt.value;
      }

      maxClassStdntCntPerCnt=displayOneClassStdntCnt.value;

      if (maxClassStdntCntPerCnt <= displayTwoClassStdntCnt.value){
        maxClassStdntCntPerCnt=displayTwoClassStdntCnt.value;
      }

      if (maxClassStdntCntPerCnt <= displayThreeClassStdntCnt.value){
        maxClassStdntCntPerCnt=displayThreeClassStdntCnt.value;
      }


      maxStdCnt = displayStdntCnt.value;
      maxTcherStdntCnt = displayTcherStdntCnt.value;
      maxClassStdntCnt = displayClassStdntCnt.value;
      maxUnivErtdsRate = displayUnivErtdsRate.value;
      maxJncllErtdsRate = displayJncllErtdsRate.value;
      maxEmpymnRate = displayEmpymnRate.value;

      let hsKndScCdValue      =  schulInfoData["hsKndScCd"].values[0]; //
      let prWorkAdrcdCdValue  =  schulInfoData["prWorkAdrcdCd"].values[0]; //
      let rateResult = searchRateList(hsKndScCdValue,prWorkAdrcdCdValue);

      return {"hsKndScCd":"hsKndScCdValue"};
    }

    const searchRateList = async (hsKndScCdValue,prWorkAdrcdCdValue)=>{
      let searchUrl="";
      if (hsKndScCdValue=="A"){
        searchUrl=CONFIG.LOCAL_API_URL+"/data/data_store/config_school_section_rate_"+prWorkAdrcdCdValue+"_"+hsKndScCdValue+".json";
      }else{
        searchUrl=CONFIG.LOCAL_API_URL+"/data/data_store/config_school_section_rate_ALL_"+hsKndScCdValue+".json";
      }

      let reponse =   await CommonUtil.ajaxGetSyncJsonProc(searchUrl,null);

      let tempDataList=reponse.data.rateTypeA;
      let tempFindYn=false;
      tempDataList= tempDataList.filter((data,index)=>{
        if (data.schulNm != displaySchulNm.value){
          return true;
        }else{
          tempFindYn=true;
        }
      });

      if (tempFindYn ==false){
        displayStdntCntList.value=tempDataList.slice(0,4)
      }else{
        displayStdntCntList.value=tempDataList;
      }

      tempFindYn=false;
      tempDataList=reponse.data.rateTypeB;
      tempDataList= tempDataList.filter((data,index)=>{
        if (data.schulNm != displaySchulNm.value){
          return true;
        }else{
          tempFindYn=true;
        }
      });

      if (tempFindYn ==false){
        displayClassStdntCntList.value=tempDataList.slice(0,4)
      }else{
        displayClassStdntCntList.value=tempDataList;
      }

      tempFindYn=false;
      tempDataList=reponse.data.rateTypeC;
      tempDataList= tempDataList.filter((data,index)=>{
        if (data.schulNm != displaySchulNm.value){
          return true;
        }else{
          tempFindYn=true;
        }
      });

      if (tempFindYn ==false){
        displayTcherStdntCntList.value=tempDataList.slice(0,4)
      }else{
        displayTcherStdntCntList.value=tempDataList;
      }

      tempFindYn=false;
      tempDataList=reponse.data.rateTypeD;
      tempDataList= tempDataList.filter((data,index)=>{
        if (data.schulNm != displaySchulNm.value){
          return true;
        }else{
          tempFindYn=true;
        }
      });

      if (tempFindYn ==false){
        displayUnivErtdsRateList.value=tempDataList.slice(0,4)
      }else{
        displayUnivErtdsRateList.value=tempDataList;
      }

      tempFindYn=false;
      tempDataList=reponse.data.rateTypeE;
      tempDataList= tempDataList.filter((data,index)=>{
        if (data.schulNm != displaySchulNm.value){
          return true;
        }else{
          tempFindYn=true;
        }
      });

      if (tempFindYn ==false){
        displayJncllErtdsRateList.value=tempDataList.slice(0,4)
      }else{
        displayJncllErtdsRateList.value=tempDataList;
      }

      tempFindYn=false;
      tempDataList=reponse.data.rateTypeF;
      tempDataList= tempDataList.filter((data,index)=>{
        if (data.schulNm != displaySchulNm.value){
          return true;
        }else{
          tempFindYn=true;
        }
      });

      if (tempFindYn ==false){
        displayEmpymnRateList.value=tempDataList.slice(0,4)
      }else{
        displayEmpymnRateList.value=tempDataList;
      }

      if (maxStdCnt < displayStdntCntList.value[0].totalCnt){
        maxStdCnt = displayStdntCntList.value[0].totalCnt;
      }

      if (maxClassStdntCnt < displayClassStdntCntList.value[0].totalCnt) {
        maxClassStdntCnt = displayClassStdntCntList.value[0].totalCnt;
      }

      if (maxTcherStdntCnt < displayTcherStdntCntList.value[0].totalCnt) {
        maxTcherStdntCnt = displayTcherStdntCntList.value[0].totalCnt;
      }

      if (maxUnivErtdsRate < displayUnivErtdsRateList.value[0].totalPercent) {
        maxUnivErtdsRate = displayUnivErtdsRateList.value[0].totalPercent;
      }

      if (maxJncllErtdsRate < displayJncllErtdsRateList.value[0].totalPercent) {
        maxJncllErtdsRate = displayJncllErtdsRateList.value[0].totalPercent;
      }

      if (maxEmpymnRate < displayEmpymnRateList.value[0].totalPercent) {
        maxEmpymnRate = displayEmpymnRateList.value[0].totalPercent;
      }

      displayStdntPercent.value=(parseFloat(displayStdntCnt.value) *100)/parseFloat(maxStdCnt);
      displayStdntCntList.value = displayStdntCntList.value.map((data)=>{
        let dataPercent = (parseFloat(data.totalCnt)*100)/parseFloat(maxStdCnt);
        data.displayPercent=dataPercent
        return data;
      });

      displayTcherStdntPercent.value=(parseFloat(displayTcherStdntCnt.value) *100)/parseFloat(maxTcherStdntCnt);
      displayTcherStdntCntList.value = displayTcherStdntCntList.value.map((data)=>{
        let dataPercent = (parseFloat(data.totalCnt)*100)/parseFloat(maxTcherStdntCnt);
        data.displayPercent=dataPercent
        return data;
      });

      displayClassStdntPercent.value=(parseFloat(displayClassStdntCnt.value) *100)/parseFloat(maxClassStdntCnt);
      displayClassStdntCntList.value = displayClassStdntCntList.value.map((data)=>{
        let dataPercent = (parseFloat(data.totalCnt)*100)/parseFloat(maxClassStdntCnt);
        data.displayPercent=dataPercent
        return data;
      });

      //대학교진학률 처리
      displayUnivErtdsPercent.value=(parseFloat(displayUnivErtdsRate.value) *100)/parseFloat(maxUnivErtdsRate);
      displayUnivErtdsRateList.value = displayUnivErtdsRateList.value.map((data)=>{
        let dataPercent = (parseFloat(data.totalPercent)*100)/parseFloat(maxUnivErtdsRate);
        data.displayPercent=dataPercent
        return data;
      });

      //전문대진학률 정보
      displayJncllErtdsPercent.value=(parseFloat(displayJncllErtdsRate.value) *100)/parseFloat(maxJncllErtdsRate);
      displayJncllErtdsRateList.value = displayJncllErtdsRateList.value.map((data)=>{
        let dataPercent = (parseFloat(data.totalPercent)*100)/parseFloat(maxJncllErtdsRate);
        data.displayPercent=dataPercent
        return data;
      });

      //취업률 정보
      displayEmpymnPercent.value=(parseFloat(displayEmpymnRate.value) *100)/parseFloat(maxEmpymnRate);
      displayEmpymnRateList.value = displayEmpymnRateList.value.map((data)=>{
        let dataPercent = (parseFloat(data.totalPercent)*100)/parseFloat(maxEmpymnRate);
        data.displayPercent=dataPercent
        return data;
      });
      //학년별 학생수 width %
      displayOneStdntPercent.value=(parseFloat(displayOneStdntCnt.value) *100)/parseFloat(maxStudentPerCnt);
      displayTwoStdntPercent.value=(parseFloat(displayTwoStdntCnt.value) *100)/parseFloat(maxStudentPerCnt);
      displayThreeStdntPercent.value=(parseFloat(displayThreeStdntCnt.value) *100)/parseFloat(maxStudentPerCnt);

      //학년별 학생수 width %
      displayOneClassStdntCntPercent.value=(parseFloat(displayOneClassStdntCnt.value) *100)/parseFloat(maxClassStdntCntPerCnt);
      displayTwoClassStdntCntPercent.value=(parseFloat(displayTwoClassStdntCnt.value) *100)/parseFloat(maxClassStdntCntPerCnt);
      displayThreeClassStdntCntPercent.value=(parseFloat(displayThreeClassStdntCnt.value) *100)/parseFloat(maxClassStdntCntPerCnt);
    }

    const videoPlay = ()=>{

      if (disPlaySchulVidoNm.value !=""){
        if (videoObj.paused ) {
          videoObj.currentTime=0
          //videoObj.muted = false;
          videoObj.muted = false;
          setTimeout(()=>{
            videoObj.play();
          },1000);
        }
      }
    }

    return {
      activeYn,
      itemData,
      connectInitFunc,
      displaySchulNm,
      disPlaySchulVidoNm,
      saveStatsCd,
      videoRef,
      searchSchulCd,
      naverMapUrl,
      displaySchulImgNm,
      displayLttud,
      displayLgtud,
      displaySchulRdnma,
      connectOutFunc,
      displayWomanStdntCnt,
      displayManStdntCnt,
      displayGmnsmCnt,
      displayLctrumCnt,
      displayBrhsCnt,
      displaySwmplCnt,
      displayCnsltCnt,
      displayStdntCnt,
      displayStdntCntList,
      displayStdntPercent,
      //교원1인당학생수 정보
      displayTcherStdntCnt,
      displayTcherStdntPercent,
      displayTcherStdntCntList,
      //1인당 학급수 정보
      displayClassStdntCnt,
      displayClassStdntPercent,
      displayClassStdntCntList,
      //대학진학률 정보
      displayUnivErtdsRate,
      displayUnivErtdsPercent,
      displayUnivErtdsRateList,
      //전문대진학률 정보
      displayJncllErtdsRate,
      displayJncllErtdsPercent,
      displayJncllErtdsRateList,
      //취업률 정보
      displayEmpymnRate,
      displayEmpymnPercent,
      displayEmpymnRateList,
      //학년별 학생수 정보정보
      maxStudentPerCnt,
      displayOneStdntPercent ,
      displayTwoStdntPercent ,
      displayOneStdntCnt,

      displayTwoStdntCnt,
      displayThreeStdntCnt,
      displayThreeStdntPercent,

      //학년별 학급수정보
      maxClassStdntCntPerCnt ,
      displayOneClassStdntCnt,
      displayTwoClassStdntCnt,
      displayThreeClassStdntCnt,

      displayOneClassStdntCntPercent,
      displayTwoClassStdntCntPercent,
      displayThreeClassStdntCntPercent,

    }
  }
}
</script>
