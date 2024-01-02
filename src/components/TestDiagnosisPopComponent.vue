<template>
  <div :class="{'modal-outer':true,'active':activeYn==true}">
    <div class="modal-inner">
      <div class="modal-title">{{ detailData.subTitle }}</div>
      <div class="modal-body">
        <div class="modal-content-outer">
          <div class="modal-content-inner">
            <!-- 내용 -->
            <div class="modal-content-body" ref="modalContentBodyRef">

              <div class="check-list" v-for="(questionData,qindex) in questionList" :key="questionData.questionId">
                <div class="question">
                  <span :class="{'uncheck':totalResultClickYn==true && questionData.checkYn==false }">{{ questionData.questionId }}</span>
                  <p>{{ questionData.questionTitle }}</p>
                </div>
                <fieldset>
                  <div class="toggle">
                    <template v-for="answerData in questionData.answerList" :key="answerData.answerId">
                    <input type="radio"  :name="answerData.answerName" :value="answerData.answerScore" :id="answerData.answerId" />
                    <label :for="answerData.answerId"  @click="selectAnswerCheckClick(qindex,answerData.answerScore)">{{ answerData.answerTitle }}</label>
                    </template>
                  </div>
                </fieldset>
              </div>
              <div class="blockquote" v-if="diagonisData.sourceType =='A'" v-html="diagonisData.source"></div>
              <div class="blockquote" v-if="diagonisData.sourceType =='B'" v-html="diagonisData.source" style="display: block;"></div>
            </div>
            <!-- 점수결과 -->
            <div class="modal-content-header" >
              <div class="result">
                <div class="point-outer">
                  <div class="point-inner" v-if="completeYn==true"><span>총점 :</span> {{totalScore}}점<br>
                    <h3>{{ diagonisData.title }}</h3>
                  </div>
                  <ul>
                    <li><p v-html=" totalAnswer "></p></li>
                  </ul>
                  <div class="btn-calc" @click="totalScoreCalcClick($event)" @touchend="totalScoreCalcClick($event)">점수 계산하기</div>
                </div>
              </div>
            </div>

            <!-- // 내용 -->
          </div>
        </div>
        <div class="modal-close-outer">
          <a href="javascript:void(0)">
            <div class="btn-modal-close" @click="selectCloseClick($event)" @touchend="selectCloseClick($event)">닫기</div>
          </a>
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
export default {
  name: "TestDiagnosisPopComponent",
  components: {

  },
  setup(props){
    const storeData = useStore();
    const routeData = useRoute();
    let activeYn =ref(false);
    let detailData =ref({});
    let modalContentBodyRef =ref();
    let diagonisData = ref({})
    let completeYn=ref(false)
    let questionList = ref([])
    let totalScore =ref(0)
    let totalAnswer=ref("");
    let totalResultClickYn=ref(false);

    onBeforeMount(async ()=>{
      //comment
    });

    onMounted(()=>{
      //comment
    });

    onUnmounted(()=>{
      activeYn.value=false;
      detailData.value={};
      questionList.value=[];
      completeYn.value=false;
      totalScore.value=0;
      totalResultClickYn.value=false;
      totalAnswer.value="답변을 선택한 후 점수 계산하기를 누르세요.";
    });

    const selectCloseClick =(event)=>{
      event.preventDefault();
      activeYn.value=false;
      detailData.value={}
      questionList.value=[];
      completeYn.value=false;
      totalScore.value=0;
      totalResultClickYn.value=false;
      totalAnswer.value="답변을 선택한 후 점수 계산하기를 누르세요.";
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"testDiagnosisState","stateYn":false});
    }

    const connectInitFunc = async (iconData)=>{
      setTimeout(()=>{
        activeYn.value=true;
        detailData.value=iconData;
      },150);
      diagonisData.value={}

      let sendDataurl = iconData.dataUrl;
      if (sendDataurl.indexOf("http") < 0){
        sendDataurl = CONFIG.LOCAL_API_URL+sendDataurl;
      }

      let resultData = await CommonUtil.ajaxGetSyncJsonProc(sendDataurl);
      diagonisData.value=resultData.data;
      questionList.value=diagonisData.value.questionList.slice();

      questionList.value = questionList.value.map((qData)=>{
        qData.score=0;
        qData.checkYn=false;
        return qData;
      });

      totalAnswer.value="답변을 선택한 후 점수 계산하기를 누르세요.";
    }

    //답변을 체크할 시
    const selectAnswerCheckClick = (qIndex,wScore)=>{
      questionList.value[qIndex].score=wScore;
      questionList.value[qIndex].checkYn=true;
    }

    //점수계산하기
    const totalScoreCalcClick = (event)=>{
      event.preventDefault();
      completeYn.value=false;
      totalScore.value=0;
      totalResultClickYn.value=true;

      for (let qData of questionList.value) {
        if (qData.checkYn ==false){
          completeYn.value=false;
          totalScore.value=0;
          totalAnswer.value="선택되지 않은 답변이 있습니다."
          break;
        }
        completeYn.value=true;
        totalScore.value +=qData.score;
      }

      if (completeYn.value==true){
        totalAnswer.value=""
        const descriptionList = diagonisData.value.descriptionList;
        let rowCnt = descriptionList.length;

        for (let i=0;i<rowCnt;i++){
          let descData = descriptionList[i];
          let minData = 0;
          let maxData = 0;
          if (descData.scoreTerm.indexOf("~") >=0){
            minData=parseInt(descData.scoreTerm.split("~")[0])
            maxData=parseInt(descData.scoreTerm.split("~")[1])
          }else{
            minData=parseInt(descData.scoreTerm)
            maxData=10000;
          }

          if (totalScore.value >=minData &&  totalScore.value <=maxData){
            totalAnswer.value=descData.scoreTermTitle;
          }
        }
      }
    }

    return{
      activeYn,
      selectCloseClick,
      detailData,
      connectInitFunc,
      modalContentBodyRef,
      diagonisData,
      completeYn,
      questionList,
      selectAnswerCheckClick,
      totalScoreCalcClick,
      totalAnswer,
      totalScore,
      totalResultClickYn,
    }
  }
}
</script>
