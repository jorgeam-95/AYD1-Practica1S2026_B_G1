MANUAL DE USUARIO
sistema de notas
## 1. Introducción

El presente manual describe el funcionamiento y uso de la aplicación web desarrollada para la gestión de información del sistema.

La aplicación fue diseñada bajo una arquitectura moderna cliente-servidor, permitiendo un acceso seguro, organizado y eficiente desde cualquier navegador web.

El sistema permite registrar, consultar, actualizar y eliminar información mediante una interfaz intuitiva y validaciones automáticas.

## 2. Objetivo del Sistema

El sistema tiene como finalidad:

Optimizar la gestión de información.

Permitir el trabajo estructurado mediante módulos.

Garantizar integridad y seguridad de los datos.

Facilitar el acceso desde cualquier dispositivo con navegador.

Mantener control y trazabilidad de las operaciones realizadas.

## 3. Requisitos del Sistema

Para utilizar la aplicación se requiere:

Navegador actualizado (Chrome, Edge o Firefox).

Conexión a internet.

Credenciales válidas de acceso.

Acceso a la URL oficial del sistema.

Ejemplo de acceso local:

http://localhost:3000


Ejemplo de acceso en servidor:

http://IP_DEL_SERVIDOR:4000

## 4. Acceso al Sistema
#### 4.1 Pantalla de Inicio de Sesión

Al ingresar al sistema se mostrará:

Campo de usuario

Campo de contraseña

Botón “Iniciar Sesión”

#### 4.2 Proceso de Autenticación

Ingresar usuario.

Ingresar contraseña.

Presionar “Iniciar Sesión”.

Si las credenciales son correctas, el sistema redirige al panel principal.
Si son incorrectas, mostrará un mensaje de error.

## 5. Panel Principal (Dashboard)

Una vez autenticado, el usuario tendrá acceso a:

Menú de navegación.

Módulos disponibles.

Información resumida del sistema.

Opciones para gestionar registros.

## 6. Funcionalidades del Sistema
#### 6.1 Registro de Información

El usuario puede ingresar nuevos datos mediante formularios que incluyen:

Campos obligatorios.

Validaciones automáticas.

Mensajes de confirmación.

Proceso:

Completar formulario.

Presionar botón “Guardar”.

Confirmación de registro exitoso.

#### 6.2 Consulta de Registros

El sistema permite:

Visualizar datos en tablas.

Aplicar filtros de búsqueda.

Ordenar resultados.

Consultar detalles específicos.

#### 6.3 Actualización de Datos

Seleccionar registro.

Presionar “Editar”.

Modificar información.

Guardar cambios.

El sistema mostrará mensaje de actualización exitosa.

#### 6.4 Eliminación de Registros

Seleccionar registro.

Presionar “Eliminar”.

Confirmar acción.

El sistema solicita confirmación para evitar errores accidentales.

## 7. Validaciones del Sistema

La aplicación incluye:

Validación de campos obligatorios.

Verificación de formatos (correo, números, fechas).

Manejo de errores del servidor.

Control de sesión activa.

## 8. Cierre de Sesión

Para cerrar sesión:

Seleccionar opción “Cerrar Sesión”.

El sistema redirige a la pantalla de login.

## 9. Arquitectura del Sistema

La aplicación está desarrollada bajo una arquitectura de tres capas:

Capa de Presentación (Frontend)

Capa de Lógica de Negocio (Backend)

Capa de Datos (Base de Datos)

#### 9.1 Frontend – Interfaz de Usuario

El frontend fue desarrollado con React.

Funciones principales:

Mostrar interfaz gráfica.

Validar datos del lado cliente.

Enviar solicitudes HTTP al backend.

Mostrar respuestas del servidor.

Controlar navegación mediante rutas protegidas.

El frontend se ejecuta en el navegador del usuario.

#### 9.2 Backend – Lógica de Negocio

El backend fue desarrollado en Go.

Responsabilidades:

Procesar solicitudes HTTP.

Aplicar reglas de negocio.

Validar datos recibidos.

Gestionar autenticación.

Enviar respuestas en formato JSON.

Conectarse a la base de datos.

Implementa una API REST utilizando métodos:

GET

POST

PUT

DELETE

#### 9.3 Base de Datos

La base de datos almacena la información del sistema de forma estructurada y persistente.

Permite operaciones:

INSERT

SELECT

UPDATE

DELETE

El backend es el único componente que interactúa directamente con la base de datos.

#### 9.4 Flujo General del Sistema

 Usuario interactúa con el navegador.

Frontend envía solicitud HTTP.

Backend procesa la solicitud.

Backend consulta/modifica base de datos.

Base de datos responde.

Backend devuelve respuesta al frontend.

Frontend muestra resultado al usuario.

#### 9.5 Diagrama Simplificado
Usuario
   ↓
Frontend (React)
   ↓ HTTP
Backend (Go)
   ↓ SQL
Base de Datos

## 10.Seguridad

El sistema implementa:

Autenticación mediante usuario y contraseña.

Protección de rutas privadas.

Validación de sesión activa.

Manejo de errores controlado.

Separación entre frontend y base de datos.

La base de datos no es accesible directamente por el usuario.

## 11 Buenas Prácticas para el Usuario

No compartir credenciales.

Cerrar sesión al finalizar.

No ingresar datos incorrectos.

Reportar errores al administrador.

Mantener la información actualizada.

## 12 Mantenimiento y Soporte

En caso de problemas:

Verificar conexión a internet.

Revisar que la URL sea correcta.

Intentar nuevamente.

Contactar al administrador del sistema.

## 13 Conclusión

La aplicación web desarrollada bajo arquitectura React + Go + Base de Datos permite una gestión eficiente, segura y organizada de la información.

La separación en capas garantiza:

Mayor seguridad.

Escalabilidad.

Mantenimiento simplificado.

Mejor experiencia de usuario.
##
