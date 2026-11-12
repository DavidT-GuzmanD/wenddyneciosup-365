# --- Etapa 1: compilar el sitio ---
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- Etapa 2: servirlo con Nginx ---
FROM nginx:stable-alpine

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
# Si la configuración de Nginx tiene un error, falla el build y Coolify
# conserva el contenedor anterior.
RUN nginx -t

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
