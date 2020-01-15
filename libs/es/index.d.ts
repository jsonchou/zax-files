export declare type ScriptOptions = {
    type?: string;
    charset?: string;
    async?: boolean;
    media?: string;
    attrs?: Record<string, string>;
};
export declare type StyleOptions = {
    media?: string;
    charset?: string;
    before?: HTMLElement | null;
    attrs?: Record<string, string>;
};
declare type HTMLElementMix = Pick<HTMLLinkElement & HTMLStyleElement, 'rel' | 'media' | 'innerHTML' | 'type' | 'href' | 'charset' | 'setAttribute'>;
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
export declare function loadScripts(src: string | Array<string>, options?: ScriptOptions): Promise<(HTMLScriptElement | Error)[]>;
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
export declare function loadStyles(src: string | Array<string>, options?: StyleOptions): Promise<(Partial<HTMLElementMix> | Error)[]>;
declare const _default: {
    loadScripts: typeof loadScripts;
    loadStyles: typeof loadStyles;
};
export default _default;
