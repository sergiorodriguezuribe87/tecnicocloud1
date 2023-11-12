// Configuración de Firebase, reemplaza con tus propias credenciales
var firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Referencia a la colección 'registros'
var db = firebase.firestore().collection('registros');

// Referencias a los campos del formulario
var nombreInput = document.getElementById('nombre');
var edadInput = document.getElementById('edad');
var correoInput = document.getElementById('correo');
var telefonoInput = document.getElementById('telefono');
var direccionInput = document.getElementById('direccion');

// Agregar evento al botón para capturar los datos y agregarlos a la base de datos
document.getElementById('formulario').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar el comportamiento por defecto del formulario

    // Obtener los valores de los campos del formulario
    var nombre = nombreInput.value;
    var edad = edadInput.value;
    var correo = correoInput.value;
    var telefono = telefonoInput.value;
    var direccion = direccionInput.value;

    // Agregar el registro a la base de datos en tiempo real
    db.add({
        nombre: nombre,
        edad: edad,
        correo: correo,
        telefono: telefono,
        direccion: direccion
    });

    // Limpia el formulario
    nombreInput.value = '';
    edadInput.value = '';
    correoInput.value = '';
    telefonoInput.value = '';
    direccionInput.value = '';
});

// Escucha los cambios en la base de datos y actualiza la lista
db.onSnapshot(snapshot => {
    document.getElementById('listaRegistros').innerHTML = '';
    snapshot.forEach(doc => {
        var nuevoElemento = document.createElement('li');
        nuevoElemento.textContent = `Nombre: ${doc.data().nombre}, Edad: ${doc.data().edad}, Correo: ${doc.data().correo}, Teléfono: ${doc.data().telefono}, Dirección: ${doc.data().direccion}`;
        document.getElementById('listaRegistros').appendChild(nuevoElemento);
    });
});
