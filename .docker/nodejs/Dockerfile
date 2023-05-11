FROM node:14.20.1 as base
EXPOSE 3000
WORKDIR /usr/src/app

FROM base as prod
WORKDIR /usr/src/app
# copiar 'package.json' y 'package-lock.json' (si están disponibles)
COPY package*.json ./
RUN touch ./read.txt
RUN ls -la
RUN npm install
COPY . .
# copiar los archivos y carpetas del proyecto al directorio de trabajo actual (es decir, la carpeta 'app')
EXPOSE 3000
CMD [ "npm", "run", "prod"]

