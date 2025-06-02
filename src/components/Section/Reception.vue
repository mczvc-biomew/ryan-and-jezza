<template>
  <div class="heading flex">
    <div class="heading-column py-8 flex justify-center">
      <span class="divider"></span>
    </div>
    <div class="links-column flex gap-7 nav-links animate-on-scroll-all">
      <ul class="flex">
        <li class="animate-slide-left-50">
          <NuxtLink>Invitation</NuxtLink>
        </li>
        <li class="animate-slide-left-50">
          <NuxtLink>Details</NuxtLink>
        </li>
        <li class="animate-slide-left-50">
          <NuxtLink>RSVP</NuxtLink>
        </li>
      </ul>
    </div>
    <div class="heading-column py-8 flex justify-center">
      <span class="divider"></span>
    </div>
  </div>
</template>

<script setup lang="ts">

function init() {

  const revealOnScrollObserver = new IntersectionObserver((entries) => {
    entries.forEach( (entry) => {
      if (entry.isIntersecting) {
        let timing = 500;
        Array.from(entry.target.querySelectorAll('.animate-slide-left-50')).forEach((el) => {
          setTimeout( () => {
            el.classList.add('reveal');
          }, timing);
          timing += 500;
        })
      }
    });
  }, { threshold: 0.5});
  Array.from(document.querySelectorAll('.animate-on-scroll-all')).forEach( (el) => {
    revealOnScrollObserver.observe(el);
  });

}

onMounted( () => {
  init();
});
</script>

<style>

.heading {
  flex-direction: column;
  justify-content: space-around;
}

.heading-column {
  width: 100%;
  height: 1px;

}

.links-column {
  width: 100vw;
  position: relative;
  overflow-x: hidden;
}

@media (min-width: 768px) {
  .heading {
    flex-direction: row;
  }
  .heading-column {
    width: 23.023%;
  }
}

.nav-links {
  font-size: 1.2rem;
  font-family: 'Quicksand', sans-serif;
  line-height: 1.85;
}

.divider {
  mask-image: url("~/assets/images/divider.svg");
  mask-size: auto 100%;
  mask-repeat: repeat-x;

  min-height: 20px;
  width: 48%;
  display: block;
}
</style>

<style lang="less">
@import url(~/assets/css/less/variables.less);

.links-column {
  justify-content: center;
  ul {
    list-style-type: none;
    padding-left: 0;
    li {
      padding: 5px;
      height: 100%;
      display: inline-block;

      &:after {
          content: '';
          display: block;
          height: 2px;
          background-color: @border-color;
          transition: width ease 500ms;
          width: 0;
      }
      &:hover {
        &:after {
          width: 100%;
        }
      }

      a {
        cursor: pointer;
      }
    }
  }
}

.divider {
  background-color: @border-color;
}
</style>