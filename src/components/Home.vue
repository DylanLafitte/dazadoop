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

    <div class="slider-stack">
      <!-- Top track (carousel2 images) -->
      <div class="slider reverse">
        <div class="slide-track reverse-track">
          <template v-for="n in 200">
            <div v-for="(img, idx) in carousel2" :key="`top-${n}-${idx}`" class="slide">
              <img :src="img" height="100" width="250" alt="" />
            </div>
          </template>
        </div>
      </div>
      <!-- Middle track (carousel1 images) -->
      <div class="slider">
        <div class="slide-track">
          <template v-for="n in 200">
            <div
              v-for="(img, idx) in carousel1"
              :key="`mid-${n}-${idx}`"
              class="slide"
            >
              <img :src="img" height="100" width="250" alt="" />
            </div>
          </template>
        </div>
      </div>
      <!-- Bottom track (carousel3 images) -->
      <div class="slider reverse">
        <div class="slide-track reverse-track">
          <template v-for="n in 200">
            <div v-for="(img, idx) in carousel3" :key="`bot-${n}-${idx}`" class="slide">
              <img :src="img" height="100" width="250" alt="" />
            </div>
          </template>
        </div>
      </div>
      <!-- Transparent card overlay -->
      <div class="overlay-card">
        <h2>Welcome to My Portfolio</h2>
        <p>
          Explore my artwork below. For commissions or inquiries, use the navigation above!
        </p>
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
      carousel1: importAll(require.context('@/assets/carousel1', false, /\.(png|jpe?g|svg)$/)),
      carousel2: importAll(require.context('@/assets/carousel2', false, /\.(png|jpe?g|svg)$/)),
      carousel3: importAll(require.context('@/assets/carousel3', false, /\.(png|jpe?g|svg)$/)),
    };
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.portfolio {
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  color: white;
  background: linear-gradient(-45deg, #CCD2FF, #EFD7FF, #FFDEFC, #C9B7EA);
  background-size: 400% 400%;
  animation: gradientFlow 5s ease infinite;
  overflow: hidden;
  display: flex;
  flex-direction: column;
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

/* Stack 3 sliders vertically, fill available space, and add gap between them */
.slider-stack {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  gap: 32px; /* Add gap between sliders */
  height: calc(100vh - 100px);
  min-height: 0;
  padding: 32px 0; /* Optional: vertical padding for nicer spacing */
  position: relative; /* Needed for overlay positioning */
}

.slider {
  background: transparent;
  height: 33.33%;
  width: 100vw;
  max-width: 100vw;
  margin: 0;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
}

.slide-track,
.reverse-track {
  display: flex;
  gap: 24px;
  width: auto;
}

.slide-track {
  animation: scroll 30s linear infinite;
}
.reverse-track {
  animation: scroll-reverse 30s linear infinite;
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-1894px); }
}
@keyframes scroll-reverse {
  0% { transform: translateX(-1894px); }
  100% { transform: translateX(0); }
}

.slide {
  display: flex;
}

.slide img {
  height: 100%;
  width: 250px;
  object-fit: cover;
  display: block;
  border: 4px solid #fff;
  border-radius: 18px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  background: #f6f6fa;
  transition: box-shadow 0.2s;
}

.slide img:hover {
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  border-color: #b7aaff;
}

/* Transparent overlay card */
.overlay-card {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  min-width: 320px;
  max-width: 90vw;
  background: rgba(30, 30, 40, 0.55);
  color: #fff;
  border-radius: 22px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.25);
  padding: 36px 48px;
  text-align: center;
  z-index: 10;
  backdrop-filter: blur(4px);
  pointer-events: auto;
}

.overlay-card h2 {
  margin: 0 0 16px 0;
  font-size: 2rem;
  font-weight: 600;
}

.overlay-card p {
  margin: 0;
  font-size: 1.15rem;
  opacity: 0.92;
}
</style>
