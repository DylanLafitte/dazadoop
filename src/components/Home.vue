<template>
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
          Hey, thanks for taking interest in commissioning me!<br>
          Below you'll find the form you need to fill out to get a quote, as well as my Terms of Service.<br>
          <strong>Please read through my ToS before filling out the form.</strong><br>
          Please answer each question so I can give you an accurate quote~
        </p>
        <p>
          <strong>What I offer:</strong>
        </p>
        <ul>
          <li>✨ Sketches, coloured sketches, flat colours, and full colours</li>
          <li>👥 Extra characters, backgrounds, and alternate versions available</li>
          <li>🎨 Portraits, busts, and full-body artworks</li>
          <li>🌈 Colourful, expressive styles</li>
          <li>🖼️ Digital delivery in high resolution</li>
        </ul>
        <p style="margin-top: 18px;">
          <strong>How to commission:</strong><br>
          Click the button below or use the navigation above to visit the commissions page for pricing, process, and to get started!
        </p>
        <router-link class="commission-btn" to="/commissions">Request a Commission</router-link>
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
  background: rgba(30, 30, 40, 0.92);
  color: #fff;
  border-radius: 2vw;
  padding: 2vw 2vw 1.5vw 2vw; /* Reduce padding */
  box-shadow:
    0 0.6vw 2vw 0 rgba(200, 100, 200, 0.18),
    0 0.15vw 0.6vw 0 rgba(0,0,0,0.18),
    0 0 0 0.6vw rgba(255, 221, 238, 0.12);
  text-align: center;
  z-index: 10;
  max-width: 98vw;             /* Allow even more width */
  min-width: 320px;          /* Slightly wider minimum for comfort */
  border: 0.3vw solid #FFDDEE;
  backdrop-filter: blur(0.6vw);
  pointer-events: auto;
  transition: box-shadow 0.2s, border-color 0.2s, background 0.2s;
  font-size: 0.85vw;           /* Slightly smaller text */
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* Make text shrink to fit if needed */
  overflow: hidden;
}

.info-card-centered h2,
.info-card-centered p,
.info-card-centered ul {
  /* Allow text to shrink if needed */
  min-width: 0;
  min-height: 0;
  overflow-wrap: break-word;
  word-break: break-word;
}

.info-card-centered p,
.info-card-centered ul {
  /* Responsive font size for content */
  font-size: clamp(0.7em, 0.85vw, 0.95em); /* Smaller content text */
  margin-bottom: 0.5em;                    /* Less margin between blocks */
  line-height: 1.18;
}

.info-card-centered h2 {
  font-size: clamp(0.9em, 1.2vw, 1.5em); /* Smaller heading */
  margin-bottom: 0.7em;                  /* Less margin below heading */
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #FFDDEE;
  text-shadow: 0 2px 8px rgba(0,0,0,0.18);
}

@media (max-width: 700px) {
  .info-card-centered {
    font-size: 1rem;
    padding: 24px 4vw 18px 4vw;
    border-radius: 18px;
    max-width: 98vw;
    height: auto;
  }
  .info-card-centered h2 {
    font-size: 1.3em;
  }
  .info-card-centered p,
  .info-card-centered ul {
    font-size: 1em;
  }
}

.info-card-centered p {
  font-size: 1.1em;
  opacity: 0.96;
  margin-bottom: 10px;
}

.info-card-centered ul {
  display: flex;
  flex-direction: column;
  align-items: center;    /* Center the bullet points horizontally */
  list-style: none;
  padding: 0;
  margin: 10px 0 0 0;
  font-size: 1em;
  text-align: left;       /* Keep text left-aligned within each li */
  width: 100%;
}

.info-card-centered ul li {
  display: block;
  margin: 0 0 8px 0;
  padding-left: 0.5em;
  position: relative;
  font-size: 1em;
  text-align: left;
  min-width: 220px;
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

.slider {
  background: transparent;
  flex: 1 1 0;
  margin: 0 auto;
  /* Only the slider allows overflow for shadows */
  overflow: visible;
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
  /* Add a nice border */
  border: 3px solid #FFDDEE;
  box-shadow: 0 8px 32px 0 rgba(200, 100, 200, 0.18), 0 2px 8px 0 rgba(0,0,0,0.18);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.slider .slide img:hover {
  border-color: #C9B7EA;
  box-shadow: 0 16px 48px 0 rgba(200, 100, 200, 0.28), 0 4px 16px 0 rgba(0,0,0,0.22);
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

html, body, #app, .portfolio {
  overflow: hidden !important;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
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
</style>
