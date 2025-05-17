<template>
  <div class="portfolio">
    <header class="app-header">
      <div class="logo">Art by [Dazadoop]</div>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/portfolio">Portfolio</router-link>
        <router-link to="/commissions">Commissions</router-link>
        <router-link to="/contact">Contact</router-link>
      </nav>
    </header>

    <div class="slider-multiline">
      <div
        class="slider"
        :class="{ reverse: row === 1 || row === 3 }"
        v-for="row in 3"
        :key="row"
      >
        <div class="slide-track">
          <div
            class="slide"
            v-for="(img, idx) in carouselImages"
            :key="row + '-' + idx"
          >
            <img :src="img" height="100" width="250" alt="" />
          </div>
          <!-- Duplicate images for seamless looping -->
          <div
            class="slide"
            v-for="(img, idx) in carouselImages"
            :key="row + '-dup-' + idx"
          >
            <img :src="img" height="100" width="250" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
function importAll(r) {
  return r.keys().map(r);
}

export default {
  name: 'ArtPortfolio',
  data() {
    return {
      carouselImages: importAll(require.context('@/assets/carousel1', false, /\.(png|jpe?g|svg|webp)$/)),
      imageWidth: 120 // Not used in template, but kept for reference
    };
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.portfolio {
  min-height: 100vh;
  height: 100vh;
  background: linear-gradient(-45deg, #CCD2FF, #EFD7FF, #FFDEFC, #C9B7EA);
  background-size: 400% 400%;
  animation: gradientFlow 5s ease infinite;
  font-family: 'Poppins', sans-serif;
  color: white;
  display: flex;
  flex-direction: column;
  min-width: 100vw;
}

@keyframes gradientFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.app-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 15px;
  height: 100px;
}

.logo {
  font-size: 2rem;
  font-weight: bold;
}

nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}

body {
  align-items: center;
  background: #E3E3E3;
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-274px * 7)); /* 250px image + 24px gap */
  }
}

@keyframes scroll-reverse {
  0% {
    transform: translateX(calc(-274px * 7));
  }
  100% {
    transform: translateX(0);
  }
}

.slider-multiline {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;           /* Equal gap between all slider rows */
  margin: 0;
  padding: 24px 0;     /* Equal gap at the top and bottom */
}

.slider {
  background: transparent;
  flex: 1 1 0;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  width: 100vw;
  min-height: 0;
  height: 33.33vh; /* Each slider row is 1/3 of viewport height */
  display: flex;
  align-items: center;
}

.slider::before,
.slider::after {
  content: "";
  height: 100px;
  position: absolute;
  width: 200px;
  z-index: 2;
}

.slider::after {
  right: 0;
  top: 0;
  transform: rotateZ(180deg);
}

.slider::before {
  left: 0;
  top: 0;
}

.slider .slide-track {
  animation: scroll 40s linear infinite;
  display: flex;
  width: calc((250px + 24px) * 14);
  gap: 24px;
  align-items: center;
}

.slider.reverse .slide-track {
  animation: scroll-reverse 40s linear infinite;
}

.slider .slide {
  height: 100%;
  width: 250px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slider .slide img {
  display: block;
  width: 250px;
  height: 30%;
  object-fit: cover;
  background: transparent;
  border-radius: 8px;
}
</style>
