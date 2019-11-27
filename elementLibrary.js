customElements.define('e-input', class tfeStd extends tfe {
    
    constructor(){
        super();
        this.addEvent('input', 'input', 'getValue');
    }


    setValue(){
        this.content.querySelector('input').value = this.data;
    }

    getValue(event){
        this.data = parseInt(event.target.value)
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
        this.addEvent('button', 'click', 'getValue');
    }

    setValue(){
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
                width: 1400px;
                margin-top:50px;
                background: red
            }`
        )
    }

    get html(){
        return (
            `<button>Save</button>
            <table>
                <tr>
                    <th>Name</th><th>Gender</th><th>About</th>
                </tr>
            </table>`
        )
    }
})