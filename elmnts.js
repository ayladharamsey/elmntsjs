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
        this._notConnected = true;
        this._bound = [];

        this._data;
        this._content;
        this.shadow = this.attachShadow({mode: 'open'})
        this.shadow.innerHTML = `<style>${this._defaultCSS}${this.css}</style><section class='shadow-content'>${this.html}</section>`
    }

    connectedCallback(){
        this._notConnected = false;
        
        if (typeof this.setValue == 'function'){
            this.setValue();
        }
        
        this._bound.forEach(el=>{
            this.addEvent(el.selector, el.eventName, el.fnName)
        });
        
        if (typeof this.onConnect == 'function'){
            this.onConnect();
        }
    }

    addEvent(Selector, EventName, FnName){
        if (this._notConnected){
            this._bound.push({selector: Selector, eventName: EventName, fnName: FnName})
        } else {
            try{
                this.content.querySelector(Selector).addEventListener(EventName, (event)=>{
                    this[fnName](event)
                })
            } catch(e){
                console.warn(e)
            }
        }
    }

    refresh(){
        this._data = elmnts.getData(this.dataset.src);
        if (typeof this.setValue == 'function'){
            this.setValue();
        }
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