<?php

// Configura tus credenciales de MySQL
$servername = "tu_servidor_mysql";
$username = "tu_usuario_mysql";
$password = "tu_contraseña_mysql";
$dbname = "mi_base_de_datos";

// Conexión a MySQL
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtiene datos del cuerpo de la solicitud
$data = json_decode(file_get_contents('php://input'), true);

// Inserta datos en la base de datos
$sql = "INSERT INTO registros (nombre, edad, correo, telefono, direccion) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sisss", $data['nombre'], $data['edad'], $data['correo'], $data['telefono'], $data['direccion']);
$stmt->execute();

// Cierra la conexión
$stmt->close();
$conn->close();

// Envía una respuesta JSON
echo json_encode(['success' => true]);

?>
