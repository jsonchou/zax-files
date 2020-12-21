/**
 * Files module.
 * @module zaxFiles
 * @see https://github.com/jsonchou/zax-util/tree/master/docs/files
 */

 /* istanbul ignore next */
if (!String.prototype.endsWith) {
	/* istanbul ignore next */
	String.prototype.endsWith = function (search, this_len) {
		if (this_len === undefined || this_len > this.length) {
			this_len = this.length;
		}
		return this.substring(this_len - search.length, this_len) === search;
	};
}

/* istanbul ignore next */
if (!String.prototype.startsWith) {
	/* istanbul ignore next */
	String.prototype.startsWith = function (search, pos) {
		return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search
	}
}

type Nothing = {} // jsdoc2md bugs, do not remove this line

export type ScriptOptions = {
	type?: string
	async?: boolean
	media?: string //'screen' | 'tty' | 'tv' | 'projection' | 'handheld' | 'print' | 'braille' | 'aural' | 'all'
	attrs?: Record<string, string>
}

export type StyleOptions = {
	media?: string //'screen' | 'tty' | 'tv' | 'projection' | 'handheld' | 'print' | 'braille' | 'aural' | 'all'
	charset?: string
	before?: HTMLElement | null
	attrs?: Record<string, string>
}

type HTMLElementMix = Pick<HTMLLinkElement & HTMLStyleElement, 'rel' | 'media' | 'innerHTML' | 'type' | 'href' | 'charset' | 'setAttribute'>

function isFile(item: string) {
	// 不要用 .css .js 判断是否为文件类型
	if (item.endsWith('.js')) {
		return true
	}
	if (item.startsWith('https://') || item.startsWith('http://') || item.startsWith('../') || item.startsWith('./')) {
		return true
	}
	return false
}

/**
 * load scripts
 *
 * ```js
 * let foo = await loadScripts(["//demo.com/a.js",'https://demo.com/b.js']);
 * //=> scripts[]
 * let bar = await loadScripts(`console.log(111)`);
 * //=> scripts[]
 * ```
 *
 * @param src { String | Array<String> } script array
 * @param options { ScriptOptions } script options
 * @returns  { Promise<HTMLScriptElement[]> } Promise value
 */
export function loadScripts(src: string | Array<string>, options?: ScriptOptions): Promise<(HTMLScriptElement | Error)[]> {
	if (typeof document === 'undefined') {
		console.log('loadStyles cannot be run on the server side');
		return Promise.reject('env error')
	}

	let arr: Array<string> = []

	if (typeof src === 'string') {
		arr = [src]
	} else {
		arr = src
	}

	let opts = options || {}

	let proms: Array<Promise<HTMLScriptElement | Error>> = []
	let len = arr.length
	arr.forEach((item, index) => {
		proms.push(
			new Promise<HTMLScriptElement | Error>((resolve, reject) => {
				/* istanbul ignore next */
				let head = document.head || document.getElementsByTagName('head')[0]
				let script = document.createElement('script')
				script.type = opts.type || 'text/javascript'
				script.async = opts.async === false ? false : true

				if (isFile(item)) {
					script.src = item
				} else {
					script.text = item
				}

				if (opts.attrs) {
					Object.keys(opts.attrs).map(sub => {
						/* istanbul ignore next */
						let suffix = sub === 'id' && len > 1 ? '_' + (index + 1) : ''
						opts.attrs && script.setAttribute && script.setAttribute(sub, opts.attrs[sub] + suffix)
					})
				}

				/* istanbul ignore next */
				script.addEventListener(
					'load',
					() => {
						script.onerror = script.onload = null
						resolve(script)
					},
					false
				)

				/* istanbul ignore next */
				script.addEventListener(
					'error',
					() => {
						script.onerror = script.onload = null
						reject(new Error('Failed to load ' + script.src))
					},
					false
				)

				head.appendChild(script)
			})
		)
	})

	return Promise.all(proms)
}

type Nothing2 = {} // jsdoc2md bugs, do not remove this line

/**
 * load styles
 *
 * ```js
 * let foo = await loadStyles(["//demo.com/a.css",'https://demo.com/b.css']);
 * //=> styles[]
 * let bar = await loadStyles(`.a{margin-right:10px}`);
 * //=> styles[]
 * ```
 *
 * @param src { String | Array<String> } remote css file or css segment array
 * @param options { StyleOptions } style options
 * @returns  { Array<Promise<Partial<HTMLElementMix> | Error>> } Promise value
 */
export function loadStyles(src: string | Array<string>, options?: StyleOptions): Promise<(Partial<HTMLElementMix> | Error)[]> {
	if (typeof document === 'undefined') {
		console.log('loadStyles cannot be run on the server side');
		return Promise.reject('env error')
	}

	let opts = options || {}
	let arr: Array<string> = []

	if (typeof src === 'string') {
		arr = [src]
	} else {
		arr = src
	}

	let proms: Array<Promise<Partial<HTMLElementMix> | Error>> = []
	let len = arr.length

	arr.forEach((item, index) => {
		proms.push(
			new Promise<Partial<HTMLElementMix> | Error>((resolve, reject) => {
				let tag: Partial<HTMLElementMix>

				if (isFile(item)) {
					tag = document.createElement('link')
					tag.rel = 'stylesheet'
					tag.href = item
					if (opts.media) {
						tag.media = opts.media
					}
					tag.charset = opts.charset || 'utf8'
				} else {
					tag = document.createElement('style')
					tag.innerHTML = item
					if (opts.media) {
						tag.media = opts.media
					}
					tag.type = 'text/css'
				}

				let before = opts.before

				if (!before) {
					/* istanbul ignore next */
					let befores = (document.body || document.getElementsByTagName('head')[0]).childNodes
					before = befores[befores.length - 1] as HTMLLinkElement
				}

				if (opts.attrs) {
					Object.keys(opts.attrs).map(sub => {
						/* istanbul ignore next */
						let suffix = sub === 'id' && len > 1 ? '_' + (index + 1) : ''
						opts.attrs && tag.setAttribute && tag.setAttribute(sub, opts.attrs[sub] + suffix)
					})
				}

				before && before.parentNode && before.parentNode.insertBefore(tag as Node, before.nextSibling)
				resolve(tag)
			})
		)
	})

	return Promise.all(proms)
}

export default {
	loadScripts,
	loadStyles
}
