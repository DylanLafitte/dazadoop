<template>
  <div class="slider-multiline" ref="sliders">
    <div class="carousels">
      <div class="carousel-row top">
        <div class="carousel" aria-label="Artwork carousel top">
          <div class="group" v-for="setIndex in 2" :key="'top-'+setIndex" :aria-hidden="setIndex === 2">
            <div
              class="card"
              v-for="(img, idx) in repeatedImagesTop"
              :key="'top-'+setIndex+'-'+idx"
              :style="{ borderImage: borderGradientsTop[idx] + ' 1' }"
            >
              <img :src="img" :alt="`art-top-${idx}`" class="image-border" :style="{ background: gradientsTop[idx] }" />
            </div>
          </div>
        </div>
      </div>

      <div class="carousel-row middle">
        <div class="carousel" aria-label="Artwork carousel middle">
          <div class="group" v-for="setIndex in 2" :key="'mid-'+setIndex" :aria-hidden="setIndex === 2">
            <div
              class="card"
              v-for="(img, idx) in repeatedImagesMid"
              :key="'mid-'+setIndex+'-'+idx"
              :style="{ borderImage: borderGradientsMid[idx] + ' 1' }"
            >
              <img :src="img" :alt="`art-mid-${idx}`" class="image-border full border" :style="{ background: gradientsMid[idx] }" />
            </div>
          </div>
        </div>
      </div>

      <div class="carousel-row bottom">
        <div class="carousel" aria-label="Artwork carousel bottom">
          <div class="group" v-for="setIndex in 2" :key="'bot-'+setIndex" :aria-hidden="setIndex === 2">
            <div
              class="card"
              v-for="(img, idx) in repeatedImagesBot"
              :key="'bot-'+setIndex+'-'+idx"
              :style="{ borderImage: borderGradientsBot[idx] + ' 1' }"
            >
              <img :src="img" :alt="`art-bot-${idx}`" class="image-border full border" :style="{ background: gradientsBot[idx] }" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
function importAll(r) { return r.keys().map(r); }

export default {
  name: 'BackgroundCarousel',
  props: {
    // optional array of image URLs to use (defaults to assets/carousel1)
    images: { type: Array, default: () => [] },
    // scroll speed in px/sec for consistent pixel speed across rows
    speedPxPerSec: { type: Number, default: 80 },
    minDurationSec: { type: Number, default: 10 }
  },
  data() {
    return {
      baseImages: [],
      repeatedImagesTop: [],
      repeatedImagesMid: [],
      repeatedImagesBot: [],
      gradientsTop: [],
      gradientsMid: [],
      gradientsBot: [],
      borderGradientsTop: [],
      borderGradientsMid: [],
      borderGradientsBot: [],
      scrollSpeedPxPerSec: this.speedPxPerSec,
      minScrollDurationSec: this.minDurationSec
    };
  },
  methods: {
    randHsl(minS = 60, maxS = 85, minL = 45, maxL = 75) {
      const h = Math.floor(Math.random() * 360);
      const s = Math.floor(Math.random() * (maxS - minS + 1)) + minS;
      const l = Math.floor(Math.random() * (maxL - minL + 1)) + minL;
      return `hsl(${h} ${s}% ${l}%)`;
    },
    randomGradient() {
      const c1 = this.randHsl();
      const c2 = this.randHsl();
      return `linear-gradient(45deg, ${c1}, ${c2})`;
    },
    randomBorderGradient() {
      const c1 = this.randHsl(55, 90, 45, 70);
      const c2 = this.randHsl(55, 90, 45, 70);
      return `linear-gradient(90deg, ${c1} 0%, ${c2} 100%)`;
    },
    shuffleArray(arr) {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
    updateDurations() {
      ['top','middle','bottom'].forEach((r) => {
        const rowEl = this.$el.querySelector(`.carousel-row.${r}`);
        if (!rowEl) return;
        const group = rowEl.querySelector('.group');
        if (!group) return;
        const distancePx = group.offsetWidth || 0;
        let duration = (distancePx / Math.max(1, this.scrollSpeedPxPerSec));
        if (duration < this.minScrollDurationSec) duration = this.minScrollDurationSec;
        rowEl.style.setProperty('--scroll-duration', `${duration}s`);
      });
    },
    buildRepeated() {
      const base = this.baseImages || [];
      if (!base.length) {
        this.repeatedImagesTop = [];
        this.repeatedImagesMid = [];
        this.repeatedImagesBot = [];
        this.gradientsTop = [];
        this.gradientsMid = [];
        this.gradientsBot = [];
        this.borderGradientsTop = [];
        this.borderGradientsMid = [];
        this.borderGradientsBot = [];
        return;
      }

      const cardWidth = 250;
      const gap = 24;
      const viewport = window.innerWidth || document.documentElement.clientWidth;
      const needed = Math.ceil((viewport + cardWidth) / (cardWidth + gap) * 1.5);

      const makeRow = () => {
        const out = [];
        while (out.length < needed) out.push(...base);
        return this.shuffleArray(out.slice(0, needed));
      };

      this.repeatedImagesTop = makeRow();
      this.repeatedImagesMid = makeRow();
      this.repeatedImagesBot = makeRow();

      this.gradientsTop = this.repeatedImagesTop.map(() => this.randomGradient());
      this.gradientsMid = this.repeatedImagesMid.map(() => this.randomGradient());
      this.gradientsBot = this.repeatedImagesBot.map(() => this.randomGradient());

      this.borderGradientsTop = this.repeatedImagesTop.map(() => this.randomBorderGradient());
      this.borderGradientsMid = this.repeatedImagesMid.map(() => this.randomBorderGradient());
      this.borderGradientsBot = this.repeatedImagesBot.map(() => this.randomBorderGradient());

      this.$nextTick(() => this.updateDurations());
    }
  },
  mounted() {
    // load images: prefer prop images, otherwise default assets folder
    if (this.images && this.images.length) {
      this.baseImages = this.images.slice();
    } else {
      this.baseImages = importAll(require.context('@/assets/carousel1', false, /\.(png|jpe?g|svg|webp)$/));
    }
    this.buildRepeated();
    window.addEventListener('resize', this.buildRepeated);
    window.addEventListener('load', this.updateDurations);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.buildRepeated);
    window.removeEventListener('load', this.updateDurations);
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

:root {
  --card-gap: 24px;
  --card-width: 250px;
  --card-border: 6px;

  /* page-accent palette (close to page but not identical) */
  --accent-light: #FFDDEE;    /* page highlight */
  --accent-mid:   #C9B7EA;    /* page lavender */
  --accent-contrast: #E6C2F6; /* slightly different purple for contrast */

  /* border gradient using the above accents */
  --card-border-gradient: linear-gradient(90deg, var(--accent-light) 0%, var(--accent-contrast) 55%, var(--accent-mid) 100%);
}

/* Ensure the Home component root can grow inside App.vue's flex layout */
.slider-multiline {
  width: 100%;
  height: 100%;        /* <- changed: fill parent container */
  min-height: 0;
  display: flex;
  align-items: stretch;
  justify-content: center;
  position: relative;
  margin: 0;
  box-sizing: border-box;
}

/* Use CSS Grid so rows always split the available height evenly */
.carousels {
  width: 100%;
  height: 100%;       /* ensure rows split the parent's height */
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  min-height: 0;
}

/* Each row fills its grid area */
.carousel-row {
  display: block;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0;
  min-height: 0;
  border-radius: 10px;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.02));
}

