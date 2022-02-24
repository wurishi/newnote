const dataDisplacementImg = (function () {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (!context) {
        return ''
    }

    const r = 512,
        a = 512,
        i = 250,
        n = 100
    const o = i - n
    canvas.width = r
    canvas.height = a

    const line = (t: number, r: number, a: number, o: string[]) => {
        const len = o.length
        const l = (2 * Math.PI) / len
        let f = 0
        let s: CanvasGradient
        let c = '',
            u = ''
        for (let d = 0; d < len; d++) {
            c = o[d]
            u = o[(d + 1) % len]
            const p = t + Math.cos(f) * a
            const g = t + Math.cos(f + l) * a
            const v = r + Math.sin(f) * a
            const h = r + Math.sin(f + l) * a
            context.beginPath()
            s = context.createLinearGradient(p, v, g, h)
            s.addColorStop(0, c)
            s.addColorStop(1, u)
            context.strokeStyle = s
            context.arc(t, r, a, f, f + l)
            context.lineWidth = i - n
            context.stroke()
            context.closePath()
            f += l
        }
    }

    context.beginPath()
    context.arc(r / 2, a / 2, i, 0, Math.PI * 2)
    context.fillStyle = '#7f7f7f'
    context.fill()

    line(r / 2, a / 2, n + o / 2, [
        'rgb(255,0,0)',
        'rgb(0, 255, 0)',
        'rgb(255,0,0)',
        'rgb(0, 255, 0)',
    ])

    const f = context.createRadialGradient(r / 2, a / 2, n, r / 2, a / 2, i)
    f.addColorStop(0, 'rgba(127,127,127,1)')
    f.addColorStop(17 / o, 'rgba(115,115,115,.8)')
    f.addColorStop(25 / o, 'rgba(115,115,115,0.1)')
    f.addColorStop(28 / o, 'rgba(115,115,115,0.1)')
    f.addColorStop(37 / o, 'rgba(115,104,104,.8)')
    f.addColorStop(43 / o, 'rgba(115,104,104,1)')
    f.addColorStop(44 / o, 'rgba(127,127,127,1)')
    f.addColorStop(50 / o, 'rgba(127,127,127,.6)')
    f.addColorStop(54 / o, 'rgba(127,127,127,0)')
    f.addColorStop(61 / o, 'rgba(0,0,0,0)')
    f.addColorStop(67 / o, 'rgba(0,0,0,1)')
    f.addColorStop(78 / o, 'rgba(0,0,0,1)')
    f.addColorStop(88 / o, 'rgba(0,0,0,0)')
    f.addColorStop(100 / o, 'rgba(0,0,0,0)')
    f.addColorStop(108 / o, 'rgba(0,0,0,1)')
    f.addColorStop(117 / o, 'rgba(0,0,0,1)')
    f.addColorStop(136 / o, 'rgba(0,0,0,0)')
    f.addColorStop(1, 'rgba(0,0,0,0)')

    context.beginPath()
    context.arc(r / 2, a / 2, i, 0, Math.PI * 2)
    context.fillStyle = f
    context.fill()

    return canvas.toDataURL()
})()

export const dataImg2 = (() => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (!context) {
        return ''
    }

    const m = 600,
        g = 300,
        p = 300
    canvas.width = m
    canvas.height = g
    const w = 188
    context.fillStyle = `rgb(${[w, w, w].join()})`
    context.fillRect(0, 0, m, g)
    const y = context.createLinearGradient(m - p, 0, m, 0)
    y.addColorStop(0, `rgb(${[w, w, w].join()})`)
    y.addColorStop(1, `rgb(${[255, w, 0].join()})`)
    context.fillStyle = y
    context.fillRect(m - p, 0, p, g)

    return canvas.toDataURL()
})()

