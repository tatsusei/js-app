import axios from 'axios';
const API_URL ='https://api.github.com/users';

class Form {
    constructor(addCard, clearCards) {
        this.addCard = addCard;
        this.clearCards = clearCards;

        console.log(this.addCard);

        this.API_URL = "";
        this.searchTerm = "";
        this.searchInput = document.querySelector('input[name="search"]');
        this.searchInput.addEventListener("keyup", () => this.handleKeyup(event));

        this.submitButton = document.querySelector('button[type="submit"]');
        this.submitButton.disabled = !this.searchTerm;

        this.clearButton = document.querySelector('button[type="button"]');
        this.clearButton.addEventListener("click", () => this.clearCards());
        
        this.form = document.querySelector("form");
        this.form.addEventListener("submit", () => this.handleSubmit(event));
    }
    handleKeyup(event) {
        this.searchTerm = event.target.value.trim();
        this.API_URL = `${API_URL}/${this.searchTerm}`;
        this.submitButton.disabled = !this.searchTerm;
        console.log(this.API_URL)
    }
    handleSubmit(event) {
        event.preventDefault(); 
        console.log(event);
        axios
            .get(this.API_URL)
            .then(({ data }) => this.addCard(data))
            .catch(err => this.formatError('Promise reject!', err));
        
        this.form.reset();

    }

    formatError(err) {
        console.error(err);
        const errorText = document.createElement('p');
        errorText.innerText ='No user found';
        errorText.style.color = 'red';
        errorText.style.fontStyle = "bold";
        this.form.appendChild(errorText);
        setTimeout(() => this.form.removeChild(errorText),5000);
    }


}

export default Form;