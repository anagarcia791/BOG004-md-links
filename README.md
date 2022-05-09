# Markdown Links &#127808;

Esta librería sirve para devolver los enlaces o direcciones URL contenidos en una carpeta en la cual haya archivos de extensión .md o directamente un archivo de extensión .md; con esta información es posible conocer las estadísticas sobre: 

- total de links.
- links únicos. 
- links rotos.


## 1. Instalación &#127808;

Ejecutar en la terminal el comando

- npm install md-links-anagarcia791

## 2. Guia de uso &#127808;

### 2.1 Ejecución en terminal

Esta aplicación se puede ejecutar a través de la terminal con la siguiente estructura:

Solo con el path: `md-links <ruta>` 

![just-path](https://github.com/anagarcia791/BOG004-md-links/blob/main/assets/images/just-path.PNG)

Path con opción de estadísticas: `md-links <ruta> --stats`

![path-stats](https://github.com/anagarcia791/BOG004-md-links/blob/main/assets/images/path-stats.PNG)

Path con opción de validación: `md-links <ruta> --validate`

![validated-path](https://github.com/anagarcia791/BOG004-md-links/blob/main/assets/images/validated-path.PNG)

Path con opción de validación y estadísticas: `md-links <ruta> --validate --stats` o `md-links <ruta> --stats --validate`

![path-validated-stats](https://github.com/anagarcia791/BOG004-md-links/blob/main/assets/images/path-validated-stats.PNG)

### 2.2 Ejecución de función

En el archivo que se requiera extraer la información se puede estructurar de la siguiente manera:

![f-mdl](https://github.com/anagarcia791/BOG004-md-links/blob/main/assets/images/function-mdl.PNG)

Resultado: 

![mdl-result](https://github.com/anagarcia791/BOG004-md-links/blob/main/assets/images/mdl-result.PNG)

## 3. Diagrama de fluja - Autora &#127808;

- Ver [diagrama](https://www.figma.com/file/MDQuiIQVCryMmyMfVnr9tq/flow-md-links?node-id=0%3A1)
- Hecho por Ana Margarita Garcia &#128125;