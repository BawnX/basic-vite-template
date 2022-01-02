import {ViteSSG} from 'vite-ssg'
import routes from 'virtual:generated-pages'
import {createPinia} from 'pinia'
import App from './App.vue'

import './assets/index.css'

export const createApp = ViteSSG(
    App,
    {routes, base: import.meta.env.BASE_URL},
    (ctx) => {
        // install all modules under `modules/`
        ctx.app.use(createPinia())
        Object.values(import.meta.globEager('./modules/*.ts')).map(i => i.install?.(ctx))
    },
)
