# Mejorando la Arquitectura del Servidor

## Objetivo General

Profesionalizar nuestro servidor mediante el uso de la arquitecuta basada en capas y patrones de diseño.

## Objetivos Específicos

1. Aplicar patrón de diseño Repository
2. Aplicar patrón de diseño DAO
3. Aplicar patrón de diseño DTO
4. Aplicar patrón de diseño Factory
5. Implementar un middleware de permisos
6. Implementar funcionalidad de creación de ticket de compra haciendo uso de todas las capas propuestas en la arquitectura basada en capas

## Requerimientos

1. Crea un DTO `GetCurrentUser` el cual se encargará de normalizar los datos extraídos desde el jwt o la sesión con el objetivo de evitar que datos sensibles sean renderizados en la vista `/current`
2. Crea un middleware que pueda trabajar en conjunto con la estrategia de autenticación de tu elección (jwt o session) para hacer un sistema de autorización y delimitar el acceso a algunos endpoints según el rol del usuario tal como se especifica a continuación:

   | Rol   | Ruta               | Descripcion                                                    |
   | :---- | :----------------- | :------------------------------------------------------------- |
   | ADMIN | `/api/v1/products` | Debe tener acceso al CRUD de productos                         |
   | USER  | `/messages`        | Debe tener acceso a la vista de chat                           |
   | USER  | `/api/v1/carts`    | Debe poder interactuar con los produyctos de su propio carrito |

3. Crear un modelo `Ticket` el cual contará con todas las formalizaciones de la compra. Éste contará con los campos

   | Propiedad         | Tipo de Dato | Descripción                                                                                            |
   | :---------------- | :----------- | :----------------------------------------------------------------------------------------------------- |
   | id                | `ObjectId`   | Identificador unico del ticket. Debe ser autogenerado por Mongo                                        |
   | code              | `String`     | Debe ser unico y ser autogenerado                                                                      |
   | purchase_datetime | `Date`       | Deberá guardar la fecha y hora exacta en la cual se formalizó la compra (básicamente es un created_at) |
   | ammount           | `Number`     | Representa la suma de los precios de los productos incluídos en la compra                              |
   | purchaser         | `String`     | ontendrá el correo del usuario asociado al carrito                                                     |

4. Implementar la ruta `/api/carts/:cid/purchase` la cual permitirá finalizar la compra de un carrito en especifico
   1. La compra debe corroborar el stock del producto al momento de finalizarse
      1. Si el producto tiene suficiente stock para la cantidad indicada en el producto del carrito, entonces restarlo del stock del producto y continuar.
      2. Si el producto no tiene suficiente stock para la cantidad indicada en el producto del carrito, entonces no agregar el producto al proceso de compra.
   2. Al final, utilizar el servicio de Tickets para poder generar un ticket con los datos de la compra.
   3. En caso de existir una compra no completada, devolver el arreglo con los ids de los productos que no pudieron procesarse
   4. Una vez finalizada la compra, el carrito asociado al usuario que compró deberá contener sólo los productos que no pudieron comprarse. Es decir, se filtran los que sí se compraron y se quedan aquellos que no tenían disponibilidad.