const Utils = {
    Tween: {
        Linear(t: number, e: number, r: number, a: number) {
            return (r * t) / a + e
        },
        EaseInOut(e: number, t: number, i: number, n: number) {
            if ((e /= n / 2) < 1) return (i / 2) * e * e + t
            return (-i / 2) * (--e * (e - 2) - 1)
        },
    },
    Ani: {
        CancelAnimationFrame(handle: number) {
            if ('requestAnimationFrame' in window) {
                cancelAnimationFrame(handle)
            } else {
                clearTimeout(handle)
            }
        },
        Animation(
            t: number,
            e: number,
            duration = 300,
            callback: any = () => {},
            easing = 'Linear'
        ) {
            const u = { duration, easing, callback }
            const animFrame =
                window.requestAnimationFrame ||
                ((cb: any) => setTimeout(cb, 17))
            let p = 0
            const g = Math.ceil(u.duration / 17)
            let v: number
            const m = (Utils.Tween as any)[u.easing] || Utils.Tween.Linear
            const b = () => {
                const r = m(p, t, e - t, g)
                p++
                if (p <= g) {
                    u.callback(r)
                    v = animFrame(b)
                } else {
                    u.callback(e, true)
                }
            }
            b()
            return () => {
                return v
            }
        },
    },
}

let ONLY: HTMLElement

export function rippleEffect(target: HTMLElement) {
    if (!target) {
        return
    }
    const e = navigator.userAgent
    if (/Safari|iPhone/i.test(e) && /chrome/i.test(e) == false) {
        window.console && console.info('Safari support but bug, so avoid!')
        return
    }
    const filterID = 'filterRipple'
    if (!document.getElementById(filterID)) {
        document.body.insertAdjacentHTML(
            'afterbegin',
            //
            `<svg style="position:absolute;height:0;clip:rect(0 0 0 0);">
                <defs>
                    <filter id="${filterID}">
                        <feImage xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="${dataDisplacementImg}" x="0" y="0" width="512" height="512" result="ripple" />
                        <feDisplacementMap xChannelSelector="G" yChannelSelector="R" color-interpolation-filters="sRGB" in="SourceGraphic" in2="ripple" scale="0" />
                        <feComposite operator="in" in2="ripple" />
                        <feComposite in2="SourceGraphic" />
                    </filter>
                </defs>
            </svg>`
        )
    }

    const i = document.querySelector(`#${filterID} feImage`)
    const n = document.querySelector(`#${filterID} feDisplacementMap`)

    let l: any
    let o: any
    target.addEventListener('click', (e) => {
        if (o) {
            Utils.Ani.CancelAnimationFrame(o())
        }
        if (l) {
            Utils.Ani.CancelAnimationFrame(l())
        }
        if (ONLY && ONLY !== target) {
            ONLY.style.filter = ''
        }
        target.style.filter = `url(#${filterID})`
        const a = target.offsetWidth
        const f = target.offsetHeight
        const s = e.clientX
        const c = e.clientY
        const u = target.getBoundingClientRect()
        const d = u.left
        const p = u.top
        const g = s - d
        const v = c - p
        i?.setAttribute('x', g + '')
        i?.setAttribute('y', v + '')
        i?.setAttribute('width', '0')
        i?.setAttribute('height', '0')
        const h = Math.min(512, Math.max(a, f) * 2)
        const m = (30 * h) / 512
        const b = (2e3 * h) / 512,
            w = (2100 * h) / 512

        l = Utils.Ani.Animation(m, 0, b, (t: number) => {
            n?.setAttribute('scale', String(t))
        })
        o = Utils.Ani.Animation(0, h, w, (e: number, r: boolean) => {
            i?.setAttribute('x', String(g - e / 2))
            i?.setAttribute('y', String(v - e / 2))
            i?.setAttribute('width', e + '')
            i?.setAttribute('height', e + '')
            if (r) {
                target.style.filter = ''
            }
        })
        ONLY = target
    })
}

export function flow(mapID: string) {
    const map = document.querySelector(mapID)
    if (map) {
        const run = () => {
            Utils.Ani.Animation(
                0,
                60,
                5e3,
                (time: number, end: boolean) => {
                    map.setAttribute('scale', String(time))
                    if (end) {
                        Utils.Ani.Animation(
                            60,
                            0,
                            5e3,
                            (_t: number, _e: boolean) => {
                                map.setAttribute('scale', String(_t))
                                if (_e) {
                                    run()
                                }
                            },
                            'EaseInOut'
                        )
                    }
                },
                'EaseInOut'
            )
        }
        run()
    }
}
