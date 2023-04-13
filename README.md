# Desafio Complementario

En este desafio modificaremos el modelo de persistencia que utilizamos actualmente con archivos e introduciremos MongoDB y mongoose. Paralelamente practicaremos un poco con websockets!

## Requerimientos

1. ¡Comencemos a implementar nuestro modelo de persistencia basado con MongoDB y mongoose! **NO BORRES LO IMPLEMENTACIÓN DE ARCHIVOS**

   1. Configuremos MongoDB Atlas

      1. Crea una base de datos en MondoDB Atlas llamada `ecommerce` que contenga tres colecciones: `carts`, `products` y `messages`
      2. Configura las credenciales de acceso. Asegurate de copiar la contraseña y guardarla en un lugar seguro
      3. Obten la URL de conexión para nuestra aplicación

   2. Configuremos la base de datos en nuestro editor de codigo

      1. En el archivo `app.js` pega la URL que obtuvimos en MongoDB Atlas dentro de `mongoose.conect("")`. Recuerda sustituir el parametro `<password>` dentro de esta URL por la contraseña que configuraste cuando creaste la base de datos
      2. Crea una una carpeta llamada `dao` que tenga la siguiente estructura:
         ###### Ilustración 2: Descripción de estructura de carpetas en el proyecto
         ```
            ├── src
            │   ├── dao
            |   |   ├── dbManagers
            |   |   |   ├── carts.js
            |   |   |   ├── messages.js
            |   |   |   ├── products.js
            |   |   ├── fileManagers
            |   |   |   ├── carts.js
            |   |   |   ├── messages.js
            |   |   |   ├── products.js
            │   │   ├── models
            |   |   |   ├── carts.js
            |   |   |   ├── messages.js
            |   |   |   ├── products.js
            │   ├── routes
            │   ├── views
            │   ├── app.js
            │   ├── socket.js
            │   ├── utils.js
         ```
      3. Mueve los managers creamos con modelo de persistencia de archivos dentro a la ruta: `\src\dao\dbManagers` tal como lo denota la estructura de carpetas en la **Ilustración 2**
      4. Crea los modelos para cada entidad involucrada en nuestro sistema en la ruta `\src\dao\models`

2. Crea una vista llamada `chat.handlebars` en la cual todos los usuarios conectados a nuestra aplicación podrán ver los mensajes enviados en tiempo real
   1. Es importante que cada mensaje que se envíe en el chat sea guardado en la MongoDB ATLAS
   2. El schema de un mensaje puede tener esta estructura:
      ```
      {
         user: emailUsuario
         message: cuerpoMensaje
      }
      ```
