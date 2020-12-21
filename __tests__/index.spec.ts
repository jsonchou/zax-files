jest.setTimeout(30000)

import * as fs from 'fs'
import * as path from 'path'

import zaxFiles from '../src/index'

import { log } from '../src/_utils/index'

const html = fs.readFileSync(path.resolve(__dirname, '../__mocks__', 'index.html'), 'utf8')

describe('zaxFiles', () => {
	beforeEach(() => {
		// Object.defineProperty(window, 'document', { value: window.document, configurable: true, writable: true })
	})

	let keys = Object.keys(zaxFiles)
	keys.forEach(par => {
		it(`should have ${par} method`, () => {
			expect(zaxFiles).toHaveProperty(par)
			expect(zaxFiles[par]).toBeInstanceOf(Function)
		})
	})

	it(`should be correct loadScripts function`, async () => {
		let res = zaxFiles.loadScripts(['../__mocks__/a.js', '../__mocks__/b.js'])
		expect(res).toBeInstanceOf(Promise)
		res.then(info => {
			console.log('loadScripts', info)
			expect(info).toBeTruthy()
		}).catch(err => {
			console.error(2222, err)
		})

		res = zaxFiles.loadScripts(['../__mocks__/a.js', '../__mocks__/b.js'], {
			async: true,
			type: 'text/javascript',
			attrs: {
				id: 'myScript'
			}
		})
		expect(res).toBeInstanceOf(Promise)
		res.then(info => {
			console.log('loadScripts', info)
			expect(info).toBeTruthy()
		}).catch(err => {
			console.error(2222, err)
		})

		res = zaxFiles.loadScripts(['../__mocks__/a.js', '../__mocks__/b.js'], { async: false })
		expect(res).toBeInstanceOf(Promise)
		res.then(info => {
			// console.log('loadScripts', info)
			expect(info).toBeTruthy()
		}).catch(err => {
			console.error(2222, err)
		})

		res = zaxFiles.loadScripts('../__mocks__/a.js')
		expect(res).toBeInstanceOf(Promise)
		res.then(info => {
			console.log(3333, info)
			expect(info).toBeTruthy()
		}).catch(err => {
			console.error(4444, err)
		})

		res = zaxFiles.loadScripts(`console.log('inline script')`)
		expect(res).toBeInstanceOf(Promise)
		res.then(info => {
			console.log('log:inline script', info)
			expect(info).toBeTruthy()
		}).catch(err => {
			console.error(4444, err)
		})
	})

	it(`should be correct loadStyles function`, async () => {
		// console.log(1111111, document.documentElement.innerHTML)
		// console.log(1111111, document.getElementById('box'))

		// reset
		document.documentElement.innerHTML = html.toString()
		let res = zaxFiles.loadStyles(['../__mocks__/a.css', '../__mocks__/b.css'], { before: document.getElementById('box') })
		expect(res).toBeInstanceOf(Promise)
		res.then(info => {
			expect(info).toBeTruthy()
			// console.log('innerHTML', document.querySelector('body')!.innerHTML)
		}).catch(err => {
			console.error('loadStyles', err)
		})

		// reset
		document.documentElement.innerHTML = html.toString()
		res = zaxFiles.loadStyles(['../__mocks__/a.css', '../__mocks__/b.css'], {
			media: 'all',
			attrs: {
				id: 'myStyle'
			}
		})
		expect(res).toBeInstanceOf(Promise)
		res.then(info => {
			expect(info).toBeTruthy()
			// console.log('innerHTML', document.querySelector('body')!.innerHTML)
		}).catch(err => {
			console.error('loadStyles', err)
		})

		// reset
		document.documentElement.innerHTML = html.toString()
		res = zaxFiles.loadStyles('../__mocks__/a.css', {
			media: 'all',
			attrs: {
				id: 'myStyle'
			}
		})
		expect(res).toBeInstanceOf(Promise)
		res.then(info => {
			expect(info).toBeTruthy()
			// console.log('innerHTML', document.querySelector('body')!.innerHTML)
		}).catch(err => {
			console.error('loadStyles', err)
		})

		// reset
		document.documentElement.innerHTML = html.toString()
		res = zaxFiles.loadStyles(`.test-inline{margin:10px;}`, {
			media: 'all',
			before: document.getElementById('box')
		})
		expect(res).toBeInstanceOf(Promise)
		res.then(info => {
			expect(info).toBeTruthy()
			// console.log('innerHTML', document.querySelector('body')!.innerHTML)
		}).catch(err => {
			console.error('loadStyles', err)
		})

		// reset
		document.documentElement.innerHTML = html.toString()
		res = zaxFiles.loadStyles(`.test-inline{margin:10px;}`, {
			before: document.getElementById('box')
		})
		expect(res).toBeInstanceOf(Promise)
		res.then(info => {
			expect(info).toBeTruthy()
			// console.log('innerHTML', document.querySelector('body')!.innerHTML)
		}).catch(err => {
			console.error('loadStyles', err)
		})

		// reset
		document.documentElement.innerHTML = html.toString()
		res = zaxFiles.loadStyles(`.test-inline{margin:10px;}`)
		expect(res).toBeInstanceOf(Promise)
		res.then(info => {
			expect(info).toBeTruthy()
			// console.log('innerHTML', document.querySelector('body')!.innerHTML)
		}).catch(err => {
			console.error('loadStyles', err)
		})

		// reset
		document.documentElement.innerHTML = html.toString()
		res = zaxFiles.loadStyles('../__mocks__/notexits.css', {
			attrs: {
				foo: '1',
				bar: '2'
			}
		})
		expect(res).toBeInstanceOf(Promise)
		res.then(info => {
			expect(info).toBeTruthy()
			// console.log('innerHTML', document.querySelector('body')!.innerHTML)
		}).catch(err => {
			console.error('loadStyles', err)
		})
	})

	it(`simulation server side `, () => {
		Object.defineProperty(window, 'document', { value: undefined, configurable: true, writable: true })

		let res = zaxFiles.loadScripts(['../__mocks__/a.js', '../__mocks__/b.js'])
		expect(res).toBeInstanceOf(Promise)
		res.catch(err => {
			expect(err).toThrowError('env error')
		})

		let res2 = zaxFiles.loadStyles(['../__mocks__/a.css', '../__mocks__/b.css'])
		expect(res2).toBeInstanceOf(Promise)
		res2.catch(err => {
			expect(err).toThrowError('env error')
		})
	})
})

describe('log', () => {
	it('should invoke success', () => {
		let res = log('test')
		expect(log).toBeInstanceOf(Function)
		expect(res).toBeTruthy()
	})

	it('should return a function', () => {
		let res = log('test')
		expect(log).toBeInstanceOf(Function)
		expect(res).toBeTruthy()
		expect(res).toBeInstanceOf(Function)

		let res2 = log('test', 'extra param')
		expect(log).toBeInstanceOf(Function)
		expect(res2).toBeTruthy()
		expect(res2).toBeInstanceOf(Function)

		let res3 = log()
		expect(res3).toBeTruthy()
		expect(res3).toBeInstanceOf(Function)
	})
})
