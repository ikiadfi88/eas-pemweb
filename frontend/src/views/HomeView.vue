<script>
import Popup from "../components/Popup.vue";
import PesertaList from "../components/PesertaList.vue";
import Header from "../components/Header.vue";

export default {
  components: {
    Popup,
    PesertaList,
    Header,
  },
};
</script>

<template>
  <main class="min-h-full w-full flex flex-col justify-center p-8">
    <div class="w-full h-full justify justify-center flex flex-col mt-3 px-56">
      <Header />
      <PesertaList />
    </div>
  </main>
</template>
