const test = require('ava')
const cheerio = require('cheerio')
const lazyLoad = require('../main')

function load(entry, enabled) {
	if (enabled) return cheerio.load(lazyLoad(entry, { alt: true }))
	else return cheerio.load(lazyLoad(entry, { alt: false }))
}

///! TESTS

test('single img tag with no attributes', (t) => {
	let entry = '<img>'
	let $ = load(entry, true)

	t.is($('img').attr('loading'), 'lazy')
	t.is($('img').attr('alt'), '')
})

test('single img tag with no attributes, option off', (t) => {
	let entry = '<img>'
	let $ = load(entry, false)

	t.is($('img').attr('loading'), 'lazy')
	t.is(typeof $('img').attr('alt'), 'undefined')
})

test('single img tag with alt', (t) => {
	let entry = '<img alt="alt">'
	let $ = load(entry, true)

	t.is($('img').attr('loading'), 'lazy')
	t.is($('img').attr('alt'), 'alt')
})

test('single img tag with alt, option off', (t) => {
	let entry = '<img alt="alt">'
	let $ = load(entry, false)

	t.is($('img').attr('loading'), 'lazy')
	t.is($('img').attr('alt'), 'alt')
})

test('multiple img tags', (t) => {
	let entry = '<img id="first" alt="alt"><img id="second">'
	let $ = load(entry, true)

	t.is($('img').attr('loading'), 'lazy')
	t.is($('#first').attr('alt'), 'alt')
	t.is($('#second').attr('alt'), '')
})

test('multiple img tags, option off', (t) => {
	let entry = '<img id="first" alt="alt"><img id="second">'
	let $ = load(entry, false)

	t.is($('img').attr('loading'), 'lazy')
	t.is($('#first').attr('alt'), 'alt')
	t.is(typeof $('#second').attr('alt'), 'undefined')
})
