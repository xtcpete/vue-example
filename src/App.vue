<script setup>
import HelloWorld from './components/HelloWorld.vue'
import Rubric from './components/Rubrics.vue'
</script>

<template>
  <div class="container">
    <header>
      <div class="wrapper">
        <!-- Title or Logo -->
        <HelloWorld msg="DSCI 554 Final Project" />

        <!-- Navigation Bar -->
        <nav>
          <RouterLink to="/">Rubrics</RouterLink>
          <RouterLink to="/project-resources">Resources</RouterLink>
        </nav>
      </div>
    </header>

    <!-- Main Content Area -->
    <RouterView class="subpage" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  line-height: 1.5;
  text-align: center;
  width: 100%;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
}

nav {
  width: 100%;
  font-size: 1rem;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  padding: 0.5rem 1rem;
  border-bottom: 2px solid transparent;
}

nav a:hover {
  border-bottom: 2px solid var(--color-border);
}



@media (min-width: 1024px) {
  
  header {
    margin: 0;
  }

  .subpage {
    height: 80vh;
  }

  body {
    margin: 0;
    display: flex;
    flex-direction: column;
  }
}
</style>
