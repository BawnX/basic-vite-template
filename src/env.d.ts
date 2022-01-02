declare interface Window {
    // extend the window
}

// with vite-plugin-md, markdowns can be treat as Vue components
declare module '*.md' {
    import type { ComponentOptions } from 'vue'
    const component: ComponentOptions
    export default component
}

declare module '*.vue' {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    import {DefineComponent} from "vue";
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare module vue {
    interface GlobalComponents {
        RouterLink: typeof RouterLink & {
            __VLS_slots: {
                default: UnwrapRef<ReturnType<typeof useLink>>
            }
        },
        RouterView: typeof RouterView & {
            __VLS_slots: {
                default: {
                    Component: VNode,
                    route: RouteLocationNormalized & { href: string }
                }
            }
        }
    }
}
