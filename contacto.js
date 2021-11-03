let nombreForm = document.getElementById('nombre');
let descripcion = document.getElementById('textArea');

$("main").prepend('<img id="imagenveggie" src= "sources/veggie time.jpg" alt="logo">');
//Declaración de métodos encadenados
$("#imagenveggie").css("height", "100px")
  .slideUp(1000)
  .slideDown(1000);

$(document).ready(function () {
  $("button").click(function () {
    if (nombreForm.value === "" || descripcion.value === "") {
      swal("Por favor, complete los datos antes de enviar el formulario.")
    } else {
      $("p").show("slow", function () {
        swal("Mensaje enviado existosamente!");
      });
      $(".form").slideUp();
    }
  });
});
