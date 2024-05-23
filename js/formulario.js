class Formulario {
	
	/**Obtiene el formulario por su ID y llama al método addEventListeners para agregar los escuchadores de 
	 * eventos */
    constructor(formId) {
        // Obtiene el formulario por su ID y almacena la referencia en this.form
        this.form = document.getElementById(formId);
        // Añade los listeners a los eventos del formulario
        this.addEventListeners();
    }
    
    /**Añade un escuchador para el evento submit del formulario. Este evita el comportamiento predeterminado 
	 * (enviar el formulario) y llama al metodo handleSubmit. */
    addEventListeners() {
        // Añade un listener al evento submit del formulario
        this.form.addEventListener('submit', (event) => {
            // Previene la acción por defecto (enviar el formulario)
            event.preventDefault();
            // Llama al método handleSubmit para manejar el envío del formulario
            this.handleSubmit();
        });
    }

    handleSubmit() {
        // Crea un objeto FormData con los datos del formulario
        const formData = new FormData(this.form);
        // Array para almacenar los campos faltantes
        let missingFields = [];
        // Objeto para definir los valores por defecto de los selectores
        let defaultSelects = {
            provincia: 'Selecciona tu provincia',
            motivo: 'Selecciona el motivo de tu consulta'
        };

        // Recorre los campos del formulario
        for (let [name, value] of formData.entries()) {
            // Si el campo está vacío o tiene el valor por defecto, se añade a missingFields
            if (value.trim() === '' || (defaultSelects[name] && value === '')) {
                missingFields.push(name);
            }
        }

        // Verifica los selectores para asegurar que no tienen el valor por defecto
        for (let selectId in defaultSelects) {
            let selectElement = document.getElementById(selectId);
            if (selectElement && selectElement.value === '') {
                missingFields.push(selectId);
            }
        }

        // Si hay campos faltantes, muestra un mensaje de alerta
        if (missingFields.length > 0) {
            alert(`Debes completar los siguientes campos: ${missingFields.join(', ')}`);
        } else {
            // Si no hay campos faltantes, muestra los datos enviados en una alerta
            let alertMessage = 'Datos enviados:\n';
            for (let [name, value] of formData.entries()) {
                alertMessage += `${name}: ${value}\n`;
            }
            alert(alertMessage);
        }
    }
}

// Espera a que el contenido del DOM se haya cargado
document.addEventListener('DOMContentLoaded', () => {
    // Crea una nueva instancia de la clase Formulario con el ID del formulario
    new Formulario('contactForm');
});
/**La creación de una nueva instancia del formulario en el evento DOMContentLoaded se hace para asegurarse de 
 * que todo el contenido del DOM esté completamente cargado antes de ejecutar cualquier
 * código que interactúe con el DOM. */
