
# Ecommerce

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 17.2.3.

## Requisitos Previos

1. **Node.js y npm**: Asegúrate de tener [Node.js](https://nodejs.org/) y npm instalados.
2. **Angular CLI**: Instala Angular CLI globalmente usando:
   ```bash
   npm install -g @angular/cli
   ```
3. **Configuración del Backend**: La API debe estar corriendo en un servidor. En este caso, la API está desplegada en una instancia EC2 en AWS.

## Instalación

Ejecuta el siguiente comando en la raíz del proyecto para instalar las dependencias necesarias:

```bash
npm install
```

## Servidor de Desarrollo (Frontend)

Ejecuta `ng serve` para iniciar un servidor de desarrollo. Navega a `http://localhost:4200/` en tu navegador. La aplicación se recargará automáticamente al detectar cambios en los archivos fuente.

```bash
ng serve
```
## Base de Datos (RDS en AWS)

La base de datos se encuentra alojada en Amazon RDS. Asegúrate de configurar las variables de entorno para que el backend se conecte correctamente a esta base de datos.

## Despliegue en AWS

### Frontend

El frontend está desplegado en un Bucket S3 configurado para alojamiento estático.

### Backend

El backend está ejecutándose en una instancia EC2, utilizando `screen` para mantener el servicio en ejecución.

### Base de Datos

La base de datos utiliza Amazon RDS. Configura el acceso y las variables de entorno necesarias para que el backend pueda conectarse a la base de datos.

## Comandos Útiles

- **ng serve**: Inicia el servidor de desarrollo.
- **ng build**: Construye el proyecto.
- **ng test**: Ejecuta pruebas unitarias con Karma.
- **ng e2e**: Ejecuta pruebas de extremo a extremo.

## Rutas AWS Frontend
http://ecommercefront.s3-website.us-east-2.amazonaws.com

## Ruta AWS Documentación apis
http://ec2-18-191-210-163.us-east-2.compute.amazonaws.com:9000/swagger-ui/index.html#

