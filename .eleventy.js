// const upgradeHelper = require("@11ty/eleventy-upgrade-help")
// const slugify = require("@sindresorhus/slugify")

module.exports = function(eleventyConfig) {
    // eleventyConfig.addPlugin(upgradeHelper)
    eleventyConfig.addPassthroughCopy("src/assets")
        // eleventyConfig.addFilter('slugify', input => {
        //     return slugify(input)
        // })
    eleventyConfig.addFilter("upper", input => {
        return input.toUpperCase();
    })
    return {
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk",
        dir: {
            input: 'src',
            includes: '_includes',
            output: 'public',
        },

    };
}