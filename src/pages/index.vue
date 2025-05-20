<template>
  <div class="w-full page-container">
    <SectionMain/>
    <SectionReception/>
    <SectionDetails/>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();


useSeo({
  type: 'WebSite',
  location: route.path,
  icon: getSrcAssets("/assets/favicon.ico"),
  useConfig: true
});

function init() {

  const revealOnScrollObserver = new IntersectionObserver((entries) => {
    entries.forEach( (entry) => {
      if (entry.isIntersecting)
        entry.target.classList.add('reveal');
    });
  }, { threshold: 0.5});
  Array.from(document.querySelectorAll('.animate-on-scroll')).forEach( (el) => {
    revealOnScrollObserver.observe(el);
  });

  let timeSequence = 1000;
  const animateOnce = document.querySelectorAll('.animate-once');
  animateOnce.forEach( (el) => {
    setTimeout( () => {
      el.classList.add('reveal');
    }, timeSequence);
    timeSequence += 500;
  });
}

onMounted( () => {
  init();
});

</script>

<style lang="less">
body {
  @apply m-0;
}

.animate-reveal-up(@translate-y) {
  transition: transform ease 2s, opacity ease 800ms;
  transform: translate3d(0, @translate-y, 0);
  opacity: 0;

  &.reveal {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

.animate-spin-y(@y-deg) {
  transition: transform ease 1s, opacity ease 800ms;
  --translate-x: 40vw;
  --rotate-y: @y-deg;
  transform: translateX(var(--translate-x)) rotateY(var(--rotate-y));
  opacity: 0;

  &.reveal {
    --rotate-y: 0;
    --translate-x: 50vw;
    opacity: 1;
  }
}

.animate-slide-left(@x) {
  transition: transform ease 500ms, opacity ease 400ms;
  --translate-x: @x;
  transform: translateX(var(--translate-x));
  opacity: 0;

  &.reveal {
    --translate-x: 0;
    opacity: 1;
  }
}

.animate-slide-right(@x) {
  transition: transform ease 500ms, opacity ease 400ms;
  --translate-x: calc(0px - @x);
  transform: translateX(var(--translate-x));
  opacity: 0;

  &.reveal {
    --translate-x: 0;
    opacity: 1;
  }
}

.animate-slide-left-50 {
  .animate-slide-left(30vw);
}

.animate-slide-left-100 {
  .animate-slide-left(250px);
}

.animate-slide-right-100 {
  .animate-slide-right(250px);
}

.animate-spin-y {
  .animate-spin-y(720deg);
}

.animate-reveal-up-50 {
  .animate-reveal-up(50px);
}

.animate-reveal-up-100 {
  .animate-reveal-up(100%);
}
</style>