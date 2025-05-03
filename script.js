# Concurso Interactivo: Ética y Tecnología

Esta es una aplicación web interactiva tipo concurso, inspirada en el programa "Saber y Ganar", centrada en las ideas de Tristan Harris, la ética en la tecnología y el papel de la filosofía en la era digital.

## Características

*   **9 Preguntas:** Cuestiones basadas en el trabajo y pensamiento de Tristan Harris y el Center for Humane Technology.
*   **Diseño Elegante:** Interfaz cuidada con una imagen de fondo temática.
*   **Interactividad:** Formato de opción múltiple con feedback instantáneo.
*   **Comentarios Estimulantes:** Mensajes positivos para cada respuesta correcta.
*   **Sonidos:** Efectos de sonido para aciertos y errores (requiere archivos `correct.mp3` e `incorrect.mp3` en la carpeta `sounds/`).
*   **Resultado Final:** Puntuación y comentario final positivo al completar el concurso.
*   **Reinicio:** Botón para volver a empezar el concurso.

## Cómo Usar

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio
    ```
2.  **Añadir Archivos de Sonido:** Consigue o crea los archivos `correct.mp3` e `incorrect.mp3` y colócalos dentro de una carpeta llamada `sounds/`.
3.  **Añadir Imagen de Fondo:** Coloca la imagen de fondo deseada en la carpeta `images/` y asegúrate de que el nombre (`background.jpg` por defecto) coincida con el especificado en `style.css`.
4.  **Abrir en el Navegador:** Simplemente abre el archivo `index.html` en tu navegador web preferido.

## Despliegue en GitHub Pages

Puedes desplegar esta aplicación fácilmente usando GitHub Pages:

1.  Asegúrate de que todos los archivos (`index.html`, `style.css`, `script.js`, `images/background.jpg`, `sounds/correct.mp3`, `sounds/incorrect.mp3`) están en la rama principal (p. ej., `main` o `master`) de tu repositorio.
2.  Ve a la configuración de tu repositorio en GitHub (`Settings`).
3.  Navega a la sección `Pages` (en el menú lateral izquierdo).
4.  En `Build and deployment`, selecciona `Deploy from a branch`.
5.  Elige la rama donde están tus archivos (normalmente `main`) y la carpeta raíz (`/root`).
6.  Haz clic en `Save`.
7.  GitHub construirá y desplegará tu página. La URL estará disponible en la misma sección de configuración de Pages después de unos minutos.

## Tecnologías Utilizadas

*   HTML5
*   CSS3 (con Variables CSS y Flexbox/Grid)
*   JavaScript (ES6+)

---
Hecho con el objetivo de fomentar la reflexión sobre la tecnología y la ética.
