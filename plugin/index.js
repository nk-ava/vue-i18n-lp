export default function (Vue, options) {
    const i18n = new Vue({
        data() {
            return {
                lang: localStorage.getItem("language") || navigator.language
            }
        },
        watch: {
            lang: {
                handler(newVal) {
                    localStorage.setItem("language", newVal)
                },
                immediate: true
            }
        }
    })
    const $t = function (key, ...params) {
        const format = this.$options.i18n[$t.lang][key]
        return $t.format(format, params)
    }
    $t.format = (formatStr, ...params) => {
        const list = formatStr.split("%s")
        let str = ""
        const size = list.length
        str += list[0]
        for (let i = 1; i < size; i++) {
            str += (params[i - 1] || "") + list[i]
        }
        return str
    }
    $t.setLang = (lang) => {
        $t.lang = lang
    }
    $t.getLang = () => {
        return $t.lang
    }
    Object.defineProperty($t, "lang", {
        get() {
            return i18n.lang
        },
        set(val) {
            i18n.lang = val
        }
    })
    Vue.prototype.$t = $t
}