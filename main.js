const cheerio = require('cheerio')

/**
 *
 * @param {String} content HTML string to be parsed
 * @returns {String} Changed HTML string
 */
module.exports = (content) => {
	var $ = cheerio.load(content)
	$('img').attr('loading', (_, attr) => {
		if (!attr) {
			return 'lazy'
		}
		return attr
	})
	return $.html()
}
