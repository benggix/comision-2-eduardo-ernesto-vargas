# Comunidad de Agencia de Viajes

¡Bienvenido al proyecto final de Eduardo Ernesto Vagas! Esta aplicación web está diseñada para facilitar la comunicación en tiempo real entre usuarios, permitiéndoles compartir sus experiencias de viaje, crear publicaciones editables, eliminarlas y comentar en las de otros usuarios.

## Objetivo

El objetivo principal de esta aplicación es proporcionar a los usuarios una plataforma interactiva para compartir y explorar experiencias de viaje. La comunicación en tiempo real facilitará la toma de decisiones relacionadas con los destinos de viaje.

## Guía

Antes de comenzar con las instalaciones, familiarízate con los siguientes comandos para navegar entre directorios en la terminal:

- `cd "directorio"`: Para cambiar al directorio especificado.

recuerden que estos comandos se utilizan desde la terminal de windows o bash. Si queremos retroceder hacia el directorio anterior

- `cd ..`: Para volver hacia atras

## Instalaciones

Para ejecutar la aplicación, es necesario instalar las dependencias tanto en el directorio del Backend como en el del Frontend. Sigue estos pasos:

1. **Backend:**
    ```bash
    cd Backend
    npm install
    ```

2. **Frontend:**
    ```bash
    cd Frontend
    npm install
    ```

## Configuraciones

Para configurar el funcionamiento de la aplicación, realiza las siguientes acciones:

1. **Backend:**
    - Crea un archivo llamado `.env` en el directorio "Backend" con la siguiente estructura:
        ```env
        PORT=3100
        MONGO_URI="mongodb://127.0.0.1:27017/proyecto"
        JWT_SECRET="A1B2C3D4E5"
        ```
        PORT: en mi caso por ejemplo utilice el puerto 3100, pero pueden elegir el que quieran desde el rango de 3000 hasta el 8000.

        ---

        MONGO_URI: es basicamente donde se conectara nuestro backend al servidor de bakcned: "mongodb://127.0.0.1:27017/nombre", lo unico que modificaremos es el nombre, en mi caso si quiero que se llame "proyecto" entonces --> "mongodb://127.0.0.1:27017/proyecto".

        ---
        JWT_SECRET: es nuestro token de seguridad, dentro le puedes definir cualquier codigo que sea dificil de decifrar, por ejemplo yo utilizare "A1B2C3D4E5".

        ---


    - En MongoDB Compass, crea una nueva conexión utilizando la URI especificada en el archivo `.env`.

        ---

2. **Frontend:**
    - En el directorio "Frontend/src/services", modifica el archivo `Api.Url.js` con el puerto configurado en el archivo `.env`.
        ```javascript
        export const API_URL = "http://localhost:3100"
        ```
    El 3100 lo modifican y lo cambian a corde al puerto que hayan puesto en el archivo ".env", o en mi caso por ejemplo le puse 3100 siguiendo el ejemplo anterior.

## Uso

Para utilizar la aplicación, inicia primero el Backend y luego el Frontend con los siguientes comandos en la terminal:

1. **Backend:**
    ```bash
    cd Backend
    npm run dev
    ```

Asegúrate de que la conexión a MongoDB sea exitosa:

    
    db es connected to: proyecto
    Server running on port 3100

Si no ves "db es connected to: proyecto
Server running on port 3100", verifica la conexión desde MongoDB Compass.
1. **Frontend:**
    ```bash
    cd Frontend
    npm run dev
    ```

    Visita la URL proporcionada en la terminal (generalmente http://localhost:5173/) para acceder a la aplicación.

¡Listo! Ahora puedes disfrutar de la aplicación y compartir tus experiencias de viaje.

## Estructura del Proyecto

```
└── 📁Proyecto
    └── 📁Backend
        └── .env
        └── main.js
        └── package-lock.json
        └── package.json
        └── 📁src
            └── 📁controllers
                └── comment.controller.js
                └── post.controller.js
                └── user.controller.js
            └── 📁middleware
                └── authentication.js
            └── 📁models
                └── comment.model.js
                └── post.model.js
                └── user.model.js
            └── 📁setting
                └── config.js
                └── database.js
    └── 📁Frontend
        └── 📁.contentlayer
            └── 📁generated
                └── index.d.ts
        └── .eslintrc.cjs
        └── 📁.vite
            └── 📁deps_temp_bb88502e
                └── package.json
        └── index.html
        └── package-lock.json
        └── package.json
        └── 📁src
            └── 📁components
                └── Comment.jsx
                └── CreatePost.jsx
                └── EditPost.jsx
                └── LoginForm.jsx
                └── MainContent.jsx
                └── NavBar.jsx
                └── Post.jsx
                └── RegisterUser.jsx
            └── main.jsx
            └── 📁providers
                └── AuthProvider.jsx
            └── 📁services
                └── Api.Url.js
            └── 📁styles
                └── estilos.css
                └── fontAll.css
                └── tailwind.css
            └── 📁views
                └── CreatePostPage.jsx
                └── EditPostPage.jsx
                └── HomePage.jsx
                └── LoginPage.jsx
                └── NotFoundPage.jsx
                └── PostPage.jsx
                └── RegisterPage.jsx
        └── tailwind.config.js
        └── vite.config.js
    └── readme.md
```