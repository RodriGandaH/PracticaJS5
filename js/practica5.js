/* Hacer un CRUD:
    C (create) = ingresar un color por el input.
    R (read) = renderizar el color dentro de la ul en una li.
    U (update) = dentro del li crear un boton para actualizar y hacer que funcione.
    D (delete) = dentro del li crear un boton para eliminar y hacer que funcione.
    
    -Utilizar el localstorage para emular una base de datos donde se guarden los colores y se renderizen.

    -Por ultimo subir la carpeta practicaJs5 a su github personal.


 */

const colores = JSON.parse(localStorage.getItem('colores')) || [];
let seleccionado = null;
let colorAntiguo = null;

function agregarColor() {
  const color = document.getElementById('color').value;

  if (colorExiste(color)) {

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El color ya existe",
      showConfirmButton: false,
      timer: 1500
    });
    return
  }

  if (color.trim() == '') {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El campo no puede estar vacio",
      showConfirmButton: false,
      timer: 1500

    });
    return
  }
  if (seleccionado == null) {
    colores.push(color);
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: `Color ${color}  registrado`
    });
  } else {

    colores[seleccionado] = color;
    seleccionado = null;
    document.getElementById('btn').textContent = 'Registrar';
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: `Color ${colorAntiguo}  actualizado a ${color}`
    });

  }
  localStorage.setItem('colores', JSON.stringify(colores));
  document.getElementById('color').value = "";
  listarColores()
}
function listarColores() {

  let items = '';



  for (let i = 0; i < colores.length; i++) {
    items += `  <li class="mb-2 d-flex            justify-content-between align-items-center">
            <span>${colores[i]}</span>
            <div>
              <button class="btn btn-warning" onclick="editarColor(${i})">
                <i class="fa fa-edit"></i>
              </button>
              <button class="btn btn-danger" onclick="eliminarColor(${i})"> <i class="fa fa-trash"></i></button>
            </div>
          </li>`
  }
  document.getElementById('lista_colores').innerHTML = items;
}
function eliminarColor(indice) {

  Swal.fire({
    title: `Estas seguro de eliminar el color ${colores[indice]}?`,
    text: " Una vez eliminado, no podras recuperar el color!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar!",
    cancelButtonText: "Cancelar"

  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Eliminado!",
        text: "El color se ah eliminado",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      });
      colores.splice(indice, 1);
      localStorage.setItem('colores', JSON.stringify(colores));
    }
  });

  listarColores();

}
function editarColor(indice) {
  document.getElementById('color').value = colores[indice];
  seleccionado = indice;
  colorAntiguo = colores[indice];
  console.log(colorAntiguo);
  document.getElementById('btn').textContent = 'Actualizar';

}

function colorExiste(color) {

  if (colores.indexOf(color) != -1) {
    return true;
  }
  return false;

}
