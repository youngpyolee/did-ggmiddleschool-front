<template>
  <div :class="{'modal-outer':true,'active':activeYn==true}">
    <div class="modal-inner">
      <div class="modal-title">{{ detailData.subTitle }}</div>
      <div class="modal-body">
        <div class="modal-content-outer">
          <div class="modal-content-inner">
            <!-- 내용 -->
            <div class="modal-content-body">
              <!-- iframe start -->
              <div class="iframe-outer">
                <div class="qr" v-if="detailData.qrCd !='N'"><img :src="detailData.qrCd" alt=""></div>
                <iframe :src="detailData.dataUrl" ref="iframeDataUrlRef"></iframe>
              </div>
              <!-- iframe end -->
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
  name: "IframePopComponent",
  components: {

  },
  setup(props){
    const storeData = useStore();
    const routeData = useRoute();
    let activeYn =ref(false);
    let detailData =ref({});
    let iframeDataUrlRef =ref();


    onBeforeMount(async ()=>{
      //comment
    });

    onMounted(()=>{
      console.log("iframepopcomponent")
    });

    onUnmounted(()=>{
      activeYn.value=false;
    });

    const selectCloseClick =(event)=>{
      //comment
      event.preventDefault();
      activeYn.value=false;
      detailData.value={}
      storeData.dispatch("modalPopStore/modalProcStateAction" , {"stateNm":"iconPopState","stateYn":false});
    }

    const connectInitFunc = (iconData)=>{
      setTimeout(()=>{
        activeYn.value=true;
        detailData.value=iconData;
        iframeSetting();

      },150)
    }

    const iframeSetting = ()=>{
      /*iframeDataUrlRef.value.onload = ()=>{
        let iframe = iframeDataUrlRef.value;
        let iframeBody = iframe.contentWindow.document.body;
        let iframeHeight = iframeBody.scrollHeight + 'px';
        iframe.contentWindow.document.body.style.height = "100px";
        //iframeBody.style.height="300px"
        //console.log("iframeHeight="+iframeDataUrlRef.value.style.height)*!/
        //iframeDataUrlRef.value.style.height="100px"
      }

      /!*  iframeDataUrlRef.value.addEventListener('load', ()=> {
          console.log("loadss")
          let iheight = iframeDataUrlRef.value.contentDocument.body.height;
          console.log("iheight",iheight)
        });*!/*/
    }

    return{
      activeYn,
      selectCloseClick,
      detailData,
      connectInitFunc,
      iframeDataUrlRef,
    }
  }
}
</script>
