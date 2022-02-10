import { createRouter, createWebHashHistory } from 'vue-router'

const allComponents = import.meta.glob('../components/*/*.vue')

const routes: any[] = []

Object.keys(allComponents).forEach((key) => {
    const name = key.split('/').pop()
    const lastIndex = name?.lastIndexOf('.vue')
    routes.push({
        path: '/' + name?.substring(0, lastIndex),
        component: allComponents[key],
        name: key,
    })
})

if (routes.length > 0) {
    routes.push({
        redirect: routes[routes.length - 1].path,
        path: '/',
    })
}

export function getAllLinks() {
    return routes.filter((it) => it.path !== '/').map((it) => it.path)
}

export default createRouter({
    history: createWebHashHistory(),
    routes,
})
