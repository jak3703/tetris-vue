import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

// import route components
import App from './App.vue'
import GamePage from './components/pages/GamePage.vue'
import HomePage from './components/pages/HomePage.vue'

// import styles
import './styles/piece-colors.css'
import './styles/grid-styles.css'
import './styles/menu-styles.css'

const routes = [
	{ path: '/', component: HomePage },
	{ path: '/game', component: GamePage }
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
