const lazyLoad = require('./main.js')

/**
 *
 * @param {Object} config
 */
module.exports = function (config) {
	config.addTransform('lazyload', async (content, outputPath) => {
		if (outputPath && outputPath.endsWith('.html')) {
			return lazyLoad(content)
		}
		return content
	})
}
