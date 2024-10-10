document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const bookList = document.getElementById("book-list");
  const logoutLink = document.getElementById("logout-link");
  const loginLink = document.getElementById("login-link");
  const registerLink = document.getElementById("register-link");

  let isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Verificar si el usuario ya está autenticado

  // Actualizar la interfaz de acuerdo a si el usuario está autenticado o no
  function updateInterface() {
      if (isLoggedIn) {
          logoutLink.style.display = "block";
          loginLink.style.display = "none";
          registerLink.style.display = "none";
      } else {
          logoutLink.style.display = "none";
          loginLink.style.display = "block";
          registerLink.style.display = "block";
      }
  }

  // Mostrar libros (con vista previa para no logueados)
  if (bookList) {
        const books = [
            {
                title: "ALIENIGENAS AMERICANOS",
                pdf: "../LIBROS/ALIENIGENAS.pdf",
                image: "../IMAGENES/ALIENIGENAS.png",
                synopsis: "<strong>SINOPSIS:</strong> Una investigación profunda sobre las conexiones entre culturas antiguas y visitantes extraterrestres en América."
            },
            {
                title: "EL DIARIO DE GREG-UN RENACUAJO",
                pdf: "../LIBROS/DIARIO_GREG.pdf",
                image: "../IMAGENES/DIARIO_GREG.jpg",
                synopsis: "<strong>SINOPSIS:</strong> Las divertidas aventuras de Greg, un niño que nos cuenta su vida en la escuela de forma muy peculiar."
            },
            {
                title: "YO SOY EL DIEGO",
                pdf: "../LIBROS/EL_DIEGO.pdf",
                image: "../IMAGENES/EL_DIEGO.png",
                synopsis: "<strong>SINOPSIS:</strong> La biografía del mítico futbolista Diego Armando Maradona, narrada en primera persona."
            },
            {
                title: "LAS VIDAS DENTRO DE TU CABEZA",
                pdf: "../LIBROS/LA_MENTE.pdf",
                image: "../IMAGENES/LA_MENTE.jpg",
                synopsis: "<strong>SINOPSIS:</strong> Un análisis sobre el funcionamiento de la mente humana y sus conexiones con la realidad."
            },
            {
                title: "EL EXTRAÑO CASO DEL DR.JEKYLL Y MR.HIDE",
                pdf: "../LIBROS/DR_HIDE.pdf",
                image: "../IMAGENES/DR_HIDE.jpg",
                synopsis:"<strong>SINOPSIS:</strong> Un thriller psicológico sobre la dualidad humana entre el bien y el mal."
            }
        ];

        books.forEach(book => {
            const bookDiv = document.createElement("div");
            bookDiv.classList.add("LIBROS");
    
            bookDiv.innerHTML = `
                <div style="display: flex; align-items: flex-start;">
                    <!-- Imagen del libro -->
                    <img src="${book.image}" alt="${book.title}" style="width:150px;height:210px;margin-right:20px;">
    
                    <!-- Contenedor de sinopsis y botón -->
                    <div style="flex: 1;">
                        <p>${book.synopsis}</p>
                        
                        <!-- Botón Leer con apariencia de botón -->
                        <a href="${isLoggedIn ? book.pdf : '../HTML/InisioSesion.html'}"  class="BOTON_LEER">LEER</a>
                    </div>
                </div>
                <!-- Título del libro centrado debajo de la imagen -->
                <h3 style="text-align:center; margin-top: 10px;">${book.title}</h3>
            `;
            
            bookList.appendChild(bookDiv);
        });
  }

// Control de inicio de sesión
if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault(); 
        
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Validación del correo 
        const emailPattern = /^[a-zA-Z0-9._%+-]+@uleam\.com$/;
        // Validación de la contraseña: al menos 7 caracteres, una mayúscula y un número
        const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{7,}$/;

        if (emailPattern.test(email) && passwordPattern.test(password)) {
            // Guarda el estado de autenticación en localStorage
            localStorage.setItem("isLoggedIn", "true");

            // Redirigir a la página principal
            window.location.href = "../HTML/InterfazP1.html";  
        } else {
            // Mostrar un mensaje de error si las credenciales no cumplen las condiciones
            document.getElementById("error-message").innerText = "Correo o contraseña inválidos. Asegúrate de usar un correo @uleam.com y que la contraseña tenga al menos 7 caracteres, una mayúscula y un número.";
        }
    });
}

// Control de registro
if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        
        const name = document.getElementById("name").value;
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;

        // Validación del correo 
        const emailPattern = /^[a-zA-Z0-9._%+-]+@uleam\.com$/;
        // Validación de la contraseña: al menos 7 caracteres, una mayúscula y un número
        const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{7,}$/;

        // Verificar que todos los campos estén completos y cumplan con los requisitos
        if (name && emailPattern.test(email) && passwordPattern.test(password)) {
            localStorage.setItem("isLoggedIn", "true");
            isLoggedIn = true;  
            window.location.href = "../HTML/InterfazP1.html";  // Redirigir a la página principal después de registrarse
        } else {
            let errorMessage = "Por favor completa todos los campos correctamente:";
            if (!name) errorMessage += "\n- El nombre no puede estar vacío.";
            if (!emailPattern.test(email)) errorMessage += "\n- El correo debe ser un @uleam.com válido.";
            if (!passwordPattern.test(password)) errorMessage += "\n- La contraseña debe tener al menos 7 caracteres, una mayúscula y un número.";
            
            document.getElementById("register-error-message").innerText = errorMessage;
        }
    });
}


  // Cerrar sesión
  if (logoutLink) {
      logoutLink.addEventListener("click", function () {
          localStorage.removeItem("isLoggedIn");
          isLoggedIn = false;  
          window.location.href = "../HTML/InterfazP.html";  // Redirigir a la página de inicio de sesión después de cerrar sesión
      });
  }

  document.getElementById("cancel-button").addEventListener("click", function() {
     window.location.href = "../HTML/InterfazP.html";
  });
  updateInterface();
});
