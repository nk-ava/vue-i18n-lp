module.exports = function (content) {
    if (!this.resourceQuery.includes("blockType=i18n")) return ""
    const i18nJson = JSON.parse(content.trim())
    return `
    export default function(Component) {
        if(!Component.options.i18n) Component.options.i18n = {};
        const i18n = ${JSON.stringify(i18nJson)};
        for(let k in i18n) {
            if(Component.options.i18n[k]) {
                Object.assign(Component.options.i18n[k], i18n[k])
            }else{
                Component.options.i18n[k] = i18n[k]
            }
        }
    }`
}