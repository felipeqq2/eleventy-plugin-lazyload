const cheerio = require('cheerio')

/**
 *
 * @param {String} content HTML string to be parsed
 * @param {Object} options Parser options
 * @returns {String} Changed HTML string
 */
module.exports = (content, options) => {
	var $ = cheerio.load(content)

	$('img').attr('loading', (_, attr) => {
		if (!attr) return 'lazy'
		return attr
	})

	if (options.alt) {
		$('img').attr('alt', (_, attr) => {
			if (!attr) return ' '
			return attr
		})
	}

	return $.html()
}
