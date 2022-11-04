<template>
  <section class="year">
    <i @click="startValue--" class="fa-solid fa-arrow-left"></i>
    <div @click="confirm(startValue - 1)">{{ startValue - 1 }}</div>
    <div @click="confirm(startValue)">{{ startValue }}</div>
    <div @click="confirm(startValue + 1)">{{ startValue + 1 }}</div>
    <i @click="startValue++" class="fa-solid fa-arrow-right"></i>
  </section>
</template>

<script setup lang="ts">
//prop startvalue to add

const confirm = (start) => {
  //emit do do
};
</script>
