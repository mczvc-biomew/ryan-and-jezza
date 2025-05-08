<template>
  <div class="w-full page-container">
    <SectionMain/>
    <SectionReception/>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const getSrc = (path: string): string => {
  const modules = import.meta.glob("/assets/**/*", { eager: true});
  const file = <{ default: string }>(modules[path]) || {default: ''};

  return file.default || '';
}

// useSeo({
//   type: 'WebSite',
//   location: route.path,
//   icon: getSrc("/assets/favicon.ico"),
//   useConfig: true
// });
useTitle('Ryan Christian and Jezza are Getting Married!');

</script>

<style lang="less">
body {
  @apply m-0;
}
// .page-container {
// }

</style>