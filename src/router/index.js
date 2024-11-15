import { createRouter, createWebHistory } from 'vue-router';
import StoriesV from '../views/StoriesV.vue';
import HotStories from '@/views/HotStories.vue';
import ShowStories from '@/views/ShowStories.vue';
import JobsStories from '@/views/JobsStories.vue';
import AskStories from '@/views/AskStories.vue';
import TaskOne from '@/views/TaskOne.vue';
//import PollStories from '@/views/PollStories.vue';

const routes = [
  { path: '/', name: 'Stories', component: StoriesV },
  { path: '/hot', name:'HotStories', component: HotStories},
  { path: '/show', name:'ShowStories', component: ShowStories},
  { path: '/jobs', name:'JobStories', component: JobsStories},
  { path: '/ask', name:'AskStories', component: AskStories},
  //{ path: '/polls', name:'PollStories', component: PollStories}
  { path: '/login', name:'TaskOne', component: TaskOne}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
