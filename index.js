
let nombre = document.getElementById('nombre');
let contrasenia = document.getElementById('contraseña');
let userName = document.getElementById('userName');
let userPass = document.getElementById('userPass');
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
// Primero llamo a todos los elementos del html que vamos a usar, y los guardo en variables
// Después creo una variable "usuarios", la cual va fijarse si hay algo en localStorage (si hay, va a tomar los valores del localStorage parseándolos), si no hay nada guardado es un array vacío

class Usuario {
  constructor(nombre, contrasenia) {
    this.nombre = nombre
    this.contrasenia = contrasenia
  } // Clase constructora de los usuarios

}

function store() { // Función para crear los usuarios, guardarlos en el array usuarios y a su vez guardarlos en localStorage
  let nuevoUsuario = new Usuario(nombre.value, contrasenia.value);
  usuarios.push(nuevoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}


function check() { // Función que chequea el login, si el usuario existe o no

  const storedUser = usuarios.find(elemento => elemento.nombre === userName.value);
  // Esta variable busca en el array usuarios si existe un usuario con ese nombre

  if (storedUser && storedUser.contrasenia == userPass.value && storedUser.contrasenia !== "") {
    // Si storedUser es true Y la contraseña de storedUser coincide con la contraseña escrita en el login va a dar ingreso
    swal('Bienvenido/a a VeggieHouse!');

  } else if (storedUser) {
    // Si storedUser existe, es decir, si el nombre de usuario existe en el array de usuarios registrados, sólo le va a decir que la contraseña es incorrecta
    swal('Los datos ingresados no son correctos.');

  } else {
    // Si el usuario no existe, le va a decir que no posee cuenta
    swal('Lo siento, no posee cuenta en esta página');
  }
}


//////////////////////////

