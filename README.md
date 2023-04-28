# Desafio Entregable: Implementación de Login

## Resumen

Agregar un sistema de login a nuestro ecommerce utilizando `express-session` y `connect-mongo` tal como lo vimos en el Hands On Lab de esta clase

## Requerimientos

1. Agrega las siguientes vistas:
   1. `login.handlebars`
   2. `register.handlebars`
   3. `profile.handlebars`
2. Crea los endpoints para gestionar las vistas mencionadas en el punto anterior
3. Una vez el usuario se logguee en el sistema redireccionalo a la vista de productos
4. Agregar a la vista de productos un mensaje de bienvenida con los datos del usuario
5. Crea un archivo `user.model.js` para almacenar el Schema de un usuario. Es importante que agregues una propiedad llamada `role` y que esta tenga un valor por defecto de `user`
6. Implementemos un sistema de permisos basado en roles
   1. Registra un usuario que tenga un `role` de `admin` utilizando las siguientes credenciales:
      ```
      {
         "email":"adminCoder@coder.com",
         "password": "adminCod3r123"
      }
      ```
   2. Guarda la propiedad `role` dentro de la sesión en el momento en un usuario haga login
7. Implementar botón de `logout` para destruir la sesión y redirigir a la vista de login
