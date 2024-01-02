<template>
  <div class="content-outer">
    <div class="main-title">{{ itemData.title }}</div>
    <div class="sch-info-outer">
      <div class="modal-body">
        <div class="modal-content-outer">
          <div class="modal-content-inner">
            <!-- 내용 -->
            <div class="modal-content-header">
              <div class="title">{{ displaySchulNm }}</div>
              <div class="modal-tabmenu">
                <div :class="{active:searchInfoType=='SchoolInfoDetailMain'}"><a href="javascript:void(0)" @touchend="searchInfoTypeSelectClick($event,'SchoolInfoDetailMain')" @click="searchInfoTypeSelectClick($event,'SchoolInfoDetailMain')">학교정보</a></div>
                <div :class="{active:searchInfoType=='SchoolInfoAlbumMain'}"><a href="javascript:void(0)"  @touchend="searchInfoTypeSelectClick($event,'SchoolInfoAlbumMain')" @click="searchInfoTypeSelectClick($event,'SchoolInfoAlbumMain')">학교앨범</a></div>
              </div>
            </div>
            <SchoolInfoDetailMain v-show="searchInfoType=='SchoolInfoDetailMain'"  ref="schoolInfoDetailMainRef"></SchoolInfoDetailMain>
            <SchoolInfoAlbumMain   v-show="searchInfoType=='SchoolInfoAlbumMain'"    ref="schoolInfoAlbumMainRef"></SchoolInfoAlbumMain>
          </div>
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
import { GChart } from "vue-google-charts";
import SchoolInfoDetailMain from "@/views/SchoolInfoDetailMain"
import SchoolInfoAlbumMain from "@/views/SchoolInfoAlbumMain"
export default {
  name: "SchoolInfoMain",
  components: {
    GChart,
    SchoolInfoDetailMain,
    SchoolInfoAlbumMain
  },
  setup(props,context) {
    const storeData = useStore();
    const routeData = useRoute();
    let activeYn = ref(false);
    let itemIndex = 0;
    let itemData = ref({});
    let searchSchoolCd = ref("");
    let displaySchulNm = ref("");
    let searchInfoType=ref("A");

    let schoolInfoDetailMainRef =ref();
    let schoolInfoAlbumMainRef =ref();


    onBeforeMount(() => {
      itemIndex = parseInt(routeData.query.itemIndex);
      itemData.value=CommonUtil.getConfigItemData(storeData.state.configStore.itemList,itemIndex);
      searchSchoolCd.value=itemData.value.schoolCd;
      let dataFrame = storeData.state.dataStore.highschoolDataFrame;
      let schulInfoData =dataFrame.loc({rows:dataFrame["schulCd"].eq(searchSchoolCd.value)});

      displaySchulNm.value=schulInfoData["schulNm"].values[0];
    });


    onMounted(() => {
      masterInitFunc();
    });

    onUnmounted(() => {
      //
    });

    const masterInitFunc = ()=>{
      CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,routeData.query.statisticCd);
      searchInfoType.value="SchoolInfoDetailMain";
      searchInfoTypeSelectFunc(searchInfoType.value);
    }

    const searchInfoTypeSelectClick = (event,pSearchInfoType)=>{
      event.preventDefault();
      searchInfoType.value=pSearchInfoType;

      searchInfoTypeSelectFunc(pSearchInfoType)

    }

    const searchInfoTypeSelectFunc = (pSearchInfoType)=>{
      let compData = CommonUtil.getConfigSubCompData(itemData.value.subItemList,pSearchInfoType);

      CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,compData.statsCd);

      if (pSearchInfoType=="SchoolInfoDetailMain"){
        schoolInfoDetailMainRef.value.connectInitFunc(searchSchoolCd.value);
      }
      else if (pSearchInfoType=="SchoolInfoAlbumMain"){
        schoolInfoDetailMainRef.value.connectOutFunc();
        schoolInfoAlbumMainRef.value.connectInitFunc(searchSchoolCd.value,compData.statsCd);
      }
    }


    return {
      activeYn,
      itemData,
      searchSchoolCd,
      searchInfoType,
      displaySchulNm,
      schoolInfoDetailMainRef,
      schoolInfoAlbumMainRef,
      searchInfoTypeSelectClick,
    }
  }
}
</script>
