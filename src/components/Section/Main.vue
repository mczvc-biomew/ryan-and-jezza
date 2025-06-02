<template>
  <section class="section-main">
    <div class="section-main__inner flex flex-col justify-between">

      <div class="bg-animation-wrapper [width:100vw] overflow-x-hidden relative">
        <video class="background-video" autoplay muted loop ref="backgroundVideo">
          <source src="~/assets/video/background.mp4">
        </video>
      </div>

      <div class="ribbon ribbon-top-left"></div>

      <div class="banner-top-right flex justify-end">
        <div class="banner-circular-top-right"></div>
        <div class="banner-circles banner-circles-top-right"></div>
      </div>

      <div class="text-content">
        <div class="wrapper animate-once animate-reveal-up-50 flex justify-center items-center" ref="diamondRing">
          <div class="icon-diamond-ring"></div>
        </div>
        <p class="p-heading animate-once animate-reveal-up-50"
          >The Wedding Day Of
        </p>
        <p class="c-and-j animate-once animate-reveal-up-100" ref="husbandAndWifeEl">
          Christian & Jezza
        </p>

        <div class="wedding-date-wrapper">

          <div class="animate-once animate-slide-right-100">
            <div class="wedding-date wedding-date-left">
              <div class="animate-once animate-reveal-up-50">
                <span class="wedding-date__weekday" ref="weddingWeekdayEl">Friday</span>
              </div>
            </div>
          </div>
          
          <div class="wedding-date-center">
            <div class="animate-once animate-spin-y absolute">
              <span>21</span>
            </div><br>
            <div class="animate-once animate-reveal-up-50">
              <span>NOV</span>
            </div>
          </div>

          <div class="animate-once animate-slide-left-100">
            <div class="wedding-date wedding-date-right">
              <div class="animate-once animate-reveal-up-50 inline-block">
                <Transition :name="weddingHourAnimeName">
                  <div class="inline-block" :key="weddingHour"
                    >{{ weddingHour }}
                  </div>
                </Transition>
                <span> am</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Countdown class="animate-once animate-reveal-up-50"/>

      <div class="banner-bottom-left flex justify-start">
        <div class="banner-circular-bottom-left"></div>
        <div class="banner-circles banner-circles-bottom-left"></div>
      </div>

      <div class="ribbon ribbon-bottom-right"></div>

    </div>
  </section>
</template>

<script setup lang="ts">

const backgroundVideo = ref<HTMLVideoElement>();

const husbandAndWifeEl = ref<HTMLElement>();
const diamondRing = ref<HTMLElement>();
const weddingWeekdayEl = ref<HTMLElement>();
const weddingWeekdayText = ref('');

const weddingHourAnimeName = ref('');

const weddingHour = ref('00');

async function handleClick() {
  await backgroundVideo.value!.play();
  backgroundVideo.value!.loop = true;
}

function init() {

  setTimeout( () => {
    const bgAnimationWrapper = (document.querySelector('.bg-animation-wrapper') as HTMLElement);
    bgAnimationWrapper.style.position = 'initial';
  }, 1600);

  setTimeout( () => {

    const hawTypewritingPending = ref(false);
    animateTypewriting('Christian & Jezza', hawTypewritingPending, husbandAndWifeEl.value, ref(''), 8, true, 200);

    setTimeout( () => {
      const typewritingPending = ref(false);
      animateTypewriting('Friday', typewritingPending, weddingWeekdayEl.value, weddingWeekdayText, 3, true);

      setTimeout( () => {
        weddingHourAnimeName.value = 'reveal-digit';
        weddingHour.value = '09';
      }, 100);
    }, 1000);
  }, 4000);

}

onMounted( async () => {
  init();
  document.documentElement.addEventListener('click', handleClick);
});

onBeforeMount( () => {
  document.documentElement.removeEventListener('click', handleClick);
})
</script>

<style lang="less">
@import url(~/assets/css/less/variables.less);

.section-main {
  height: auto;
  overflow: hidden;
  position: relative;
}

.background-video {
  height: max(100%, 100vw);
  aspect-ratio: 16 / 9;
  position: absolute;
  opacity: 0.2;
  pointer-events: none;
}

.section-main__inner {
  background-color: #7f0021;
  animation: zoom-shake 3s ease;
  height: auto;

  @media (min-width: 516px) {
    height: 100vh;
  }
}

@keyframes zoom-shake {
  0% {
    transform: scale(0.6);
  }
  10% {
    transform: scale(1.0);
  }
  20% {
    transform: scale(0.7);
  }
  30% {
    transform: scale(1.0);
  }
  40% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.0);
  }
}

.text-content {
  color: #f3e0c9;

  @media (min-height: 800px) {
    margin-top: -15rem;
  }
  @media (max-width: 640px) {
    margin-top: 8rem;
  }
}

.icon-diamond-ring {
  width: 50px;
  height: 77px;
  background-size: cover;
  background-image: url('~/assets/images/diamond-ring.webp');
}

.p-heading {
  font-family: 'Lora Italic';
  font-size: 1.2rem;
  text-align: center;
  font-weight: bold;
  margin-top: 4px;
}

.c-and-j {
  font-family: 'Angella White';
  font-size: 7rem;
  text-align: center;
  margin-top: -1.7rem;

  &.tick {
    &::after {
      content: '*';
      width: 0;
    }
  }
}

