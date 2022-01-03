<template>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
  <icon-accessibility/>
  <DataCheck class="styled-icon"/>
</template>

<script setup>
import IconAccessibility from '~icons/carbon/accessibility'
import DataCheck from '~icons/carbon/data-check'</script>

<style>
.styled-icon{
  animation: rotate infinite 20s linear;
  height: 25rem;
  width: 25rem;
  display: inline-block;
  margin: auto;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>

<route lang="yaml">
meta:
layout: home
</route>
