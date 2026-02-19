FROM nginx:1.23-alpine  

WORKDIR /usr/share/nginx/html/
USER root
RUN rm -rf /usr/share/nginx/html/*

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY ./dist /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]