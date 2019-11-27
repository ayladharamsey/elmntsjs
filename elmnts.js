class ELMNTS
{
    constructor(){
        this.data = {};
        this.assets = {};
        this.vars = {};
        this.pointers = {};
        
        document.querySelectorAll('head [e]').forEach(elmnt=>{
            if (elmnt.id){
                if (elmnt.textContent){
                    try{
                        this.data[elmnt.id] = JSON.parse(elmnt.textContent);
                    } catch(e){
                        this.data[elmnt.id] = elmnt.textContent
                    }
                } else {
                    this.data[elmnt.id] = null;
                }
            }    
        })

        document.querySelectorAll('head [asset]').forEach(elmnt=>{
            if (elmnt.id){
                Object.defineProperty(this.assets, elmnt.id, {
                    get(){
                        return document.getElementById(elmnt.id).textContent
                    }
                })
            }    
        })
    }
    //--------

    save(setNames){
        const toSave = setNames || Object.keys(this.data);
        toSave.forEach(setName=>{ this.saveSet(setName) })
    }

    saveSet(setName){
        document.getElementById(setName).textContent = JSON.stringify(this.data[setName])
    }
    //--------

    setPointer(key,obj){
        if (typeof(obj) != 'object'){
            throw `Pointers must reference objects. Pass in the parent property\n${typeof(obj)}${obj}`;
        } else if (Object.keys(this.data).includes(key)){
            throw `Pointer key exists: ${key}`
        }
        this.pointers[key] = obj;
    }

    //--------
    getData(attrPath){
        var dataSet = Object.keys(this.data).includes(attrPath.split('.')[0]) ? this.data : this.pointers;
        return attrPath.split('.').reduce((acc, part) => acc && acc[part], dataSet)
    }
    //--

    setData(attrPath, value) {
        const path = attrPath.split('.');
        var dataSet = Object.keys(this.data).includes(path[0]) ? this.data : this.pointers;
        let level = 0;
    
        path.reduce((a, b)=>{
            level++;
            if (typeof a[b] === "undefined" && level !== path.length){
                a[b] = {};
                return a[b];
            }
    
            if (level === path.length){
                a[b] = value;
                return value;
            } else {
                return a[b];
            }
        }, dataSet);
    }
    //--


    _property(object, prop) {
        return {
            get value () {
                return object[prop]
            },
            set value (val) {
                object[prop] = val;
            }
        };
    }

}

const elmnts = new ELMNTS()


class tfe extends HTMLElement
{
    constructor(){
        super();
        this._data;
        this._content;
        this.shadow = this.attachShadow({mode: 'open'})
        this.shadow.innerHTML = `<style>${this._defaultCSS}${this.css}</style><section class='shadow-content'>${this.html}</section>`
    }

    connectedCallback(){
        // this._bound.forEach(be=>{

        //     const el = this.content.querySelector(be.qs);
        //     const fnGetName = be.fnGet || 'stdGetInput';
        //     const fnSetName = be.fnSet || 'stdSetInput';

        //     el ? this[fnSetName](el) : null;
        //     el ? el.addEventListener(be.trigger, (event)=>{
        //         this[fnGetName](event);
        //     }) : null;


        // })
        if (typeof this.onConnect == 'function'){
            this.onConnect();
        }
    }

    addEvent(selector, eventName, fnName){
        try{
            this.content.querySelector(selector).addEventListener(eventName, (event)=>{
                this[fnName](event)
            })
        } catch(e){
            console.warn(e)
        }
    }

    stdGetInput(ev){
        this.data = ev.target.value;
    }

    stdSetInput(el){
        el.value = this.data;
    }

    refresh(){
        this._data = elmnts.getData(this.dataset.src);
        this._bound.forEach(be=>{
            const el = this.content.querySelector(be.qs);
            const fnSetName = be.fnSet || 'stdSetInput';
            el ? this[fnSetName](el) : null;
        })
    }

    get data(){
        return this._data || elmnts.getData(this.dataset.src);
    }

    set data(v){
        this._data = v;
        elmnts.setData(this.dataset.src, this._data);
    }

    get content(){
        return this._content || this.shadow.querySelector('.shadow-content');
    }

    get _defaultCSS(){
        return (
            `:host{
                display: block;
            }`
        )
    }

    get css(){}
    get html(){}

}


customElements.define('e-input', class tfeStd extends tfe {
    
    constructor(){
        super();
        // this._bound = [
        //     {
        //         qs: 'input',
        //         trigger: 'input'
        //     }
        // ]
    }

    onConnect(){
        this.addEvent('input', 'input', 'getValue')
    }

    getValue(event){
        console.log(event.target.value)
        this.data = event.target.value
    }

    get css(){
        return (
            `:host{ 
                width: 500px;
            }`
        )
    }

    get html(){
        return (
            `<input placeholder='hippo'/><button>Hi</button>`
        )
    }
})

customElements.define('e-table', class tfeTable extends tfe {
    
    constructor(){
        super();
        this._bound = [
            {
                qs: 'button',
                trigger: 'click'
            }
        ]
    }

    onConnect(){
        const eTable = this.content.querySelector('table');
        this.data.forEach(ds=>{
            const row = eTable.insertRow(1);
            const c1 = row.insertCell(0);
            const c2 = row.insertCell(1);
            const c3 = row.insertCell(2);

            c1.innerText = ds.name;
            c2.innerText = ds.gender;
            c3.innerText = ds.about;
        })
    }

    get css(){
        return (
            `table{ 
                width: 700px;
                margin-top:50px;
                background: red
            }`
        )
    }

    get html(){
        return (
            `<table>
                <tr>
                    <th>Name</th><th>Gender</th><th>About</th>
                </tr>
            </table>`
        )
    }
})