/* Ensure carousel fills its row vertically so cards can size to it */
.carousel {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: stretch;
  padding: var(--row-padding); /* inner padding so cards don't stick to row edges */
  box-sizing: border-box;
  position: relative;
}

/* Groups stretch vertically so cards match row height */
.group {
  display: flex;
  gap: var(--card-gap);
  will-change: transform;
  animation: scrolling 22s linear infinite;
  align-items: stretch;
  min-height: 0;
  padding-right: var(--card-gap); /* ensure a gap at the end of group */
  box-sizing: border-box;
}

/* extra spacer to guarantee gap between duplicated groups and avoid collision */
.group::after {
  content: "";
  flex: 0 0 var(--card-gap);
  width: var(--card-gap);
}

/* Cards: the border/frame is on the card (so image can't cover it) */
.card {
  flex: 0 0 var(--card-width);
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--card-width);
  height: 100%;
  min-height: 0;
  border-radius: 10px;
  box-sizing: border-box;
  overflow: hidden;
  background: transparent;
  padding: 6px; /* inner space between card edge (frame) and image */

  /* use a gradient border that fits the page colors but remains distinct */
  border: var(--card-border) solid transparent;
  border-image: var(--card-border-gradient) 1;
  /* no shadow on frame per request */
  box-shadow: none;
}

/* Images: fit the available content box inside the framed card */
.card img {
  display: block;
  /* fill the available content height (card height minus padding & border) */
  height: 100%;
  width: auto;
  max-width: none;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: none; /* explicit: no shadow */
  transition: transform 0.12s, opacity 0.12s;
  box-sizing: border-box;

  /* subtle neutral background so thin images don't visually merge with the frame */
  background-color: rgba(255, 242, 250, 0.04);
}

/* Keep a subtle lift on hover but no shadow to avoid layout shift */
.card img:hover {
  transform: translateY(-4px);
  opacity: 0.98;
}

/* Row-specific animation directions / durations */
.carousel-row.top .group,
.carousel-row.bottom .group {
  animation-direction: reverse;
  animation-duration: 40s;
}

.carousel-row.middle .group {
  animation-direction: normal;
  animation-duration: 40s;
}

/* Scrolling keyframes */
@keyframes scrolling {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}

/* keep the info-card styles unchanged below... */
.info-card-centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(30, 30, 40, 0.92);
  color: #fff;
  border-radius: 2vw;
  padding: 2vw 2vw 1.5vw 2vw;
  box-shadow:
    0 0.6vw 2vw 0 rgba(200, 100, 200, 0.18),
    0 0.15vw 0.6vw 0 rgba(0,0,0,0.18),
    0 0 0 0.6vw rgba(255, 221, 238, 0.12);
  text-align: center;
  z-index: 10;
  max-width: 98vw;
  min-width: 320px;
  border: 0.3vw solid #FFDDEE;
  backdrop-filter: blur(0.6vw);
  pointer-events: auto;
  transition: box-shadow 0.2s, border-color 0.2s, background 0.2s;
  font-size: 0.85vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

/* Keep the hover effect for the card background and border */
.info-card-centered:hover {
  background: rgba(40, 30, 60, 0.98);
  border-color: #C9B7EA;
  box-shadow:
    0 16px 48px 0 rgba(200, 100, 200, 0.28),
    0 4px 16px 0 rgba(0,0,0,0.22),
    0 0 0 12px rgba(255, 221, 238, 0.18);
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




.image-border {
  border-radius: 10px;
  padding: 5px;
  background: linear-gradient(45deg, turquoise, pink);
}

.image-border img {
  display: block;
  border-radius: inherit;
  background: white; /* inner background */
}

</style>
