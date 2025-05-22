<template>
  <div class="portfolio">
    <header class="app-header">
      <div class="logo">Art by [Dazadoop]</div>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/commissions">Commissions</router-link>
        <router-link to="/about-me">About Me</router-link>
        <router-link to="/faq">FAQ</router-link>
        <router-link to="/contact">Contact</router-link>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

html, body, #app, .portfolio {
  overflow: hidden !important;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  min-height: 100vh;
  min-width: 100vw;
  background: none;
  padding: 0;
  margin: 0;
}

#app {
  min-height: 100vh;
  min-width: 100vw;
  margin: 0;
  padding: 0;
}

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

/* Style all router-links inside nav */
nav > .router-link-active,
nav > .router-link-exact-active,
nav > a.router-link-active,
nav > a.router-link-exact-active {
  background: linear-gradient(90deg, #FFDDEE 0%, #C9B7EA 100%);
  color: #2c2c3e !important;
  font-weight: 700;
  border-radius: 10px;
  box-shadow: 0 4px 18px rgba(200, 100, 200, 0.13);
  padding: 10px 24px;
  text-decoration: none;
  transition: background 0.2s, color 0.2s, transform 0.15s;
}

nav > a,
nav > .router-link-active,
nav > .router-link-exact-active {
  color: #fff;
  font-weight: 600;
  font-size: 1.08rem;
  padding: 10px 24px; /* Make padding same as active for all states */
  border-radius: 10px;
  text-decoration: none;
  transition: background 0.2s, color 0.2s, transform 0.15s, box-shadow 0.2s;
  background: transparent;
  box-shadow: none;
  position: relative;
  outline: none;
  /* Prevent shift by reserving space for border if you add one */
  box-sizing: border-box;
}

nav > a:hover,
nav > a:focus {
  background: linear-gradient(90deg, #FFDDEE 0%, #C9B7EA 100%);
  color: #2c2c3e;
  transform: translateY(-2px) scale(1.06);
  box-shadow: 0 8px 32px rgba(200, 100, 200, 0.18);
  text-decoration: none;
}

nav > .router-link-active,
nav > .router-link-exact-active {
  background: linear-gradient(90deg, #FFDDEE 0%, #C9B7EA 100%);
  color: #2c2c3e !important;
  box-shadow: 0 8px 32px rgba(200, 100, 200, 0.18);
  transform: scale(1.08);
}
</style>