<a name="module_zaxFiles"></a>

## zaxFiles
<p>Files module.</p>

**See**: https://github.com/jsonchou/zax-util/tree/master/docs/files  

* [zaxFiles](#module_zaxFiles)
    * [~loadScripts(src, options)](#module_zaxFiles..loadScripts) ⇒ <code>Promise.&lt;Array.&lt;HTMLScriptElement&gt;&gt;</code>
    * [~loadStyles(src, options)](#module_zaxFiles..loadStyles) ⇒ <code>Array.&lt;Promise.&lt;(Partial.&lt;HTMLElementMix&gt;\|Error)&gt;&gt;</code>

<a name="module_zaxFiles..loadScripts"></a>

### zaxFiles~loadScripts(src, options) ⇒ <code>Promise.&lt;Array.&lt;HTMLScriptElement&gt;&gt;</code>
<p>load scripts</p>
<pre class="prettyprint source lang-js"><code>let foo = await loadScripts([&quot;//demo.com/a.js&quot;,'https://demo.com/b.js']);
//=> scripts[]
let bar = await loadScripts(`console.log(111)`);
//=> scripts[]
</code></pre>

**Kind**: inner method of [<code>zaxFiles</code>](#module_zaxFiles)  
**Returns**: <code>Promise.&lt;Array.&lt;HTMLScriptElement&gt;&gt;</code> - <p>Promise value</p>  

| Param | Type | Description |
| --- | --- | --- |
| src | <code>String</code> \| <code>Array.&lt;String&gt;</code> | <p>script array</p> |
| options | <code>ScriptOptions</code> | <p>script options</p> |

<a name="module_zaxFiles..loadStyles"></a>

### zaxFiles~loadStyles(src, options) ⇒ <code>Array.&lt;Promise.&lt;(Partial.&lt;HTMLElementMix&gt;\|Error)&gt;&gt;</code>
<p>load styles</p>
<pre class="prettyprint source lang-js"><code>let foo = await loadStyles([&quot;//demo.com/a.css&quot;,'https://demo.com/b.css']);
//=> styles[]
let bar = await loadStyles(`.a{margin-right:10px}`);
//=> styles[]
</code></pre>

**Kind**: inner method of [<code>zaxFiles</code>](#module_zaxFiles)  
**Returns**: <code>Array.&lt;Promise.&lt;(Partial.&lt;HTMLElementMix&gt;\|Error)&gt;&gt;</code> - <p>Promise value</p>  

| Param | Type | Description |
| --- | --- | --- |
| src | <code>String</code> \| <code>Array.&lt;String&gt;</code> | <p>remote css file or css segment array</p> |
| options | <code>StyleOptions</code> | <p>style options</p> |

