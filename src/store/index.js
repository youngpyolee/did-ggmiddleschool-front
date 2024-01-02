import { createStore } from 'vuex';
import configStore from './configStore';
import weatherDustStore from './weatherDustStore';
import dataStore from './dataStore';
import modalPopStore from './modalPopStore';

export default createStore({
  modules: {
    configStore,
    weatherDustStore,
    dataStore,
    modalPopStore,
  }
})