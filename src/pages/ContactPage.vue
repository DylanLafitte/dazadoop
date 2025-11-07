<template>
  <div class="carousel-wrap">
    <BackgroundCarousel />
    <div class="info-card-centered" role="article" aria-labelledby="contact-title">
      <h1 id="contact-title" style="text-align:center; margin:8px;">Contact & Socials</h1>

      <div class="contact-content">
        <p class="lead">Find me on these platforms - click to open in a new tab.</p>

        <nav class="contact-links" aria-label="external contact links">
          <a class="contact-link" href="https://x.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)">
            <span class="contact-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
                <path d="M18.36 5.64a9 9 0 1 0 0 12.72 9 9 0 0 0 0-12.72z" fill="currentColor" opacity="0.06"/>
                <path d="M7.76 16.24L16.24 7.76" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7.76 7.76L16.24 16.24" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            X - @dazadoop
          </a>

          <a class="contact-link" href="https://bsky.app/profile/yourhandle.bsky.social" target="_blank" rel="noopener noreferrer" aria-label="Bluesky">
            <span class="contact-icon" aria-hidden="true">
              <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" role="img" fill="currentColor">
                <path d="M128 107.3c14.4-30 54.2-89.3 94-89.3 6.9 0 22 3.8 27.4 21.5 5.8 19.5-4.1 50.5-9.7 67.7-10.2 31.5-36.6 78.7-83.7 78.7-12.5 0-24-4.2-28-5.9v.1c4 1.7 15.5 5.9 28 5.9 47.1 0 73.5-47.2 83.7-78.7 5.6-17.2 15.5-48.2 9.7-67.7C244 21.8 228.9 18 222 18c-39.8 0-79.6 59.3-94 89.3-14.4-30-54.2-89.3-94-89.3-6.9 0-22 3.8-27.4 21.5-5.8 19.5 4.1 50.5 9.7 67.7 10.2 31.5 36.6 78.7 83.7 78.7 12.5 0 24-4.2 28-5.9v-.1c-4 1.7-15.5 5.9-28 5.9-47.1 0-73.5-47.2-83.7-78.7-5.6-17.2-15.5-48.2-9.7-67.7C10 21.8 25.1 18 32 18c39.8 0 79.6 59.3 94 89.3z" fill="currentColor"/>
              </svg>
            </span>
            Bluesky - @dazadoop
          </a>


          <a class="contact-link" href="https://discord.com/invite/your-invite" target="_blank" rel="noopener noreferrer" aria-label="Discord">
            <span class="contact-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img">
                <path d="M20 4.5S18.5 3 16 3H8C5.5 3 4 4.5 4 4.5S5 7 6 8c0 0 1.5-1 4-1s4 1 4 1 1-1 2-2c1-1 2-3.5 2-3.5z" fill="currentColor" opacity="0.06"/>
                <path d="M8.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm7 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" fill="currentColor"/>
              </svg>
            </span>
            Discord - Join server
          </a>

          <a class="contact-link" href="mailto:you@example.com" aria-label="Email">
            <span class="contact-icon" aria-hidden="true">
              <!-- envelope -->
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img">
                <rect x="2" y="5" width="20" height="14" rx="2" fill="currentColor" opacity="0.06"/>
                <path d="M3 7l9 6 9-6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
              </svg>
            </span>
            Email - dazadoop@dazadoop.dazadoop
          </a>
        </nav>

      </div>
    </div>
  </div>
</template>

<script>
import BackgroundCarousel from '@/components/BackgroundCarousel.vue';
export default {
  name: 'ContactPage',
  components: { BackgroundCarousel },
};
</script>

<style scoped>
.carousel-wrap {
  position: relative;
  width: 100%;
  height: calc(100vh - 50px);
  min-height: 0;
  display: block;
}

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

:root {
  --card-gap: 24px;
  --card-width: 250px;
  --card-border: 6px;

  --accent-light: #FFDDEE;  
  --accent-mid:   #C9B7EA;   
  --accent-contrast: #E6C2F6; 

  --card-border-gradient: linear-gradient(90deg, var(--accent-light) 0%, var(--accent-contrast) 55%, var(--accent-mid) 100%);
}

