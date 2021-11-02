$("body").prepend(
  '<h3 id= "mark" class="start" style="display: none" >Bienvenido/a a VegieHouse! Esperamos que disfrutes de nuestra deliciosa comida!</h3>'
);

$("h3").fadeIn();

$(document).ready(function () {
  $("#mark").css("background", "#d2e9b8");
});

$(document).ready(function () {
  $("#mark").css("padding", "30px");
});

let carrito = [];
let total = 0;
const DOMitems = document.querySelector("#items");
const DOMcarrito = document.querySelector("#carrito");
let DOMtotal = document.querySelector("#total");
DOMtotal.textContent = `$0.00`;
const DOMbotonVaciar = document.querySelector("#boton-vaciar");
const miLocalStorage = window.localStorage;

function renderProductos(data) {
  for (let i = 0; i < data.length; i++) {
    const miNodo = document.createElement("div");
    miNodo.classList.add("card", "col-sm-4");

    const miNodoCardBody = document.createElement("div");
    miNodoCardBody.classList.add("card-body");

    const miNodoTitle = document.createElement("h5");
    miNodoTitle.classList.add("card-title");
    miNodoTitle.textContent = data[i].nombre;

    const miNodoImagen = document.createElement("img");
    miNodoImagen.classList.add("img-fluid");
    miNodoImagen.setAttribute("src", data[i].img);

    const miNodoPrecio = document.createElement("p");
    miNodoPrecio.classList.add("card-text");
    miNodoPrecio.textContent = data[i].precio + "$";

    const miNodoBoton = document.createElement("button");
    miNodoBoton.classList.add("btn", "btn-primary");
    miNodoBoton.textContent = "+";
    miNodoBoton.setAttribute("id", data[i].id);
    // *******************************************inicio una funcion sin argumento y llamo a la funcion anydarproducto y le envio data como argumento
    miNodoBoton.addEventListener("click", function () {
      anyadirProductoAlCarrito(data[i]);
    });

    miNodoCardBody.appendChild(miNodoImagen);
    miNodoCardBody.appendChild(miNodoTitle);
    miNodoCardBody.appendChild(miNodoPrecio);
    miNodoCardBody.appendChild(miNodoBoton);
    miNodo.appendChild(miNodoCardBody);
    DOMitems.appendChild(miNodo);
  }

  function anyadirProductoAlCarrito(data) {
    if (carrito.includes(data)) {
      data.cantidadElegida += 1;
    } else {
      data.cantidadElegida += 1;
      carrito.push(data);
    }
    calcularTotal();

    renderizarCarrito(carrito);
  }
  function renderizarCarrito(data) {
    // Vaciamos todo el html

    DOMcarrito.textContent = "";

    for (let i = 0; i < data.length; i++) {
      const miNodo = document.createElement("li");

      miNodo.classList.add("list-group-item", "text-left", "mx-2");
      miNodo.textContent = `${data[i].cantidadElegida} x ${data[i].nombre} - $${data[i].subtotal}`;
      // Boton de borrar
      const miBoton = document.createElement("button");
      miBoton.classList.add("btn", "btn-danger", "mx-3");
      miBoton.textContent = "X";
      miBoton.style.marginLeft = "1rem";
      //   ****************************************************** agregue .id a item
      miBoton.dataset.item = data[i].id;
      miBoton.addEventListener("click", function () {
        borrarItemCarrito(data[i].id);
      });

      // Mezclamos nodos
      miNodo.appendChild(miBoton);
      DOMcarrito.appendChild(miNodo);
    }
  }
  //   /**
  //    * Evento para borrar un elemento del carrito
  //    */
  function borrarItemCarrito(data) {
    let indiceABorrar = carrito.findIndex((a) => a.id == data);
    carrito[indiceABorrar].cantidadElegida = 0;
    carrito.splice(indiceABorrar, 1);
    renderizarCarrito(carrito);
    calcularTotal();
  }
  //   /**
  //    * Calcula el precio total teniendo en cuenta los productos repetidos
  //    */
  function calcularTotal() {
    // Limpiamos precio anterior
    for (let i = 0; i < carrito.length; i++) {
      carrito[i].subtotal = carrito[i].cantidadElegida * carrito[i].precio;
    }
    let totalCarrito = carrito.reduce((currentTotal, producto) => {
      return producto.subtotal + currentTotal;
    }, 0);

    // Renderizamos el precio en el HTML
    DOMtotal.textContent = `$${totalCarrito}`;
  }

  /**
   * Varia el carrito y vuelve a dibujarlo
  */
  function vaciarCarrito() {
    // Limpiamos los productos guardados
    carrito = [];
    textContent = "";
    // Renderizamos los cambios
    renderizarCarrito(carrito);
    calcularTotal();
    // Borra LocalStorage
    localStorage.clear();


  }

  // Eventos

  $(document).ready(function () {
    $("#boton-comprar").click(function () {
      swal("Muchas gracias por su compra.");
      carrito = [];
      textContent = "";
      localStorage.clear();
      vaciarCarrito();

    });

  });
}

fetch("productos.json")
  .then((response) => response.json())
  .then((data) => {
    renderProductos(data);
  });
