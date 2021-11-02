
$(document).ready(function () {
  $(".btn-one").click(function () {
    $(".form").slideUp();

  });
});
$("main").prepend('<img id="imagenveggie" src= "sources/veggie time.jpg" alt="logo">');
//Declaración de métodos encadenados
$("#imagenveggie").css("height", "100px")
  .slideUp(1000)
  .slideDown(1000);

$(document).ready(function () {
  $("button").click(function () {
    $("p").show("slow", function () {
      swal("Mensaje enviado existosamente!");
    });
  });
});