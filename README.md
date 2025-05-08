# 🍽️ SW4_Restaurante 

Pasos para ejecutar codigo:

1. Ejecuta los siguientes comandos:
   
      npm init
   
      npm install express mysql2 dotenv
   
      npm install --save-dev nodemon
## 📋 Descripción

Este servidor RESTful maneja las operaciones principales de una aplicación de restaurantes. Incluye una estructura modular con modelos para usuarios, restaurantes y reseñas, y usa MySQL como base de datos relacional.

---

## 🛠️ Tecnologías Utilizadas

- **Node.js**: v18.19.1 (o superior)
- **Express**: Framework para el servidor
- **MySQL**: Base de datos relacional
- **bcryptjs**: Para hashear contraseñas
- **jsonwebtoken (jwt)**: Para autenticación
- **dotenv**: Para manejar variables de entorno

---

## 📦 Requisitos

- Node.js (versión 18.x o superior)
- npm (incluido con Node.js)
- MySQL (puedes usar WampServer u otro servidor similar)
- Un entorno de desarrollo (como Visual Studio Code)

---
2. **Configura la Base de Datos**:

- Asegúrate de tener MySQL instalado y configurado.
- Crea una base de datos llamada restaurant_db.
- Crea un archivo .env en la raíz del proyecto y añade:
  

##### DB_HOST=localhost
##### DB_USER=root
##### DB_PASS=
##### DB_NAME=restaurant_db
##### PORT=3000
##### JWT_SECRET=tu_secreto_aqui

---
DB_HOST: Host de tu base de datos (por defecto localhost).

DB_USER: Usuario de tu gestor de base de datos (por ejemplo, root).

DB_PASSWORD: Contraseña de tu gestor de base de datos (puede estar vacía si no usas contraseña).

DB_NAME: Nombre de la base de datos que creaste (por ejemplo, restaurant_db).

Guarda los cambios y cierra el archivo.

---
3. **Inicia el Servidor**:
   ```bash
    npm start

- El servidor estará disponible en http://localhost:3000
- nodemon reiniciará automáticamente el servidor cada vez que hagas cambios en los archivos.
