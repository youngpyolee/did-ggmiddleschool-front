<template>
  <div class="content-outer">
    <div class="main-title">{{ itemData.title }}</div>
    <IconViewList ref="iconViewRef" />
  </div>
</template>
<script>
import { ref,onMounted,onUpdated,onUnmounted,onBeforeMount,computed } from 'vue';
import { useStore } from "vuex";
import {useRoute} from "vue-router";
import CommonUtil   from "@/util/CommonUtil";
import IconViewList from "@/components/IconViewList";

export default {
  name: "SchoolNews",
  components: {
    IconViewList,
  },
  setup(props){
    const storeData = useStore();
    const routeData = useRoute();
    let itemIndex = 0;
    let itemData = ref({});
    let iconList = ref([]);
    let iconViewRef = ref();

    onBeforeMount(async ()=>{
      itemIndex = parseInt(routeData.query.itemIndex);
      itemData.value=CommonUtil.getConfigItemData(storeData.state.configStore.itemList,itemIndex);

    });

    onMounted(()=>{
      CommonUtil.staticAccess(CONFIG.STATIC_URL,storeData.state.configStore.didCd,storeData.state.configStore.didEqpmnCd,routeData.query.statisticCd);
      iconViewRef.value.connectInit(itemData.value);
    });

    onUnmounted(()=>{
      //comment
    });

    return{
      itemData,
      iconList,
      iconViewRef,
    }
  }
}
</script>
