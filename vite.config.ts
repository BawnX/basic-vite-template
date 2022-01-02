import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import {VitePWA} from "vite-plugin-pwa";
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import Markdown from 'vite-plugin-md'
import Prism from 'markdown-it-prism'
import LinkAttributes from 'markdown-it-link-attributes'

import path from 'path'

const markdownWrapperClasses = 'prose prose-sm m-auto text-left'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '~/': `${path.resolve(__dirname, 'src')}/`,
        }
    },
    plugins: [
        vue({
            include: [/\.vue$/, /\.md$/],
        }),
        Pages({
            extensions: ['vue', 'md'],
            pagesDir: 'src/pages',
        }),
        AutoImport({
            imports: [
                'vue',
                'vue-router',
                '@vueuse/head',
                '@vueuse/core',
                'vitest',
            ],
            dts: 'src/auto-imports.d.ts',
        }),
        Components({
            // allow auto load markdown components under `./src/components/`
            extensions: ['vue', 'md'],

            // allow auto import and register components used in markdown
            include: [/\.vue$/, /\.vue\?vue/, /\.md$/],

            // custom resolvers
            resolvers: [
                // auto import icons
                // https://github.com/antfu/unplugin-icons
                IconsResolver({
                    componentPrefix: '',
                    // enabledCollections: ['carbon']
                }),
            ],

            dts: 'src/components.d.ts',
        }),
        Icons({
            autoInstall: true,
        }),
        Markdown({
            wrapperClasses: markdownWrapperClasses,
            headEnabled: true,
            markdownItSetup(md) {
                // https://prismjs.com/
                md.use(Prism)
                md.use(LinkAttributes, {
                    pattern: /^https?:\/\//,
                    attrs: {
                        target: '_blank',
                        rel: 'noopener',
                    },
                })
            },
        }),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.svg', 'robots.txt', 'safari-pinned-tab.svg'],
            manifest: {
                name: 'Vitesse',
                short_name: 'Vitesse',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: '/pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: '/pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                    {
                        src: '/pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable',
                    },
                ],
            },
        }),
    ],

    server: {
        fs: {
            strict: true,
        },
    },

    // https://github.com/antfu/vite-ssg
    ssgOptions: {
        script: 'async',
        formatting: 'minify',
    },

    optimizeDeps: {
        include: [
            'vue',
            'vue-router',
            '@vueuse/core',
            '@vueuse/head',
        ],
        exclude: [
            'vue-demi',
        ],
    },

    test: {
        include: ['test/**/*.test.ts'],
        environment: 'jsdom',
        deps: {
            inline: ['@vue', '@vueuse', 'vue-demi'],
        },
    },
})
