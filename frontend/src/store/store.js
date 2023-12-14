import { reactive } from "vue";

export const PesertaStore = reactive({
  Pesertas: [],

  createPeserta(Peserta) {
    this.Pesertas.push(Peserta);
  },

  updatePeserta(updatedPeserta) {
    const PesertaIndex = this.Pesertas.findIndex((Peserta) => Peserta.id === updatedPeserta.id);
    if (PesertaIndex !== -1) {
      this.Pesertas.splice(PesertaIndex, 1, updatedPeserta);
    } else {
      this.Pesertas.push(updatedPeserta);
    }
  },

  deleteAllPesertas() {
    this.Pesertas = [];
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
