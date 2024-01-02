<template>
  <header>
    <div class="logo">
      <a href="javascript:void(0)" class="active" @touchend="goHome" @click="goHome"><a href="javascript:void(0)" class="active"><img :src="$store.state.configStore.logoUrl" alt="" /></a>	</a>
    </div>
    <div class="weather-outer">
      <div class="weather-info">
        <div class="dust">미세먼지 {{$store.state.weatherDustStore.pm10ValueText}}</div>
        <div class="temper">{{$store.state.weatherDustStore.t1h}}°</div>
      </div>
      <div class="weather-icon">
        <div class="wt-01"></div>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, onMounted,onUpdated,onUnmounted,onBeforeMount } from 'vue';
import { useStore } from "vuex";

export default {
  name: "Header",
  setup(){
    const storeData = useStore();
    onBeforeMount(()=>{
      //comment
    });

    const goHome = (event)=>{
      document.location.href="/index.html?searchDidCd="+storeData.state.configStore.didCd+"&searchDidEqpmnCd="+storeData.state.configStore.didEqpmnCd;
      event.preventDefault()
    }

    return{
      goHome,
    }
  }
}
</script>
<style lang="scss" scoped>
header{
  touch-action: none;
}

.logo{
  touch-action: none;
}
.weather-outer{
  touch-action: none;
}
</style>
