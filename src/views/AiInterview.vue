<template>
  <div class="content-outer">
    <div class="main-title">직업진로</div>
  </div>
</template>
<script>
import { ref,onMounted,onUpdated,onUnmounted,onBeforeMount,computed } from 'vue';
import { useStore } from "vuex";
import {useRoute} from "vue-router";
import CommonUtil   from "@/util/CommonUtil";

export default {
  name: "AiInterview",
  components: {

  },
  setup(props){
    const storeData = useStore();
    const routeData = useRoute();
    let itemIndex = 0;
    let itemData = ref({});

    onBeforeMount(async ()=>{
      console.log("=== AiInterview onBeforeMount START ===");
      itemIndex = parseInt(routeData.query.itemIndex);
      itemData.value=CommonUtil.getConfigItemData(storeData.state.configStore.itemList,itemIndex);

      console.log("=== AiInterview onBeforeMount END ===");
    });

    onMounted(()=>{
      console.log("=== AiInterview onMounted START ===");
      //CommonUtil.staticAccess(staticUrl,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,routeData.query.statisticCd);
      console.log("=== AiInterview onMounted END ===");
    });

    onUnmounted(()=>{
      console.log("=== AiInterview onUnmounted START ===");
      console.log("=== AiInterview onUnmounted END ===");
    });

    return{
      itemData,
    }
  }
}
</script>
