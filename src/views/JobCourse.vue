<template>
  <div class="content-outer">
    <div class="main-title">{{ itemData.title }}</div>
    <!-- 이슈매거진 start -->
    <div class="magazine" @touchend="selectMagzineClick($event,'MagazineDetail')" @click="selectMagzineClick($event, 'MagazineDetail')">
      <a href="javascript:void(0)"><img :src="mainBannerTitleImg" alt="" /></a>
    </div>
    <!-- 이슈매거진 end -->

    <!-- 직무인터뷰 start -->
    <div class="content-box">
      <div class="title-outer">
        <div class="title">직무인터뷰 <span>내가 꿈꾸는 진로</span></div>
        <a href="javascript:void(0)" @click="selectPopClick($event,'DutyInterviewList')" @touchend="selectPopClick($event, 'DutyInterviewList')"><div class="btn btn-more">더보기</div></a>
      </div>
      <a href="javascript:void(0)" @click="selectDetailInterviewClick($event,'DutyInterviewList')" @touchend="selectDetailInterviewClick($event,'DutyInterviewList')">
        <div class="thumb-info-outer">
          <div class="pic"><img :src="mainDutyInterviewData.titleImg" alt="" /></div>
          <div class="info-outer">
            <div class="thumb-sum">{{mainDutyInterviewData.register}}</div>
            <div class="thumb-tit">{{mainDutyInterviewData.title}}</div>
          </div>
        </div>
      </a>
    </div>
    <!-- 직무인터뷰 end -->
    <!-- 배너  -->
    <div class="box-column">
      <div class="content-box" data-banner="1">
        <a href="javascript:void(0)" @click="selectPopClick($event, 'KoreaPresentOccp')" @touchend="selectPopClick($event, 'KoreaPresentOccp')">
          <div class="banner-outer">
            <div class="banner-title">대한민국 대표직업</div>
            <div class="banner-sum">관심있는 분야의 대표직업의 <br />다양한 정보와 전망을 <br />확인해 보세요.</div>
            <div class="banner-go"></div>
          </div>
        </a>
      </div>
      <div class="content-box" data-banner="2">
        <a href="javascript:void(0)" @click="selectPopClick($event,'ThemePerOccp')" @touchend="selectPopClick($event,'ThemePerOccp')">
          <div class="banner-outer">
            <div class="banner-title">테마별 직업</div>
            <div class="banner-sum">20가지 테마로 <br />정리한 직업정보입니다. <br />관심있는 테마를 선택하세요.</div>
            <div class="banner-go"></div>
          </div>
        </a>
      </div>
    </div>
    <div class="box-column">
      <div class="content-box" data-banner="3">
        <a href="javascript:void(0)" @click="selectPopClick($event,'UnUseOccp')" @touchend="selectPopClick($event,'UnUseOccp')">
          <div class="banner-outer">
            <div class="banner-title">이색직업</div>
            <div class="banner-sum">
              여러분이 몰랐던<br />
              다양하고 흥미로운 직업들을 <br />알아보세요.
            </div>
            <div class="banner-go"></div>
          </div>
        </a>
      </div>
      <div class="content-box" data-banner="4">
        <a href="javascript:void(0)" @click="selectPopClick($event,'NewOccp')" @touchend="selectPopClick($event,'NewOccp')">
          <div class="banner-outer">
            <div class="banner-title">신직업·미래직업</div>
            <div class="banner-sum">
              우리의 미래를<br />
              함께 할 새로운 직업! <br />유망한 직업들을 확인해 보세요.
            </div>
            <div class="banner-go"></div>
          </div>
        </a>
      </div>
    </div>
    <teleport to="#modalPopUp">
      <!-- 이슈매거진 start -->
      <MagazineDetail v-show="$store.state.modalPopStore.magazinePopState==true"      ref="magazineDetailRef" />
      <!-- 이슈매거진 end  -->
      <!-- 직무인터뷰 목록 start -->
      <DutyInterviewList v-show="$store.state.modalPopStore.dutyInterviewPopState==true" :dutyInterviewParamList="dutyInterviewList"  @selectInterviewDetailEvent="selectInterviewDetailEventFunc" ref="dutyInterviewListRef" />
      <!-- 직무인터뷰 목록 end  -->
      <!-- 직무인터뷰 상세 start -->
      <DutyInterviewDetail v-show="$store.state.modalPopStore.dutyInterviewDetailPopState==true"  ref="dutyInterviewDetailRef" />
      <!-- 직무인터뷰 상세 end  -->
      <!--대한민구 대표직업 start -->
      <KoreaPresentOccp v-show="$store.state.modalPopStore.koreaPresentOccpState==true"  ref="koreaPresentOccpRef" @selectDetailClickEvent="selectKoreaOccpDetailClickEventFunc" />
      <!--대한민구 대표직업 end -->
      <!--대한민구 대표직업  상세 start -->
      <KoreaPresentOccpDetail v-show="$store.state.modalPopStore.koreaPresentOccpDetailState==true"  ref="koreaPresentOccpDetailRef" />
      <!--대한민구 대표직업 상세 end -->
      <!-- 테마별직업 start -->
      <ThemePerOccp v-show="$store.state.modalPopStore.themePerOccpState==true"  :masterCdList ="themeOccpMasterList" ref="themePerOccpRef" @selectDetailClickEvent="selectThemePerOccpDetailClickEventFunc"/>
      <!-- 테마별직업 end -->
      <!-- 테마별직업 상세 start -->
      <ThemePerOccpDetail v-show="$store.state.modalPopStore.themePerOccpDetailState==true"  ref="themePerOccpDetailRef" />
      <!-- 테마별직업 상세 end -->
      <!-- 이색직업 start -->
      <UnUseOccp v-show="$store.state.modalPopStore.unUseOccpPopState==true"  :masterCdList="unUseOccpMasterList"  ref="unUseOccpRef"  @selectDetailClickEvent="selectUnUseOccpDetailClickEventFunc" />
      <!-- 이색직업 end -->
      <!-- 이색직업 상세 start -->
      <UnUseOccpDetail v-show="$store.state.modalPopStore.unUseOccpPopDetailState==true"  ref="unUseOccpDetailRef" />
      <!-- 이색직업 상세 end -->
      <!-- 신직업 start -->
      <NewOccp v-show="$store.state.modalPopStore.newOccpPopState==true"    :masterCdList="newOccpMasterList" ref="newOccpRef" @selectDetailClickEvent="selectNewOccpDetailClickEventFunc"/>
      <!-- 신직업 end -->
      <!-- 신직업 상세 start -->
      <NewOccpDetail v-show="$store.state.modalPopStore.newOccpDetailState==true"  ref="newOccpDetailRef" />
      <!-- 신직업 상세 end -->

    </teleport>
  </div>
