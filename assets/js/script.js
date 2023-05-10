window.onload = function () {
    presupuestoElement.value = '';
    presupuestoRestanteElement.textContent = '0';
    nombreGastoElement.value = '';
    valorGastoElement.value = '';
    listaGastosElement.innerHTML = '';
    presupuestoElement.disabled = false;
    btnIngresarElement.disabled = false;
    presupuestoInicial = 0;
    presupuestoRestante = 0;
    listaGastos.length = 0;
};


// Variables globales
let presupuestoInicial = 0;
let presupuestoRestante = 0;
const listaGastos = [];


// Elementos del DOM
const presupuestoElement = document.getElementById('presupuesto');
const presupuestoRestanteElement = document.getElementById('presupuesto-restante');
const nombreGastoElement = document.getElementById('nombre-gasto');
const valorGastoElement = document.getElementById('valor-gasto');
const listaGastosElement = document.getElementById('lista-gastos');
const btnIngresarElement = document.getElementById('btn-ingresar');
const btnAgregarElement = document.getElementById('btn-agregar');

// Función para dar formato al número
function formatearNumero(numero) {
    return numero.toLocaleString('es-CL', { maximumFractionDigits: 0 });
}


// Función para mostrar la lista de gastos en el DOM utilizando reduce
function mostrarListaGastos() {
    // Limpiamos la lista
    listaGastosElement.innerHTML = '';
    // Usamos reduce para construir la lista de gastos
    const listaHTML = listaGastos.reduce((acumulador, gasto, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item nuevo-gasto'; // Agregamos la clase nuevo-gasto
        li.innerHTML = `${gasto.nombre}: $${formatearNumero(gasto.valor)} <button class="btn btn-danger btn-sm float-end" onclick="eliminarGasto(${index})"><i class="fas fa-times"></i></button>`; // Agregamos el botón para eliminar el gasto
        // Agregamos la animación al nuevo elemento
        agregarAnimacion(li);
        acumulador += li.outerHTML; //revisar
        //acumulador += gasto.valor;
        return acumulador;
    }, '');
    // Agregamos la lista de gastos al DOM
    listaGastosElement.innerHTML = listaHTML;
}

// Este código define una función llamada `mostrarListaGastos()` que se utiliza para mostrar la lista de gastos en el DOM utilizando la función `reduce()` de JavaScript. 
// Primero, se limpia la lista de gastos en el DOM usando `listaGastosElement.innerHTML = '';`. Luego, se crea una variable llamada `listaHTML` que es igual a la salida de la función `reduce()`, que construye la lista de gastos. 
// La función `reduce()` toma dos argumentos: un acumulador y el elemento actual. En este caso, el acumulador se inicializa en una cadena vacía `''` y el elemento actual es cada objeto de la lista de gastos `gasto`. 
// Dentro de la función `reduce()`, se crea un nuevo elemento `li` para cada gasto y se le asigna la clase `nuevo-gasto`. Luego, se le agrega una cadena HTML que incluye el nombre del gasto y su valor formateado usando la función `formatearNumero()`. También se agrega un botón para eliminar el gasto, que se vincula con la función `eliminarGasto()`. Finalmente, se agrega la animación al nuevo elemento y se agrega la salida HTML del elemento `li` al acumulador.
// Después de que se completa la función `reduce()`, la variable `listaHTML` contiene la lista completa de gastos como una cadena HTML, que se inserta en el DOM utilizando `listaGastosElement.innerHTML = listaHTML;`.



// Función para eliminar un gasto de la lista
function eliminarGasto(index) {
    const gasto = listaGastos[index];
    presupuestoRestante += gasto.valor;
    listaGastos.splice(index, 1);
    actualizarPresupuestoRestante();
    mostrarListaGastos();
    actualizarTotalGastos();
}

// Este es un bloque de código que define una función llamada `eliminarGasto`, la cual toma como parámetro un índice que representa la posición del elemento en la lista `listaGastos` que se desea eliminar.
// La función comienza obteniendo el objeto de gasto que se encuentra en la posición del índice especificado dentro de la lista `listaGastos` y lo almacena en la variable `gasto`.
// Luego, actualiza el presupuesto restante sumando el valor del gasto que se va a eliminar a la variable `presupuestoRestante`.
// A continuación, utiliza el método `splice` de JavaScript para eliminar el objeto de gasto en la posición especificada en el índice de la lista `listaGastos`.
// La función luego llama a la función `actualizarPresupuestoRestante`, que se encarga de actualizar el presupuesto restante en el DOM.
// A continuación, llama a la función `mostrarListaGastos`, que se encarga de actualizar la lista de gastos en el DOM.
// Por último, llama a la función `actualizarTotalGastos`, que se encarga de actualizar el total de gastos en el DOM.
// En resumen, esta función se encarga de eliminar un objeto de gasto específico de la lista `listaGastos` y actualizar la interfaz de usuario en consecuencia.



