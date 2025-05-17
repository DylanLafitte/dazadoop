<template>
  <div class="portfolio">
    <header class="app-header">
      <div class="logo">Art by [Dazadoop]</div>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/portfolio">Portfolio</router-link>
        <router-link to="/commissions">Commissions</router-link>
        <router-link to="/faq">FAQ</router-link>
        <router-link to="/contact">Contact</router-link>
      </nav>
    </header>

    <div class="slider-multiline" ref="sliders">
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
      <!-- Info Card Overlay, centered relative to sliders -->
      <div class="info-card-centered">
        <h2>Commission Custom Art from Dazadoop!</h2>
        <p>
          Bring your ideas to life with unique, hand-crafted illustrations and character designs.<br>
          <strong>What I offer:</strong>
        </p>
        <ul>
          <li>✨ Character design (original or fanart)</li>
          <li>🎨 Portraits, busts, and full-body artworks</li>
          <li>🌈 Whimsical, colorful, and expressive styles</li>
          <li>🖼️ Digital delivery in high resolution</li>
        </ul>
        <p style="margin-top: 18px;">
          <strong>How to commission:</strong><br>
          Click the button below or use the navigation above to visit the commissions page for pricing, process, and to get started!
        </p>
        <router-link class="commission-btn" to="/commissions">Request a Commission</router-link>
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
  position: relative;
}

.slider-multiline {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin: 0;
  padding: 24px 0;
  position: relative; /* Needed for absolute centering of info card */
}

.info-card-centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(30, 30, 40, 0.75);
  color: #fff;
  border-radius: 22px;
  padding: 44px 54px 36px 54px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.28);
  text-align: center;
  z-index: 10;
  max-width: 95vw;
  min-width: 320px;
  border: 3px solid #FFDDEE;
  backdrop-filter: blur(6px);
  pointer-events: auto;
  transition: box-shadow 0.2s, border-color 0.2s;
}

.info-card-centered h2 {
  margin-bottom: 18px;
  font-size: 2.2rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #FFDDEE;
  text-shadow: 0 2px 8px rgba(0,0,0,0.18);
}

.info-card-centered p {
  font-size: 1.18rem;
  opacity: 0.96;
  margin-bottom: 10px;
}

.info-card-centered ul {
  list-style: none;
  padding: 0;
  margin: 18px 0 0 0;
  font-size: 1.08rem;
  text-align: left;
  display: inline-block;
  color: #fff;
}

.info-card-centered ul li {
  margin: 0 0 8px 0;
  padding-left: 0.5em;
  position: relative;
}

.info-card-centered ul li::before {
  content: "•";
  color: #FFDDEE;
  font-size: 1.2em;
  position: absolute;
  left: -1em;
  top: 0;
}

.commission-btn {
  display: inline-block;
  margin-top: 22px;
  padding: 14px 36px;
  background: linear-gradient(90deg, #FFDDEE 0%, #C9B7EA 100%);
  color: #2c2c3e;
  font-weight: 700;
  font-size: 1.15rem;
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 18px rgba(200, 100, 200, 0.13);
  text-decoration: none;
  transition: background 0.2s, color 0.2s, transform 0.15s;
  cursor: pointer;
}
.commission-btn:hover {
  background: linear-gradient(90deg, #C9B7EA 0%, #FFDDEE 100%);
  color: #1a1a2a;
  transform: scale(1.06);
  box-shadow: 0 8px 32px rgba(200, 100, 200, 0.18);
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
    transform: translateX(calc(-274px * 7));
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

.slider {
  background: transparent;
  flex: 1 1 0;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  width: 100vw;
  min-height: 0;
  height: 33.33vh;
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
