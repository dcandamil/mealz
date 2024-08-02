# Mealz App

Mealz es una app desarrollada con Angular + Ionic para buscar recetas de comidas usando la API de TheMealDB.
La app permite buscar recetas por nombre o categoría y muestra los detalles de cada receta.

## Requisitos
Para iniciar, tener instalados los siguintes requisitos:

- Node.js (>= 22.x)
- npm (>= 10.x)
- Ionic CLI (>= 7.x)
- Angular CLI (>= 18.x)

## Instalación

1. Clonar este repositorio:

    ```bash
    git clone https://github.com/dcandamil/melz.git
    ```

2. Navegar al directorio del proyecto:

    ```bash
    cd mealz
    ```

3. Instalar las dependencias del proyecto:

    ```bash
    npm install
    ```

## Servir en Local

Para servir la aplicación en ambiente local, ejecutar el comando:

```bash
ionic serve
```

Esto abre una nueva pestaña en el navegador predeterminado con la URL `http://localhost:8100`.

## Construir para Producción

Para construir la aplicación, ejecutar el comando:

```bash
ionic build
npx cap copy
npx cap sync
```

Esto generará una carpeta `www` con los archivos estáticos.

## Ejecución en Dispositivo Android

Para ejecutar la aplicación en un dispositivo Android, seguir los pasos:

1. Añadir la plataforma Android:

    ```bash
    npx cap add android
    ```

2. Abrir el proyecto en Android Studio:

    ```bash
    npx cap open android
    ```