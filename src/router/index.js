import { createRouter, createWebHistory } from 'vue-router'
import Resources from '../components/Resources.vue'         // Your home or main component
import ProjectRubric from '../components/Rubrics.vue'  // The component displaying your markdown
import Deploy from '../components/Deploy.vue'  // The component displaying your markdown

const routes = [
  { path: '/rubric', name: 'ProjectRubric', component: ProjectRubric },
  { path: '/resources', name: 'Resources', component: Resources },
  { path: '/deploy', name: 'Deploy', component: Deploy },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router