.wedding-date-wrapper {
  width: 100%;
  position: absolute;
  margin-top: -125px;
}


.wedding-date {
  position: absolute;
  font-size: 1.5rem;
  &::before {
    content: '';
    position: relative;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: @border-color;
    width: 100%;
    height: 10px;
    top: -10px;
    margin-left: -2rem;
    padding-right: 4rem;
    display: block;
  }
  &::after {
    content: '';
    position: relative;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: #b26338;
    width: 100%;
    height: 10px;
    margin-left: -2rem;
    padding-right: 4rem;
    display: block;
  }
  &.wedding-date-left {
    --translate-x: 200px;
    margin-top: 1.4rem;
    transform: translate3d(calc(50vw - var(--translate-x)), 0, 0);
  }
  &.wedding-date-right {
    --translate-x: 130px;
    margin-top: -4.3rem;
    transform: translate3d(calc(50vw + var(--translate-x)), 0, 0);
  }
}

@media (max-width: 444px) {
  .wedding-date {
    &.wedding-date-left {
      --translate-x: 157px;
    }
    &.wedding-date-right {
      --translate-x: 100px;
    }
  }
}

.wedding-date-center {
  text-align: center;
  font-size: 3rem;
  font-weight: bold;
  font-family: 'Lora Italic';
  line-height: 0.9;
  margin-top: 0.4rem;
}


.reveal-digit-enter-active, 
.reveal-digit-leave-active {
  transition: transform ease 1s, opacity ease 800ms;
  position: relative;
}

.reveal-digit-enter-from {
  transform: translateY(-50px);
  opacity: 0;
  width: 0;
}

.reveal-digit-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.reveal-digit-leave-from {
  transform: translateY(0);
  opacity: 0;
}

.reveal-digit-leave-to {
  transform: translateY(20px);
  opacity: 0;
  width: 0;
}

.wedding-date__weekday {
  &.tick {
    &::after {
      content: '|';
    }
  }
}

.countdown {

  @media (max-width: 640px) {
    // height: 660px;
  }

  ul {
    color: white;
    // width: 40vw;
    padding-inline-start: 0;
    gap: 1rem;
    z-index: 10;


    @media (max-width: 640px) {
      display: flex !important;
      flex-wrap: wrap;
      // overflow-y: scroll;
      position: relative;
      // height: 316px;
    }

    @media (max-width: 376px) {
      display: block !important;
      position: relative;
    }

    li {
      border-color: @border-color;
      border-style: solid;
      border-width: 3px;
      display: inline-block;
      padding: 5px 17px;
      @media (max-width: 640px) {
        display: block !important;
      }
    }
    li span {
      font-family: 'Roboto';
      font-size: 3.5rem;
      font-weight: bold;

    }
    li h6 {
      font-family: 'Plus Jakarta Sans';
      text-transform: uppercase;
      font-size: 0.9rem;
      text-align: center;
      margin-top: 1rem;
      &::before {
        content: '';
        border-bottom-color: @border-color;
        border-bottom-width: 2px;
        border-bottom-style: solid;
        width: 100%;
        height: 5px;
        position: relative;
        display: block;
        top: -10px;
      }

    }
  }
}

@ribbon-size: 260px;

.ribbon {
  background-image: url("~/assets/ribbon.svg");
  background-size: cover;
  width: @ribbon-size;
  height: @ribbon-size;
}

.ribbon-top-left {
  position: absolute;
  transform: translate3d(-10px, -10px, 0);
}

.ribbon-bottom-right {
  position: absolute;
  bottom: 0;
  left: calc(100vw - @ribbon-size);
  transform: translate3d(10px, 10px, 0) rotate(180deg);
}

@banner-size: 256px;
@banner-size-small: 200px;

.banner-top-right {
  position: absolute;
  left: calc(100vw - var(--left-translation, 254px));

  @media (max-width: 428px) {
    --left-translation: @banner-size-small;
  }
}

.banner-bottom-left {
  overflow-y: hidden;
  position: absolute;
  top: calc(100% - @banner-size);

}

.banner-circular-top-right {
  background-image: url("~/assets/circular-lines.webp");
  background-size: cover;
  transform: rotate(180deg);
  width: @banner-size;
  height: @banner-size;
  margin-right: -300px;
  @media (max-width: 428px) {
    width: @banner-size-small;
    height: @banner-size-small;

  }
}

.banner-circular-bottom-left {
  background-image: url("~/assets/circular-lines.webp");
  background-size: cover;
  transform: rotate(0deg);
  width: @banner-size;
  height: @banner-size;
  margin-top: 0px;
}

@banner-circles-size: 300px;

.banner-circles {
  overflow-x: hidden;
  position: relative;
  &::after {
    display: block;
    content: '';
    background-image: url("~/assets/circles.webp");
    background-size: cover;
    width: @banner-circles-size;
    height: @banner-circles-size;
  }
}

.banner-circles-top-right {
  &::after {
    transform: translate3d(100px, -100px, 0) rotate(90deg) ;
    
  }
}

.banner-circles-bottom-left {
  margin-left: -300px;
  overflow-y: hidden;
  bottom: 0;
  &::after {
    transform: translate3d(-100px, 50px, 0) rotate(190deg);
  }
}
</style>