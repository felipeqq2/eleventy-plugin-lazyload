const lazyLoad = require('./main.js')

module.exports.configFunction = (config, options = {}) => {
	options = Object.assign(
		{
			alt: false,
		},
		options
	)
	config.addTransform('lazyload', async (content, outputPath) => {
		if (outputPath && outputPath.endsWith('.html')) {
			return lazyLoad(content, options)
		}
		return content
	})
}
