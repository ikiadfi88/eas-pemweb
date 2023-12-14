<script>
import PesertaList from "../components/PesertaList.vue";

export default {
  components: {
    PesertaList,
  },
};
</script>

<template>
  <main class="min-h-full w-full flex flex-col justify-center p-8">
    <div class="w-full h-full justify justify-center flex flex-col mt-3 px-56">
      <PesertaList />
    </div>
  </main>
</template>
