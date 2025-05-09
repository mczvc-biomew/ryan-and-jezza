<template>
  <div class="countdown flex justify-center">
    <ul class="flex justify-around">
      <li>
        <div class="countdown--wrapper">
          <Transition name="countdown">
            <div class="time-units" :key="countDown.days">
              <span>{{ padTime(countDown.days) }}</span>
            </div>
          </Transition>
        </div>
        <h6>Days</h6>
      </li>
      <li>
        <div class="countdown--wrapper">
          <Transition name="countdown">
            <div class="time-units" :key="countDown.hours">
              <span>{{ padTime(countDown.hours) }}</span>
            </div>
          </Transition>
        </div>
        <h6>Hours</h6>
      </li>
      <li>
        <div class="countdown--wrapper">
          <Transition name="countdown">
            <div class="time-units" :key="countDown.minutes">
              <span>{{ padTime(countDown.minutes) }}
              </span>
            </div>
          </Transition>
        </div>
        <h6>Minutes</h6>
      </li>
      <li>
        <div class="countdown--wrapper">
          <Transition name="countdown">
            <div class="time-units" :key="countDown.seconds">
              <span>{{ padTime(countDown.seconds) }}</span>
            </div>
          </Transition>
        </div>
        <h6>Seconds</h6>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const now = new Date();
const targetDate = new Date(2025, 10, 21, 9, 0, 0, 0);


interface DiffTime {
  seconds: number, minutes: number, hours: number, days: number
}

const countdownTimeDiff = ref<number>();
const timeDiff = ref(targetDate.getTime() - now.getTime());

const countDown = ref<DiffTime>({
  seconds: 0,
  minutes: 0,
  hours: 0,
  days: 0
});

const padTime = (t: number) => {
  if ((t < 0) || (t > 9)) return t.toString();
  return '0' + t.toString();
}

let durationInterval: ReturnType<typeof setInterval>;

const startCountdown = () => {

  durationInterval = setInterval( () => {
    const hero = document.querySelector('.hello-kitty-hero');
    const now = new Date().getTime();
    countdownTimeDiff.value = targetDate.getTime() - now;
    const TargetTimeDiffMillis = unref(countdownTimeDiff)!;

    countDown.value = { 
      seconds: Math.floor( (TargetTimeDiffMillis % (1000*60)) / 1000 ), 
      minutes: Math.floor( (TargetTimeDiffMillis % (1000*60*60)) / (1000*60) ), 
      hours: Math.floor( (TargetTimeDiffMillis % (1000*60*60*24)) / (1000*60*60) ),
      days: Math.floor( TargetTimeDiffMillis / (1000*60*60*24) )
    }

  }
  , 1000);
}

onMounted( () => {
  if (timeDiff.value >= 0) {
    startCountdown();
  }
});

onBeforeMount( () => {
  clearInterval(durationInterval);
});
</script>

<style lang="less" scoped>

.countdown-enter-active,
.countdown-leave-active {
  transition: transform 1s ease, opacity 800ms ease;
}

.countdown-enter-from {
  transform: translateY(-50px);
  width: 0;
  opacity: 0;

}
.countdown-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.countdown-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.countdown-leave-to { 
  transform: translateY(20px);
  width: 0;
  opacity: 0;
}

.countdown--wrapper {
  display: flex;
  position: sticky;
  justify-content: center;
}
</style>