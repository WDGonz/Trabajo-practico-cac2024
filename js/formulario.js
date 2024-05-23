class Formulario {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.addEventListeners();
    }

    addEventListeners() {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.handleSubmit();
        });
    }

    handleSubmit() {
        const formData = new FormData(this.form);
        let missingFields = [];

        for (let [name, value] of formData.entries()) {
            if (value.trim() === '') {
                missingFields.push(name);
            }
        }

        if (missingFields.length > 0) {
            alert(`Debes completar los siguientes campos: ${missingFields.join(', ')}`);
        } else {
            let alertMessage = 'Datos enviados:\n';
            for (let [name, value] of formData.entries()) {
                alertMessage += `${name}: ${value}\n`;
            }
            alert(alertMessage);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Formulario('contactForm');
});
