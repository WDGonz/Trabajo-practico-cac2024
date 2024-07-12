// Mostrar el formulario cuando se hace clic en el botón de compra
const btnComprar = document.getElementById("btn-comprar");
const formularioCompra = document.getElementById("formulario-compra");

btnComprar.addEventListener("click", () => {
    formularioCompra.style.display = "block";
});
async function enviarFormulario(event) {
    event.preventDefault();

    const token = localStorage.getItem('token');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${token}`);

    const data = {
      producto: document.getElementById('producto').value,
      cantidad: document.getElementById('cantidad').value,
      otroProducto: document.getElementById('otro-producto').value,
      otraCantidad: document.getElementById('cantidad').value,
      direccion: document.getElementById('direccion').value,
    };

    const response = await fetch('/enviar', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert('Pedido enviado exitosamente.');
    } else {
      alert('Error al enviar el pedido.');
    }
  }
const btnComprar2 = document.getElementById("btn-comprar2");
const formularioCompra2 = document.getElementById("formulario-compra2");

btnComprar2.addEventListener("click", () => {
formularioCompra2.style.display = "block";
});

const btnComprar3 = document.getElementById("btn-comprar3");
const formularioCompra3 = document.getElementById("formulario-compra3");

btnComprar3.addEventListener("click", () => {
formularioCompra3.style.display = "block";
});

const btnComprar4 = document.getElementById("btn-comprar4");
const formularioCompra4 = document.getElementById("formulario-compra4");

btnComprar4.addEventListener("click", () => {
formularioCompra4.style.display = "block";
});

const btnComprar5 = document.getElementById("btn-comprar5");
const formularioCompra5 = document.getElementById("formulario-compra5");

btnComprar5.addEventListener("click", () => {
formularioCompra5.style.display = "block";
});

const btnComprar6 = document.getElementById("btn-comprar6");
const formularioCompra6 = document.getElementById("formulario-compra6");

btnComprar6.addEventListener("click", () => {
formularioCompra6.style.display = "block";
});

const btnComprar7 = document.getElementById("btn-comprar7");
const formularioCompra7 = document.getElementById("formulario-compra7");

btnComprar7.addEventListener("click", () => {
formularioCompra7.style.display = "block";
});

const btnComprar8 = document.getElementById("btn-comprar8");
const formularioCompra8 = document.getElementById("formulario-compra8");

btnComprar8.addEventListener("click", () => {
formularioCompra8.style.display = "block";
});

const btnComprar9 = document.getElementById("btn-comprar9");
const formularioCompra9 = document.getElementById("formulario-compra9");

btnComprar9.addEventListener("click", () => {
formularioCompra9.style.display = "block";
});