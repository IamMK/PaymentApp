<template>
  <div class="home">
    <the-calendar />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TheCalendar from "@/components/TheCalendar.vue"; // @ is an alias to /src

@Options({
  components: {
    TheCalendar,
  },
})
export default class HomeView extends Vue {}
</script>
