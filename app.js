const mysql = require('mysql');

// Configuración de la conexión a la base de datos
const dbConfig = {
    host: 'TU_HOST',
    user: 'TU_USUARIO',
    password: 'TU_CONTRASEÑA',
    database: 'TU_BASE_DE_DATOS'
};

// Crea la conexión a la base de datos
const connection = mysql.createConnection(dbConfig);

// Conéctate a la base de datos
connection.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos MySQL');
});

// Referencia a la tabla 'registros'
const tableName = 'registros';

// Referencias a los campos del formulario
const nombreInput = document.getElementById('nombre');
const edadInput = document.getElementById('edad');
const correoInput = document.getElementById('correo');
const telefonoInput = document.getElementById('telefono');
const direccionInput = document.getElementById('direccion');

// Agregar evento al botón para capturar los datos y agregarlos a la base de datos
document.getElementById('formulario').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar el comportamiento por defecto del formulario

    // Obtener los valores de los campos del formulario
    const nombre = nombreInput.value;
    const edad = edadInput.value;
    const correo = correoInput.value;
    const telefono = telefonoInput.value;
    const direccion = direccionInput.value;

    // Insertar el registro en la base de datos
    const insertQuery = `INSERT INTO ${tableName} (nombre, edad, correo, telefono, direccion) VALUES (?, ?, ?, ?, ?)`;
    connection.query(insertQuery, [nombre, edad, correo, telefono, direccion], (err, result) => {
        if (err) {
            console.error('Error al insertar en la base de datos:', err);
            return;
        }
        console.log('Registro insertado en la base de datos');
    });

    // Limpia el formulario
    nombreInput.value = '';
    edadInput.value = '';
    correoInput.value = '';
    telefonoInput.value = '';
    direccionInput.value = '';
});

// Escucha los cambios en la base de datos y actualiza la lista
const selectQuery = `SELECT * FROM ${tableName}`;
connection.query(selectQuery, (err, rows) => {
    if (err) {
        console.error('Error al seleccionar datos de la base de datos:', err);
        return;
    }
    document.getElementById('listaRegistros').innerHTML = '';
    rows.forEach(row => {
        const nuevoElemento = document.createElement('li');
        nuevoElemento.textContent = `Nombre: ${row.nombre}, Edad: ${row.edad}, Correo: ${row.correo}, Teléfono: ${row.telefono}, Dirección: ${row.direccion}`;
        document.getElementById('listaRegistros').appendChild(nuevoElemento);
    });
});

// Cierra la conexión cuando la aplicación se detiene
process.on('SIGINT', () => {
    connection.end();
    process.exit();
});

