<template>
  <div class="gnb-wrap">
    <nav>
      <a href="javascript:void(0)" v-for="(itemData,itemIndex) in $store.state.configStore.itemList" :class="{'active':itemData.activeYn=='Y'}" @click="menuMoveClick($event, itemData.name, itemData.itemIndex,itemData.statsCd)" @touchend="menuMoveClick($event, itemData.name, itemData.itemIndex,itemData.statsCd)"><img :src="itemData.gnbOnUrl" alt="" /><span>{{itemData.title}}</span></a>
    </nav>
  </div>
</template>
<script>
import { ref, onMounted,onUpdated,onUnmounted,onBeforeMount } from 'vue';
import { useStore } from "vuex";
import {useRouter} from "vue-router";

export default {
  name: "Gnb",
  setup(){
    const storeData = useStore();
    const router = useRouter();

    onBeforeMount(()=>{
      //comment
    });

    const menuMoveClick = (event,itemName,itemIndex,statsCd)=>{
      event.preventDefault()
      storeData.dispatch("configStore/configItemActiveSaveAction" , itemIndex);
      router.replace({'name': itemName, 'query': {'searchDidCd' : storeData.state.configStore.didCd,"searchDidEqpmnCd":storeData.state.configStore.didEqpmnCd , "statisticCd":statsCd, "itemIndex":itemIndex}})
          .catch(error => {
            if(error.name != "NavigationDuplicated" ){
              throw error;
            }
          });
    };

    return{
      menuMoveClick,
    }
  }
}
</script>
<style lang="scss" scoped>
.gnb-wrap{
  touch-action: none;
}
</style>