.card {
  flex: 0 0 var(--card-width);
  display: flex;
  justify-content: center;
  width: var(--card-width);
  height: 100%;
  min-height: 0;
  border-radius: 10px;
  box-sizing: border-box;
  overflow: hidden;
  background: transparent;
  padding: 6px;

  border: var(--card-border) solid transparent;
  border-image: var(--card-border-gradient) 1;
  box-shadow: none;
}

.card img {
  display: block;
  height: 100%;
  width: auto;
  max-width: none;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: none;
  transition: transform 0.12s, opacity 0.12s;
  box-sizing: border-box;

  background-color: rgba(255, 242, 250, 0.04);
}

.card img:hover {
  transform: translateY(-4px);
  opacity: 0.98;
}


.info-card-centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(30, 30, 40, 0.92);
  color: #fff;
  border-radius: 2vw;
  padding: 1vw 2vw 1vw 2vw;
  box-shadow:
    0 0.6vw 2vw 0 rgba(200, 100, 200, 0.18),
    0 0.15vw 0.6vw 0 rgba(0,0,0,0.18),
    0 0 0 0.6vw rgba(255, 221, 238, 0.12);
  z-index: 10;
  max-width: 98vw;
  min-width: 320px;
  border: 0.3vw solid #FFDDEE;
  backdrop-filter: blur(0.6vw);
  pointer-events: auto;
  transition: box-shadow 0.2s, border-color 0.2s, background 0.2s;
  font-size: 0.7rem;
  max-height: 80vh;
  width: 55vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

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
  min-width: 0;
  min-height: 0;
  overflow-wrap: break-word;
  word-break: break-word;
}

.info-card-centered p,
.info-card-centered ul {
  font-size: clamp(0.7em, 0.85vw, 0.95em);
  margin-bottom: 0.5rem;                    
  line-height: 1.18;
}

.info-card-centered h2 {
  font-size: clamp(0.9em, 1.2vw, 1.5em);
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #FFDDEE;
  text-shadow: 0 2px 8px rgba(0,0,0,0.18);
}

@media (max-width: 700px) {
  .info-card-centered {
    font-size: 1rem;
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
  list-style: none;
  padding: 0;
  margin: 10px 0 0 0;
  font-size: 0.95rem;
  text-align: left;     
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

.tos-content {
  padding: 8px 32px;
  overflow: auto;
  height: 100%;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,221,238,0.9) rgba(255,255,255,0.03);
}

.tos-content::-webkit-scrollbar { 
  width: 12px; 
}

.tos-content::-webkit-scrollbar-track { 
  background: transparent;
  border-radius: 8px;
}

.tos-content::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, rgba(255,221,238,0.95), rgba(201,183,234,0.95));
  border-radius: 10px;
  border: 2px solid rgba(0,0,0,0.12);
}

.tos-content::before,
.tos-content::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 32px;
  pointer-events: none;
  z-index: 5;
}

.tos-content::before {
  top: 0;
  background: linear-gradient(180deg, rgba(22,20,28,0.92), rgba(22,20,28,0));
}

.tos-content::after {
  bottom: 0;
  background: linear-gradient(0deg, rgba(22,20,28,0.92), rgba(22,20,28,0));
}

.tos-content > * {
  position: relative;
  z-index: 6;
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

.contact-content {
  padding: 12px 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
}

.contact-content .lead {
  margin: 6px 0 12px 0;
  color: rgba(255,255,255,0.92);
  font-weight: 600;
}

.contact-links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 6px 0;
  z-index: 12;
}

.contact-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 10px;
  background: linear-gradient(90deg, #FFDDEE 0%, #C9B7EA 100%);
  color: #2c2c3e;
  font-weight: 700;
  text-decoration: none;
  transition: transform 120ms ease, box-shadow 120ms ease, opacity 120ms ease;
  white-space: nowrap;
}

.contact-icon {
  width: 38px;
  height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 38px;
  border-radius: 10px;
  background: rgba(255,255,255,0.06);
}

.contact-icon svg { 
  width: 20px; 
  height: 20px; 
  display:block; 
  color: #2c2c3e; 
  fill: currentColor; 
  stroke: currentColor; 
}

.contact-link { gap: 12px; padding: 12px 16px; }

@media (max-width:700px) {
  .contact-links { gap: 10px; }
  .contact-link { padding: 10px 12px; font-size: 0.95rem; }
  .contact-icon { width: 28px; height: 28px; flex: 0 0 28px; border-radius: 8px; }
  .contact-icon svg { width: 16px; height: 16px; }
}
</style>