</template>
<script>
import { ref,onMounted,onUpdated,onUnmounted,onBeforeMount,computed } from 'vue';
import { useStore } from "vuex";
import {useRoute} from "vue-router";
import CommonUtil   from "@/util/CommonUtil";
import MagazineDetail from "@/views/MagazineDetail";
import DutyInterviewList from "@/views/DutyInterviewList";
import DutyInterviewDetail from "@/views/DutyInterviewDetail";
import KoreaPresentOccp from "@/views/KoreaPresentOccp";
import KoreaPresentOccpDetail from "@/views/KoreaPresentOccpDetail";
import ThemePerOccp from "@/views/ThemePerOccp";
import ThemePerOccpDetail from "@/views/ThemePerOccpDetail";

import UnUseOccp from "@/views/UnUseOccp";
import UnUseOccpDetail from "@/views/UnUseOccpDetail";
import NewOccp from "@/views/NewOccp";
import NewOccpDetail from "@/views/NewOccpDetail";

//직업진로 컴로턴트
export default {
  name: "JobCourse",
  components: {
    MagazineDetail,
    DutyInterviewList,
    DutyInterviewDetail,
    KoreaPresentOccp,
    KoreaPresentOccpDetail,
    ThemePerOccp,
    ThemePerOccpDetail,
    UnUseOccp,
    UnUseOccpDetail,
    NewOccp,
    NewOccpDetail,
  },
  setup(props){
    const storeData = useStore();
    const routeData = useRoute();
    let itemIndex = 0;
    let itemData = ref({});
    let subItemList =ref([]);
    let mainBannerTitleImg =ref("");
    let subItemData = ref({});
    let saveStatsCd = ref("");
    let magazineDetailRef =ref();
    let dutyInterviewListRef=ref();
    let dutyInterviewList=ref([]);
    let dutyInterviewDetailRef=ref();
    let mainDutyInterviewData= ref({});
    let koreaPresentOccpRef =ref();
    let koreaPresentOccpDetailRef=ref();
    let themePerOccpRef =ref();
    let themePerOccpDetailRef =ref();
    let themeOccpMasterList=ref([]);
    let unUseOccpRef =ref();
    let unUseOccpDetailRef =ref();
    let newOccpRef=ref();
    let newOccpDetailRef=ref();
    let unUseOccpMasterList =ref([])
    let newOccpMasterList =ref([])


    onBeforeMount(async ()=>{
      itemIndex = parseInt(routeData.query.itemIndex);
      itemData.value=CommonUtil.getConfigItemData(storeData.state.configStore.itemList,itemIndex);
      subItemList.value=itemData.value.subItemList;
    });

    onMounted(()=>{
      CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,routeData.query.statisticCd);
      masterInitFunc();
    });

    onUnmounted(()=>{
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"magazinePopState","stateYn":false});
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"dutyInterviewPopState","stateYn":false});
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"dutyInterviewDetailPopState","stateYn":false});
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"koreaPresentOccpState","stateYn":false});
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"themePerOccpState","stateYn":false});
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"themePerOccpDetailState","stateYn":false});
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"newOccpPopState","stateYn":false});
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"newOccpDetailState","stateYn":false});
    });


    //직업진로락 로드된이후 해야할일 규정
    const masterInitFunc = ()=>{
      let mgznFileUrl =  CONFIG.LOCAL_API_URL+CommonUtil.getConfigSubCompData(subItemList.value,"MagazineDetail").dataUrl;
      let result = CommonUtil.ajaxGetAsyncJsonParamProc(mgznFileUrl,null);
      result.then((reponse)=>{
        let sendBannerFileNm=reponse.data.dataList[0].mgznBannerFileNm;
        if (sendBannerFileNm.indexOf("http") < 0){
          sendBannerFileNm = CONFIG.LOCAL_API_URL+sendBannerFileNm;
        }
        mainBannerTitleImg.value=sendBannerFileNm;
      })
      .catch(()=>{
        mainBannerTitleImg.value="";
      });

      let mainFirstDutyInterviewUrl =  CONFIG.LOCAL_API_URL+CommonUtil.getConfigSubCompData(subItemList.value,"DutyInterviewList").dataUrl;
      let mainFirstDutyImgUrlResult = CommonUtil.ajaxGetSyncJsonProc(mainFirstDutyInterviewUrl,null);
      mainFirstDutyImgUrlResult.then((response)=>{
        mainDutyInterviewData.value=response.data
      }).catch(()=>{
        mainDutyInterviewData.value={}
      });

      dutyInterviewList.value   = CommonUtil.getConfigSubCompData(subItemList.value,"DutyInterviewList").dutyInterviewList.dutyInterviewItem;
      themeOccpMasterList.value =  CommonUtil.getConfigSubCompData(subItemList.value,"ThemePerOccp").occpItemDataList.occpItemData;
      unUseOccpMasterList.value =  CommonUtil.getConfigSubCompData(subItemList.value,"UnUseOccp").occpItemDataList.occpItemData;
      newOccpMasterList.value   =  CommonUtil.getConfigSubCompData(subItemList.value,"NewOccp").occpItemDataList.occpItemData;
    };

    //이슈매거진을 클릭시
    const selectMagzineClick = async (event,itemName)=>{
      event.preventDefault();
      let subItemData = CommonUtil.getConfigSubCompData(subItemList.value,itemName);
      saveStatsCd.value = subItemData.statsCd;

      //통계처리
      CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,subItemData.statsCd);
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"magazinePopState","stateYn":true});
      let result = await magazineDetailRef.value.connectInitFunc(saveStatsCd.value);
    };

    //직무인터뷰,테마별직업 클릭시
    const selectPopClick = async (event,itemName)=>{
      event.preventDefault();
      let subItemData = CommonUtil.getConfigSubCompData(subItemList.value,itemName);
      saveStatsCd.value = subItemData.statsCd;

      //통계처리
      CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,subItemData.statsCd);
      if (itemName == "DutyInterviewList"){
        storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"dutyInterviewPopState","stateYn":true});
        let result =  dutyInterviewListRef.value.connectInitFunc(saveStatsCd.value);
      }
      else if (itemName =="KoreaPresentOccp"){
        storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"koreaPresentOccpState","stateYn":true});
        let result =  koreaPresentOccpRef.value.connectInitFunc(saveStatsCd.value);
      }
      else if (itemName =="ThemePerOccp"){
        storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"themePerOccpState","stateYn":true});
        let result =  themePerOccpRef.value.connectInitFunc(saveStatsCd.value);
      }
      //이색직업
      else if (itemName =="UnUseOccp"){
        storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"unUseOccpPopState","stateYn":true});
        let result =  unUseOccpRef.value.connectInitFunc(saveStatsCd.value);
      }
      //신직업
      else if (itemName =="NewOccp"){
        storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"newOccpPopState","stateYn":true});
        let result =  newOccpRef.value.connectInitFunc(saveStatsCd.value);
      }
    };


    //인터뷰목록에서 인터뷰 상세를 클릭했을 경우
    const selectInterviewDetailEventFunc = (itemInterviewData)=>{
      CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,saveStatsCd.value);
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"dutyInterviewDetailPopState","stateYn":true});
      dutyInterviewDetailRef.value.connectInitFunc(saveStatsCd.value ,true,itemInterviewData)
    }

    const selectDetailInterviewClick = (event,itemName)=>{
      event.preventDefault();
      let subItemData = CommonUtil.getConfigSubCompData(subItemList.value,itemName);
      saveStatsCd.value = subItemData.statsCd;

      //통계처리
      CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,subItemData.statsCd);
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"dutyInterviewDetailPopState","stateYn":true});
      dutyInterviewDetailRef.value.connectInitFunc(saveStatsCd.value ,false ,mainDutyInterviewData.value);
    }

    //대포직업목록에서 상세클릭시 넘어온 이벤트처리
    const selectKoreaOccpDetailClickEventFunc = (detailData)=>{
      CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,saveStatsCd.value);
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"koreaPresentOccpDetailState","stateYn":true});
      koreaPresentOccpDetailRef.value.connectInitFunc(saveStatsCd.value ,detailData,"WHAT_WORK")
    }

    //테마별직어베서 상세클릭시 넘어온 이벤트처리
    const selectThemePerOccpDetailClickEventFunc = (detailData)=>{
      CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,saveStatsCd.value);
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"themePerOccpDetailState","stateYn":true});
      themePerOccpDetailRef.value.connectInitFunc(saveStatsCd.value ,detailData)
    }

    //이색직업에서 상세클릭시 넘어온 이벤트처리
    const selectUnUseOccpDetailClickEventFunc = (detailData)=>{
      CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,saveStatsCd.value);
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"unUseOccpPopDetailState","stateYn":true});
      unUseOccpDetailRef.value.connectInitFunc(saveStatsCd.value ,detailData)
    }

    //이색직업에서 상세를 클릭시 넘어온 이벤트처리
    const selectNewOccpDetailClickEventFunc = (detailData)=>{
      CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,saveStatsCd.value);
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"newOccpDetailState","stateYn":true});
      newOccpDetailRef.value.connectInitFunc(saveStatsCd.value ,detailData);
    }

    return{
      itemData,
      subItemList,
      mainBannerTitleImg,
      selectMagzineClick,
      subItemData,
      saveStatsCd,
      magazineDetailRef,
      selectPopClick,
      dutyInterviewListRef,
      dutyInterviewList,
      selectInterviewDetailEventFunc,
      dutyInterviewDetailRef,
      selectDetailInterviewClick,
      mainDutyInterviewData,
      koreaPresentOccpRef,
      selectKoreaOccpDetailClickEventFunc,
      koreaPresentOccpDetailRef,
      themePerOccpRef,
      themePerOccpDetailRef,
      themeOccpMasterList,
      selectThemePerOccpDetailClickEventFunc,
      unUseOccpRef,
      unUseOccpDetailRef,
      newOccpRef,
      newOccpDetailRef,
      unUseOccpMasterList,
      selectUnUseOccpDetailClickEventFunc,
      newOccpMasterList,
      selectNewOccpDetailClickEventFunc,
    }
  }
}
</script>
