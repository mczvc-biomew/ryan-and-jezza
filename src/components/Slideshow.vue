<template>

  <Dialog class="lightbox-slideshow" v-if="showDialog" @close="closeDialog" ref="lightboxSlideshow">
    <template #default>
      <div class="swiper swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden">
        <header class="slideshow__header lightbox-prevent-close">
          <i class="eicon-share-arrow" role="button" tabindex="0" aria-label="Share" aria-expanded="false"></i>
          <div class="slideshow__share-menu"></div>
          <i :class="`eicon-zoom-${isZoomIn ? 'out' : 'in'}-bold`" role="switch" tabindex="0" aria-checked="false" aria-label="Zoom" @click="zoom"></i>
          <i :class="`eicon-frame-${isFullscreen? 'minimize' : 'expand'}`" role="switch" tabindex="0" aria-checked="false" aria-label="Fullscreen" @click="fullscreen"></i>
          <span class="slideshow__counter"></span>
        </header>
        <swiper-container ref="containerEl" :pagination="true"
        class="swiper-wrapper">
          <swiper-slide v-for="(image, idx) in imageSlides" :key="idx"
          style="color: white;"
          class="swiper-slide lighbox-item">
            <swiper-zoom-container class="swiper-zoom-container"
            :panOnMouseMove="true">
              <img class="lightbox-image" :src="image.src" ref="currentSlideshowImgEl">
            </swiper-zoom-container>
          </swiper-slide>
        </swiper-container>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">

const containerEl = ref(null);
const currentSlideshowImgEl = ref<HTMLElement>()

const showDialog = ref(true);
const isZoomIn = ref(false);
const isFullscreen = ref(false);

const imageSlides = ref(
  [
    // {
    //   src: getSrcAssets('/assets/images/PILOT.jpg'),
    // },
    // {
    //   src: getSrcAssets('/assets/images/sotogrande-neopolitan.jpg'),
    // },
  ]
);

const swiper = useSwiper(containerEl, {
  effect: 'creative',
  loop: true,
  creativeEffect: {
    prev: {
      shadow: true,
      translate: [0, 0, -400],
    },
    next: {
      shadow: true,
      translate: [0, 0, -400],
    }
  }
});

function zoom() {
  if (!isZoomIn.value) {
    swiper.instance.value!.zoom.in(); 
    swiper.instance.value!.allowSlideNext = false;
    swiper.instance.value!.allowSlidePrev = false;
    isZoomIn.value = true;
  } else {
    swiper.instance.value!.zoom.out(); 
    swiper.instance.value!.allowSlideNext = true;
    swiper.instance.value!.allowSlidePrev = true;
    isZoomIn.value = false;
  }
}

function exitFullscreen() {
  (document.querySelector('.lightbox-slideshow') as HTMLElement).style.backgroundColor = '';
  document.exitFullscreen();
  isFullscreen.value = false;
}

function fullscreen() { 
  if (!isFullscreen.value) {
    (document.querySelector('.lightbox-slideshow') as HTMLElement).style.backgroundColor = '#000';
    document.documentElement.requestFullscreen();
    setTimeout( () => {
      isFullscreen.value = true;
      document.documentElement.addEventListener('fullscreenchange', function onFullscreenChange (e) {
        if (isFullscreen.value)
          exitFullscreen();
        e.target!.removeEventListener('fullscreenchange', onFullscreenChange, false);
      });
    }, 300);
  }
  else {
    exitFullscreen();
  }
}

function closeDialog() {
  showDialog.value = false; 
  dialogEl.value!.close();
}

const lightboxSlideshow = ref();
const dialogEl = ref<HTMLDialogElement>();

onMounted(() => {
  swiper.instance.value!.zoom.enable();
  dialogEl.value = lightboxSlideshow.value.dialog;
  setTimeout( () => {
    dialogEl.value!.showModal();
    dialogEl.value!.classList.add('loading');
    dialogEl.value!.classList.remove('loading');
  }, 3000);

});
</script>

<style lang="less">
swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  height: 20vh;
  font-size: 4rem;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
}

.lightbox-slideshow {
  position: fixed;
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 9999;
  user-select: none;

  transition: opacity ease 500ms;
  opacity: 1;

  &.loading {
    opacity: 0;
  }

  .swiper {
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
    list-style: none;
    padding: 0;
    z-index: 1;
    height: 100%;

    .lightbox-image {
      box-shadow: 0 0 30px rgba(0,0,0,.3),0 0 8px -5px rgba(0,0,0,.3);
      border-radius: 2px;
    }
  }

  .swiper-pointer-events {
    touch-action: pan-y;
  }
}

.dialog-message {
  line-height: 1.5;
  box-sizing: border-box;

  text-align: center;

  animation-duration: 0.3s;
}

.zoom-in {
  animation-name: zoomIn;
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  50% {
    opacity: 1;
  }
}

.dialog-widget-content {
  top: 0;
  left: 0;

  a {
    text-decoration: none;
  }
}

@lightbox-header-icons-size: 20px;
@lightbox-ui-color: hsla(0,0%,93.3%,0.9);

.dialog-lightbox-close-button {
  color: @lightbox-ui-color;
  cursor: pointer;
  position: absolute;
  font-size: @lightbox-header-icons-size;
  right: 0.75em;
  margin-top: 13px;
  padding: .25em;
  z-index: 2; 
  line-height: 1;
  display: flex;

  &:hover {
    color: #fff;
  }
}

.dialog-lightbox-message {
  padding: 0;
}

.swiper-backface-hidden {
  .swiper-slide {
    transform: translateZ(0);
    backface-visibility: hidden;

    width: 1440px;
    margin-right: 100px;

    flex-shrink: 0;
  }
}

.lightbox-slideshow {
  .lighbox-item {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 70px;
    box-sizing: border-box;
    height: 100%;
    margin: auto;
  }
}

@lightbox-header-icons-size: 20px;

.slideshow__header {

  color: @lightbox-ui-color;
  display: flex;
  flex-direction: row-reverse;
  font-size: @lightbox-header-icons-size;
  box-sizing: border-box;
  top: 0;
  align-items: center;
  z-index: 10;

  position: absolute;
  left: 0;
  width: 100%;
  padding: 15px 20px;
  padding-left: 1em;
  padding-right: 1.6em;

  background-color: rgba(0, 0, 0, 0.5);


  i {
    font-size: inherit;

    cursor: pointer;
    padding: 0.25em;
    margin: 0 0.35em;
  }
}
</style>