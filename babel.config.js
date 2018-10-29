module.exports = {
  presets: [
    /**
     * Commenting out because already present internally is
     * the @vue/babel-preset-app according to
     * https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/babel-preset-app
     * and 
     * https://cli.vuejs.org/config/#babel
     * Not commenting this it causes the
     * Cannot assign to read only property 'exports' of object '#<Object>'
     * See links below:
     * https://forum.vuejs.org/t/vue-cli-3-and-ie-11-not-working/38717/12
     * https://github.com/webpack/webpack/issues/4039
     */
    //'@vue/app'
  ]
}
