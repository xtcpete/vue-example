import { createRouter, createWebHistory } from 'vue-router'
import Resources from '../components/Resources.vue'         // Your home or main component
import ProjectRubric from '../components/Rubrics.vue'  // The component displaying your markdown

const routes = [
  { path: '/', name: 'ProjectRubric', component: ProjectRubric },
  { path: '/project-resources', name: 'Resources', component: Resources },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router