// can't add a normalize or reset file so these are inherintly harder to control styling for
// inherits a lot of styling from user agent stylesheet that unless explicitly changed holds
// can't control box sizing border box here
// upon reload it inherits the user agent stylesheet, so the undesigned style briefly flashes


customElements.define('e-input', class tfeStd extends tfe {
    
    constructor(){
        super();
        this.addEvent('input', 'input', 'getValue'); // why aren't we using .addEventListener? What are these parameters
    }


    setValue(){
        this.content.querySelector('input').value = this.data; // why are we setting the value of an input field before searching?
    }

    getValue(event){
        this.data = parseInt(event.target.value)
    }

    get css(){
        return (
            `button{ 
                width: 100px;
                height: 31px;
                border: .7px solid #505050; 
                border-radius: 2px;
                padding: 5px;
                font-family: Roboto, sans serif;
                font-weight: 700;
                font-size: 12px;
                letter-spacing: .6px;
            }

            button:hover{
                background-color: #009B00;
                color: #FFFFFF;
                border: .7px solid #009B00;
            }

            input{
                width: 200px;
                height: 20px;
                border: .7px solid #505050; 
                border-radius: 2px;
                padding: 5px;
            }

            h3{
                font-family: Roboto, sans serif;
                font-weight: 700;
                font-size: 12px;
                letter-spacing: .6px;
            }

            `
        )
    }

    get html(){
        return (
            `<h3> FIRST NAME </h3>
            <input placeholder='Enter First Name Here'/>
            <button>SUBMIT</button>`
        )
    }
})

customElements.define('multi-input', class tfeStd extends tfe {
    
    constructor(){
        super();
        this.addEvent('textarea', 'textarea', 'getValue');
    }

    // getValue(event){
    //     this.data = parseInt(event.target.value)
    // } 
    //do I need this?

    get css(){
        return (
            `button{ 
                width: 100px;
                height: 31px;
                border: .7px solid #505050; 
                border-radius: 2px;
                padding: 5px;
                font-family: Roboto, sans serif;
                font-weight: 700;
                font-size: 12px;
                letter-spacing: .6px;
                margin-top: 17px;
            }

            button:hover{
                background-color: #009B00;
                color: #FFFFFF;
                border: .7px solid #009B00;
            }

            textarea{
                width: 300px;
                height: 200px;
                border: .7px solid #505050; 
                border-radius: 2px;
                padding: 5px;
                display: block;
            }

            h3{
                font-family: Roboto, sans serif;
                font-weight: 700;
                font-size: 12px;
                letter-spacing: .6px;
            }

            `
        )
    }

    get html(){
        return (
            `<h3> ADDITIONAL COMMENTS</h3>
            <textarea placeholder='Enter comments here'></textarea>
            <button>SUBMIT</button>`
        )
    }
})

customElements.define('dropdown', class tfeStd extends tfe {
    
    constructor(){
        super();
    }

    get css(){
        return (
            `button{ 
                width: 100px;
                height: 31px;
                border: .7px solid #505050; 
                border-radius: 2px;
                padding: 5px;
                font-family: Roboto, sans serif;
                font-weight: 700;
                font-size: 12px;
                letter-spacing: .6px;
                margin-top: 17px;
            }

            button:hover{
                background-color: #009B00;
                color: #FFFFFF;
                border: .7px solid #009B00;
            }

            select{
                width: 300px;
                height: 200px;
                border: .7px solid #505050; 
                border-radius: 2px;
                padding: 5px;
            }

            h3{
                font-family: Roboto, sans serif;
                font-weight: 700;
                font-size: 12px;
                letter-spacing: .6px;
            }`
        )
    }

    get html(){
        return (
            `<h3> CHOOSE SOMETHING </h3>
            <select name="animals">
                <option value="dog">Dog</option>
                <option value="billy-goat">Billy Goat</option>
                <option value="jaguar">Jaguar</option>
            </select>
            <button>SUBMIT</button>`
        )
    }
})

customElements.define('checkboxes', class tfeStd extends tfe {
    
    constructor(){
        super();
    }

    get css(){
        return (
            `button{ 
                width: 100px;
                height: 31px;
                border: .7px solid #505050; 
                border-radius: 2px;
                padding: 5px;
                font-family: Roboto, sans serif;
                font-weight: 700;
                font-size: 12px;
                letter-spacing: .6px;
                margin-top: 17px;
            }

            button:hover{
                background-color: #009B00;
                color: #FFFFFF;
                border: .7px solid #009B00;
            }

            input{
                width: 200px;
                height: 20px;
                border: .7px solid #505050; 
                border-radius: 2px;
                padding: 5px;
            }

            h3{
                font-family: Roboto, sans serif;
                font-weight: 700;
                font-size: 12px;
                letter-spacing: .6px;
            }`
        )
    }

    get html(){
        return (
            `<h3> CHOOSE FOOD </h3>
            <input type="checkbox" name="potato" value="Potato"> Potato </input>
            <input type="checkbox" name="pizza" value="Pizza"> Pizza </input>
            <input type="checkbox" name="turkey" value="Turkey"> Turkey </input>
            <button>SUBMIT</button>`
        )
    }
})

customElements.define('navigation', class tfeStd extends tfe {
    
    constructor(){
        super();
    }

    get css(){
        return (
            `li{
                background-color: #505050;
                font-family: Roboto, sans serif;
                font-weight: 700;
                font-size: 12px;
            }

            li:hover{
                background-color: #009B00;
                color: #FFFFFF;
            }

            h3{
                font-family: Roboto, sans serif;
                font-weight: 700;
                font-size: 12px;
                letter-spacing: .6px;
            }
            
            nav{
                display: flex;
                justify-content: space-between;
            }`
        )
    }

    get html(){
        //switch H1 below to an img link once i get access to BPX logo
        return (
            `<nav>
                <h1> BPX <h1> 
                <ul>
                    <li> Link1 </li>
                    <li> Link2 </li>
                    <li> Link3 </li>
                </ul>
            </nav>`
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