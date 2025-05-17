<template>
  <div class="portfolio">
    <header class="app-header">
      <h1 class="logo">ArtAAAAAA by [Dazadoop]</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/portfolio">Portfolio</router-link>
        <router-link to="/commissions">Commissions</router-link>
        <router-link to="/contact">Contact</router-link>
      </nav>
    </header>

    <section class="slideshow-container">
      <!-- Slideshow behind the content card -->
      <div class="background-slideshow">
        <div class="scrolling-track" :style="scrollStyle">
          <div v-for="(img, index) in slideshowImages" :key="index" class="scroll-item">
            <img :src="img" alt="Artwork" />
          </div>
        </div>
      </div>

      <!-- Card in the center -->
      <div class="content-card">
        <h3 class="card-title">Welcome to My Art World</h3>
        <p class="card-description">I specialize in character design, whimsical illustrations, and unique commissions tailored to your vision.</p>
        <router-link class="cta card-cta" to="/commissions" @mouseover="spawnParticles">Request a Custom Piece</router-link>
      </div>
    </section>
  </div>
</template>


<script>
export default {
  name: 'ArtPortfolio',
  data() {
    return {
      slideshowImages: [
        require('@/assets/logo.png'),
        require('@/assets/landscape-placeholder.svg'),
        require('@/assets/landscape-placeholder.svg')
      ],
      scrollX: 0
    };
  },
  computed: {
    scrollStyle() {
      return {
        transform: `translateX(-${this.scrollX}px)`
      };
    }
  },
  mounted() {
    setInterval(() => {
      this.scrollX = (this.scrollX + 1) % (this.slideshowImages.length * 650);
    }, 30);
  },
  methods: {
    spawnParticles() {
      const container = this.$refs.particles;
      if (!container) return;
      for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${1 + Math.random()}s`;
        container.appendChild(particle);
        setTimeout(() => container.removeChild(particle), 2000);
      }
    }
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
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 15px 30px;
}
.logo {
  font-size: 2rem;
  font-weight: bold;
}
nav {
  display: flex;
  gap: 20px;
}
router-link {
  color: white;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;
}

.hero {
  text-align: center;
  padding: 60px 20px 20px;
  position: relative;
  z-index: 1;
}
.hero h2 {
  font-size: 2.7rem;
  margin-bottom: 15px;
  font-weight: 600;
}
.hero p {
  font-size: 1.3rem;
  margin-bottom: 35px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
.cta {
  background-color: white;
  color: #2c3e50;
  padding: 12px 25px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: bold;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: inline-block;
  position: relative;
  z-index: 1;
}
.cta:hover {
  transform: scale(1.08) rotate(-1deg);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  background-color: #ffefff;
}

.particles {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}
.particle {
  position: absolute;
  top: 100%;
  width: 8px;
  height: 8px;
  background: #fff;
  border-radius: 50%;
  animation: rise 2s ease-out forwards;
  opacity: 0.8;
}
@keyframes rise {
  to {
    transform: translateY(-150px);
    opacity: 0;
  }
}

.slideshow-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100%;
}

.slideshow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.sliding-showcase {
  width: 100%;
  overflow: hidden;
  position: relative;
  height: 100vh;
}

.scroll-track {
  display: flex;
  transition: transform 0.1s linear;
}

.scroll-item {
  flex: 0 0 auto;
  width: 100vw; /* Full screen width for each image */
  height: 100vh; /* Full screen height */
}

.scroll-item img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Makes sure images cover the background */
}

/* Background Slideshow */
.background-slideshow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2; /* Positioned behind the content card */
  overflow: hidden;
}

.scrolling-track {
  display: flex;
  transition: transform 0.1s linear;
}

.scroll-item {
  flex: 0 0 auto;
  width: 100vw; /* Full screen width for each image */
  height: 100vh; /* Full screen height */
}

.scroll-item img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Makes sure images cover the background */
}

/* Content Card */
.content-card {
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 20px;
  padding: 40px;
  position: relative;
  z-index: 2;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease, background-color 0.3s ease;
}

.content-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
  background-color: rgba(0, 0, 0, 0.8);
}

.card-title {
  font-size: 2.2rem;
  margin-bottom: 20px;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.card-description {
  font-size: 1.3rem;
  margin-bottom: 30px;
  line-height: 1.6;
  opacity: 0.9;
}

.card-cta {
  background-color: #FFDDEE;
  color: #2c3e50;
  padding: 16px 35px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
}

.card-cta:hover {
  transform: scale(1.1) rotate(-2deg);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  background-color: #ffefff;
}

</style>
