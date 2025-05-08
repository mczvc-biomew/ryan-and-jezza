<template>
  <div class="heading flex">
    <div class="heading-column py-8 flex justify-center">
      <span class="divider"></span>
    </div>
    <div class="links-column flex gap-7 nav-links">
      <ul class="flex">
        <li>
          <NuxtLink>Invitation</NuxtLink>
        </li>
        <li>
          <NuxtLink>Details</NuxtLink>
        </li>
        <li>
          <NuxtLink>RSVP</NuxtLink>
        </li>
      </ul>
    </div>
    <div class="heading-column py-8 flex justify-center">
      <span class="divider"></span>
    </div>
  </div>
</template>

<style>

.heading {
  flex-direction: column;
  justify-content: space-around;
}

.heading-column {
  width: 100%;
  height: 1px;

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
    }
  }
}

.divider {
  background-color: @border-color;
}
</style>