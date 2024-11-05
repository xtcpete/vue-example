<script setup>
import { ref, onMounted } from 'vue'
import MarkdownIt from 'markdown-it'

// Initialize the MarkdownIt instance
const markdown = new MarkdownIt();

const source = ref("# DSCI 554 Final Project"); // Initial default value

// Fetch the markdown file content on component mount
onMounted(async () => {
  try {
    const response = await fetch('project_resources.md');
    if (response.ok) {
      source.value = await response.text();
    } else {
      console.error('Failed to load markdown file:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching markdown file:', error);
  }
});
</script>

<template>
  <div>
    <!-- Render the converted HTML content -->
    <div v-html="markdown.render(source)" />
    <br />
  </div>
</template>

<style scoped>
/* Style the rendered markdown content */
</style>