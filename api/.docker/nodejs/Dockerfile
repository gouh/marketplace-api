FROM node:14.20.1 as base
EXPOSE 3000
WORKDIR /usr/src/app

FROM base as prod
ARG USR_DB_CONN
ARG USR_DB_NAME
WORKDIR /usr/src/app
# copiar 'package.json' y 'package-lock.json' (si están disponibles)
COPY package*.json ./
# instalar dependencias del proyecto
RUN npm install
# copiar los archivos y carpetas del proyecto al directorio de trabajo actual (es decir, la carpeta 'app')
COPY . .
# Exponer el puerto
EXPOSE 3000
RUN chmod +x ./.docker/entrypoint.sh
ENTRYPOINT [ "/bin/bash", "./.docker/entrypoint.sh" ]

