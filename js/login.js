function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Aquí puedes añadir la lógica de autenticación
    console.log('Usuario:', username);
    console.log('Contraseña:', password);

    // Por ejemplo, podrías enviar los datos a un servidor

fetch('/login', {
method: 'POST',
headers: {
           'Content-Type': 'application/json',
},

body: JSON.stringify({ username, password }),
})
.then(response => response.json())
.then(data => {
  if (data.success) {

} else {

}
})
.catch((error) => {
console.error('Error:', error);
});
}
