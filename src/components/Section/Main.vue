<template>
  <Transition name="entrance">
    <section class="section-main">
      <div class="section-main__inner flex flex-col justify-between">
        <div class="bg-animation-wrapper [width:100vw] overflow-x-hidden relative">
          <video class="background-video" autoplay loop ref="backgroundVideo">
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
          <p class="c-and-j" ref="husbandAndWifeEl">
            Christian & Jezza
          </p>
          <div class="wedding-date-wrapper">
            <p class="wedding-date wedding-date-left">
              <span class="wedding-date__weekday" ref="weddingWeekdayEl">Friday</span></p>
            <div class="wedding-date-center">
              <div class="animate-once animate-spin-y absolute">
                <span>21</span>
              </div><br>
              <span class="">NOV</span>
            </div>
            <div class="wedding-date wedding-date-right">
              <Transition name="reveal-digit">
                <div class="inline-block" :key="weddingHour"
                  >{{ weddingHour }}
                </div>
              </Transition>
              <span> am</span>
            </div>
          </div>
        </div>
        <Countdown/>
        <div class="banner-bottom-left flex justify-start">
          <div class="banner-circular-bottom-left"></div>
          <div class="banner-circles banner-circles-bottom-left"></div>
        </div>
        <div class="ribbon ribbon-bottom-right"></div>
      </div>
    </section>
  </Transition>
</template>

<script setup lang="ts">
const backgroundVideo = ref<HTMLVideoElement>();

const husbandAndWifeEl = ref<HTMLElement>();
const diamondRing = ref<HTMLElement>();
const weddingWeekdayEl = ref<HTMLElement>();
const weddingWeekdayText = ref('');

const weddingHour = ref('00');

async function handleClick() {
  await backgroundVideo.value!.play();
  backgroundVideo.value!.loop = true;
}

function init() {

  setTimeout( () => {
    const bgAnimationWrapper = (document.querySelector('.bg-animation-wrapper') as HTMLElement);
    bgAnimationWrapper.style.position = 'initial';
    console.log(bgAnimationWrapper)
  }, 1600);

  setTimeout( () => {
    weddingHour.value = '09';

    const hawTypewritingPending = ref(false);
    animateTypewriting('Christian & Jezza', hawTypewritingPending, husbandAndWifeEl.value, ref(''), 8, true);

    setTimeout( () => {
      const typewritingPending = ref(false);
      animateTypewriting('Friday', typewritingPending, weddingWeekdayEl.value, weddingWeekdayText, 3, true);
    }, 1000);
  }, 1000);

  let timeSequence = 1000;
  const animateOnce = document.querySelectorAll('.animate-once');
  animateOnce.forEach( (el) => {
    setTimeout( () => {
      el.classList.add('reveal');
    }, timeSequence);
    timeSequence += 500;
  });
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
}

.section-main__inner {
  background-color: #7f0021;
  animation: zoom 3s ease;
  height: auto;

  @media (min-width: 516px) {
    height: 100vh;
  }
}

.entrance-enter-active,
.entrance-leave-active {
  transition: transform ease 1s;
}

.entrance-enter-from {
  animation: zoom 1s ease;
}

@keyframes zoom {
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

@border-color: #b26338;

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
    transform: translate3d(calc(50vw - 200px), 0, 0);
  }
  &.wedding-date-right {
    margin-top: -4.3rem;
    transform: translate3d(calc(50vw + 130px), 0, 0);
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

.animate-reveal-up(@translate-y) {
  transition: transform ease 1s, opacity ease 800ms;
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

.animate-spin-y {
  .animate-spin-y(720deg);
}

.animate-reveal-up-50 {
  .animate-reveal-up(50px);
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

      @media (max-width: 640px) and (max-height: 730px) {
        font-size: 1.2rem;
      }
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
        @media (max-height: 730px) and (max-width: 640px) {
          top: 19.7px;
        }
      }

      @media (max-height: 730px) and (max-width: 640px) {
        margin-bottom: -16px;
        margin-top: -0.2rem;
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