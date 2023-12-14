import { reactive } from "vue";

export const ChannelStore = reactive({
  Channels: [],

  createChannel(Channel) {
    this.Channels.push(Channel);
  },

  updateChannel(updatedChannel) {
    const ChannelIndex = this.Channels.findIndex((Channel) => Channel.id === updatedChannel.id);
    if (ChannelIndex !== -1) {
      this.Channels.splice(ChannelIndex, 1, updatedChannel);
    } else {
      this.Channels.push(updatedChannel);
    }
  },

  deleteAllChannels() {
    this.Channels = [];
  },
});

import { createStore } from "vuex";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
