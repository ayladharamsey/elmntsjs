customElements.define('e-data', class tfdata extends HTMLScriptElement
{
    constructor(){
        super();
       console.log('test')
    }

}
, {extends: 'script'});