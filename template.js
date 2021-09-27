class Template extends HTMLElement {

    constructor(){
        super();
        this.render();
        this.contador = 0;
    }
    render(){
        let shadow = this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(document.getElementById('root').content.cloneNode(true));
        let paragraph = this.shadowRoot.querySelector("p");
        this.contador = paragraph.getAttribute("contador");
        console.log(this.contador);

        let button = document.createElement('button');
        button.textContent = "agregando algo";
        button.addEventListener("click", (ev)=>{
            ev.preventDefault();
            this.contador += 1;
            console.log(this.contador);
        })
        shadow.appendChild(button);
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'contador') this.button.textContent = newValue;
	}

}

customElements.define("init-javascript", Template);
export default Template;