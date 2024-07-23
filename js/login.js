document.addEventListener('DOMContentLoaded', function() {
  const loginFormLink = document.getElementById('loginFormLink');
  const loginForm = document.getElementById('loginForm');
  const closeLoginFormButton = document.getElementById('closeLoginForm');

  loginFormLink.addEventListener('click', function(event) {
      event.preventDefault();
      loginForm.style.display = 'block';
  });

  closeLoginFormButton.addEventListener('click', function() {
      loginForm.style.display = 'none';
  });

  // Opcional: puedes agregar un evento para cerrar el formulario al hacer clic fuera de él
  window.addEventListener('click', function(event) {
      if (event.target == loginForm) {
          loginForm.style.display = 'none';
      }
  });
});