// Función para agregar un gasto a la lista
function agregarGasto() {
    const nombreGasto = nombreGastoElement.value;
    const valorGasto = Number(valorGastoElement.value);
    // Verificamos que se haya ingresado un nombre y un valor válido
    if (!nombreGasto || !valorGasto || valorGasto <= 0) {
        alert('Por favor ingrese un nombre y un valor de gasto válido.');
        return;
    }
    // Verificamos que el nombre del gasto contenga solo letras y espacios
    const nombreGastoValido = /^[a-zA-Z\s]+$/.test(nombreGasto);
    if (!nombreGastoValido) {
        alert('Por favor ingrese un nombre de gasto válido (solo letras y espacios).');
        return;
    }
    // Verificamos que el valor del gasto contenga solo números
    const valorGastoValido = /^\d+$/.test(valorGasto);
    if (!valorGastoValido) {
        alert('Por favor ingrese un valor de gasto válido (solo números).');
        return;
    }
    // Verificamos que el gasto no supere el presupuesto restante
    if (valorGasto > presupuestoRestante) {
        alert('El gasto ingresado supera el presupuesto restante.');
        return;
    }
    // Creamos el objeto gasto y lo agregamos a la lista
    const gasto = {
        nombre: nombreGasto,
        valor: valorGasto
    };
    listaGastos.push(gasto);
    // Actualizamos el presupuesto restante y mostramos la lista de gastos
    presupuestoRestante -= valorGasto;
    // Limpiamos los campos de nombre y valor de gasto
    nombreGastoElement.value = '';
    valorGastoElement.value = '';
    actualizarPresupuestoRestante();
    mostrarListaGastos();
    actualizarTotalGastos();
}

// Este código es una función de JavaScript llamada `agregarGasto` que se utiliza para agregar un nuevo gasto a una lista de gastos. La función comienza obteniendo los valores del nombre y el valor del gasto desde elementos del HTML llamados `nombreGastoElement` y `valorGastoElement`.
// Luego, la función verifica si se han ingresado un nombre y un valor de gasto válidos. Para hacer esto, se comprueba que el valor del nombre contenga solo letras y espacios, y que el valor del gasto contenga solo números y sea mayor que cero. Si los valores ingresados no son válidos, se muestra un mensaje de alerta y la función se detiene.
// La función también verifica si el gasto ingresado supera el presupuesto restante. Si el gasto supera el presupuesto, se muestra un mensaje de alerta y la función se detiene.
// Si los valores ingresados son válidos y el gasto no supera el presupuesto restante, se crea un objeto de gasto con el nombre y el valor ingresados y se agrega a una lista de gastos llamada `listaGastos`. Además, se actualiza el presupuesto restante restando el valor del nuevo gasto, se muestra la lista de gastos actualizada y se limpian los campos de entrada de nombre y valor del gasto.
// En resumen, esta función verifica que los valores ingresados sean válidos y luego agrega el gasto a la lista y actualiza el presupuesto restante.


function actualizarTotalGastos() {
    const totalGastos = listaGastos.reduce((acumulador, gasto) => {
        return acumulador + gasto.valor;
    }, 0);
    ;
    const totalGastosElement = document.getElementById('total-gastos');
    totalGastosElement.textContent = '$' + formatearNumero(totalGastos);
}

//Esta función se llama cada vez que se agrega un nuevo gasto a la lista. Lo que hace es calcular la suma de todos los valores de los gastos en la lista de gastos y mostrar el total en la pantalla. La función reduce() se utiliza para realizar esta operación. Luego, el total se muestra en un elemento HTML con el id total-gastos.


// Función para actualizar el presupuesto restante en el DOM
function actualizarPresupuestoRestante() {
    presupuestoRestanteElement.textContent = formatearNumero(presupuestoRestante);
    if (presupuestoRestante < 0) {
        presupuestoRestanteElement.classList.add('text-danger');
    } else {
        presupuestoRestanteElement.classList.remove('text-danger');
    }
}

