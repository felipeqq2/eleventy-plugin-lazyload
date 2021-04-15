const test = require('ava')
const cheerio = require('cheerio')
const lazyLoad = require('../main')

/**
 *
 * @param {number} length The length of the string
 * @returns Random string
 */
function randomString(length) {
	var result = ''
	var characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	var charactersLength = characters.length
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength))
	}
	return result
}

function load(entry) {
	return cheerio.load(lazyLoad(entry, { alt: true }))
}

///! TESTS

/// Single img tag
test('single img tag with no attributes', (t) => {
	let entry = '<img>'
	let $ = load(entry)

	t.is($('img').attr('loading'), 'lazy')
})

test('single img tag with loading lazy attribute', (t) => {
	let entry = '<img loading="lazy">'
	let $ = load(entry)

	t.is($('img').attr('loading'), 'lazy')
})

test('single img tag with empty loading attribute', (t) => {
	let entry = '<img loading="">'
	let $ = load(entry)

	t.is($('img').attr('loading'), 'lazy')
})

test('single img tag with random loading attribute', (t) => {
	let attr = randomString(5)
	let entry = `<img loading="${attr}">`
	let $ = load(entry)

	t.is($('img').attr('loading'), attr)
})

test('single img tag with src attribute', (t) => {
	let entry = `<img src="foo">`
	let $ = load(entry)

	t.is($('img').attr('loading'), 'lazy')
	t.is($('img').attr('src'), 'foo', 'img src attr changed')
})

test('single img tag inside picture', (t) => {
	let entry = `<picture loading=""><img><figcaption></figcaption></picture>`
	let $ = load(entry)

	t.is($('img').attr('loading'), 'lazy')
	t.is($('picture').attr('loading'), '', 'Picture attr changed')
})

/// Multiple IMG tags
test('multiple img tags with no attributes', (t) => {
	let entry = '<img id="first"><img id="second">'
	let $ = load(entry)

	t.is($('#first').attr('loading'), 'lazy')
	t.is($('#second').attr('loading'), 'lazy')
})

test('multiple img tags with loading lazy attribute', (t) => {
	let entry =
		'<img id="first" loading="lazy"><foo><img loading="lazy" id="second">'
	let $ = load(entry)

	t.is($('#first').attr('loading'), 'lazy')
	t.is($('#second').attr('loading'), 'lazy')
})

test('multiple img tags with empty loading attribute', (t) => {
	let entry = '<img id="first" loading=""><img id="second" loading="">'
	let $ = load(entry)

	t.is($('#first').attr('loading'), 'lazy')
	t.is($('#second').attr('loading'), 'lazy')
})

test('multiple img tags with random loading attribute', (t) => {
	let attr = randomString(5)
	let entry = `<img id="first" loading="${attr}"><img id="second" loading="${attr}">`
	let $ = load(entry)

	t.is($('#first').attr('loading'), attr)
	t.is($('#second').attr('loading'), attr)
})

test('multiple img tags with empty & random loading attribute', (t) => {
	let attr = randomString(5)
	let entry = `<img loading="${attr}" id="first"><img id="second">`
	let $ = load(entry)

	t.is($('#first').attr('loading'), attr)
	t.is($('#second').attr('loading'), 'lazy')
})

test('multiple img tags with src attribute', (t) => {
	let entry = `<img id="first" src="foo"><img id="second" src="foo">`
	let $ = load(entry)

	t.is($('#first').attr('loading'), 'lazy')
	t.is($('#second').attr('loading'), 'lazy')
	t.is($('#first').attr('src'), 'foo', 'img src attr changed')
	t.is($('#second').attr('src'), 'foo', 'img src attr changed')
})

test('multiple img tags inside picture', (t) => {
	let attr = randomString(5)
	let entry = `<picture loading=""><img id="first"><figcaption></figcaption><img loading="${attr}" id="second"></picture><img id="third">`
	let $ = load(entry)

	t.is($('#first').attr('loading'), 'lazy')
	t.is($('#second').attr('loading'), attr)
	t.is($('#third').attr('loading'), 'lazy')
	t.is($('picture').attr('loading'), '', 'Picture attr changed')
})
