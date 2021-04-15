# Lazyload images ([Eleventy](https://11ty.dev/) plugin)

This plugin searches for `<img>` tags and adds the attribute `loading="lazy"` to improve web performance without adding external scripts😎; you can deactivate it in a per-image basis adding the attribute `loading="eager"` (it is advised to do this with images that are in the first visible viewport).

The attribute is better explained [here](https://web.dev/browser-level-image-lazy-loading/), and it's supported on [most browsers](https://caniuse.com/loading-lazy-attr).

## Getting started

Install the package:

```bash
npm install --save-dev eleventy-plugin-lazyload

# or:
yarn add --dev eleventy-plugin-lazyload
```

Then update your Eleventy configuration file (usually `.eleventy.js`):

```js
const lazyloadPlugin = require('eleventy-plugin-lazyload')

module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(lazyloadPlugin, {
		alt: false, // if enabled, adds an empty alt attribute on images that don't have it
	})
}
```

## License

This project is licensed under the [MIT license](./LICENSE)
