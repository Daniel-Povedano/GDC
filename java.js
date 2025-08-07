// BitTemu - Generador de contraseñas y almacenamiento en localStorage

// Obtenemos el botón que genera las contraseñas y el contenedor donde se mostrarán las contraseñas guardadas
const botonGenerar = document.getElementById('boton-generar');
const lista = document.getElementById('contenedor-lista');

// Evento que se dispara al hacer clic en el botón "Generar"
botonGenerar.addEventListener('click', () => {
    // Obtenemos el nombre ingresado por el usuario, eliminando espacios al inicio y final
    const nombre = document.getElementById('nombre').value.trim();
    // Verificamos qué opciones de caracteres están seleccionadas
    const incluirMayus = document.getElementById('mayusculas').checked;
    const incluirMinus = document.getElementById('minusculas').checked;
    const incluirNums = document.getElementById('numeros').checked;
    const incluirSimb = document.getElementById('simbolos').checked;

    const longitud = 12; // Longitud fija de la contraseña generada
    let caracteres = ''; // Cadena donde se concatenarán los caracteres posibles

    // Concatenamos los caracteres permitidos según las opciones seleccionadas
    if (incluirMayus) caracteres += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (incluirMinus) caracteres += 'abcdefghijklmnopqrstuvwxyz';
    if (incluirNums) caracteres += '0123456789';
    if (incluirSimb) caracteres += '!@#$%^&*()_+{}[]<>?,.';

    // Si no se seleccionó ningún tipo de carácter, mostramos alerta y salimos
    if (caracteres === '') {
        alert('Selecciona al menos una opción.');
        return;
    }

    let contrasena = ''; // Variable para guardar la contraseña generada

    // Generamos la contraseña seleccionando caracteres aleatorios
    for (let i = 0; i < longitud; i++) {
        const index = Math.floor(Math.random() * caracteres.length); // índice aleatorio
        contrasena += caracteres[index]; // agregamos el carácter aleatorio
    }

    // Agregamos la nueva contraseña a la lista visual
    agregarContrasena(nombre, contrasena);

    // Limpiamos el campo del nombre para el próximo ingreso
    document.getElementById('nombre').value = '';
});

// Función para agregar una contraseña generada a la lista en la interfaz
function agregarContrasena(nombre, contrasena) {
    // Creamos un nuevo elemento <li> para la lista
    const item = document.createElement('li');
    item.classList.add('item'); // le agregamos la clase "item" para estilos

    // Creamos un contenedor para mostrar los datos (nombre y contraseña)
    const datos = document.createElement('div');
    datos.classList.add('datos');

    // Creamos el elemento para mostrar el nombre (o "Sin nombre" si está vacío)
    const spanNombre = document.createElement('div');
    spanNombre.classList.add('nombre');
    spanNombre.textContent = nombre || 'Sin nombre';

    // Creamos el elemento para mostrar la contraseña en texto visible
    const spanContrasena = document.createElement('div');
    spanContrasena.classList.add('contrasena');
    spanContrasena.textContent = contrasena;

    // Añadimos nombre y contraseña al contenedor de datos
    datos.appendChild(spanNombre);
    datos.appendChild(spanContrasena);

    // Creamos un contenedor para los botones (solo el botón eliminar en este caso)
    const botones = document.createElement('div');
    botones.classList.add('botones');

    // Creamos el botón para eliminar la contraseña de la lista
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = '❌';
    // Al hacer clic en eliminar, removemos este elemento de la lista
    btnEliminar.addEventListener('click', () => {
        lista.removeChild(item);
    });

    // Añadimos el botón eliminar al contenedor de botones
    botones.appendChild(btnEliminar);

    // Añadimos el contenedor de datos y botones al elemento <li>
    item.appendChild(datos);
    item.appendChild(botones);

    // Finalmente, agregamos el <li> a la lista visible en la página
    lista.appendChild(item);
}