// Lo que hace este código es definir una función llamada "actualizarPresupuestoRestante", la cual se encarga de actualizar el presupuesto restante que se muestra en la página. La función utiliza dos elementos HTML para hacer esto: el primer elemento es un "span" con un id llamado "presupuestoRestante", que es donde se mostrará el presupuesto restante actualizado. El segundo elemento es una clase llamada "text-danger", que se utilizará para cambiar el color del texto en el caso de que el presupuesto restante sea menor que cero.
// Dentro de la función, se utiliza la propiedad "textContent" del elemento "presupuestoRestanteElement" para actualizar el texto que se muestra en el DOM. La función "formatearNumero" se utiliza para dar formato al número y mostrarlo con un formato más legible para el usuario.
// Luego, se utiliza una estructura de control "if" para verificar si el presupuesto restante es menor que cero. En caso afirmativo, se agrega la clase "text-danger" al elemento "presupuestoRestanteElement", lo que cambia el color del texto a rojo para indicar que el presupuesto está en números rojos. En caso contrario, se elimina la clase "text-danger" del elemento, lo que restaura el color del texto a su valor original.


// Evento para ingresar el presupuesto inicial
btnIngresarElement.addEventListener('click', () => {
    presupuestoInicial = Number(presupuestoElement.value);
    presupuestoRestante = presupuestoInicial;
    actualizarPresupuestoRestante();
    presupuestoElement.disabled = true;
    btnIngresarElement.disabled = true;
});

// Este evento se activa cuando el usuario hace clic en el botón "Ingresar presupuesto". Lo que hace es tomar el valor ingresado por el usuario en el campo de presupuesto y lo almacena en la variable presupuestoInicial. Luego, se establece presupuestoRestante como igual al valor ingresado en presupuestoInicial. A continuación, se llama a la función actualizarPresupuestoRestante() para que se muestre el presupuesto restante en la pantalla. Finalmente, se desactivan el campo de presupuesto y el botón "Ingresar presupuesto" para que el usuario no pueda modificar el presupuesto una vez ingresado.


// Función para agregar una animación a un elemento
function agregarAnimacion(elemento) {
    elemento.classList.add('animate__animated', 'animate__fadeInDown'); // Usamos animate.css para la animación
}


// Evento para agregar un gasto
btnAgregarElement.addEventListener('click', agregarGasto);

//Este evento se activa cuando el usuario hace clic en el botón "Agregar gasto". Lo que hace es llamar a la función agregarGasto(), que se encarga de agregar el gasto a la lista de gastos.


// Creamos el objeto gasto y lo agregamos a la lista de gastos
const gasto = {
    nombre: nombreGasto,
    valor: valorGasto
};
listaGastos.push(gasto);

//Después de que se verifica que el nombre y el valor del gasto son válidos, se crea un objeto gasto que contiene dos propiedades: nombre y valor. El valor de nombre es el nombre del gasto ingresado por el usuario, y el valor de valor es el valor del gasto ingresado por el usuario.


// Creamos el elemento HTML para mostrar el gasto en la lista
const li = document.createElement('li');
li.className = 'list-group-item nuevo-gasto'; // Agregamos la clase 'nuevo-gasto'
li.innerHTML = gasto.nombre + ': $' + formatearNumero(gasto.valor);
listaGastosElement.appendChild(li);

//Después de que se crea el objeto gasto, se crea un elemento li de HTML que muestra el nombre y el valor del gasto en la lista de gastos. Este elemento se agrega a la lista de gastos en la pantalla.


// Eliminamos la clase 'nuevo-gasto' después de un corto tiempo para que la animación se ejecute
setTimeout(() => {
    li.classList.remove('nuevo-gasto');
}, 10);

//Para dar un efecto de animación al elemento li que se acaba de agregar a la lista de gastos, se agrega la clase 'nuevo-gasto'. Sin embargo, esta clase debe eliminarse después de un corto tiempo para que la animación se ejecute correctamente. Para hacer esto, se usa la función setTimeout() para que se elimine la clase después de 10 milisegundos.


// Función para agregar la animación a un elemento
function agregarAnimacion(elemento) {
    elemento.classList.add('animate__animated', 'animate__fadeIn'); // Agregamos las clases de la animación
    // Removemos las clases después de que termine la animación
    elemento.addEventListener('animationend', () => {
        elemento.classList.remove('animate__animated', 'animate__fadeIn');
    });
}

//Esta función se encarga de agregar una animación de entrada a un elemento HTML. Agrega dos clases CSS (animate__animated y animate__fadeIn) al elemento para que se ejecute la animación. Luego, usa el evento animationend para que se eliminen las clases CSS después de que termine la animación.


