FROM nginx

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

RUN ls -la /etc/nginx

RUN echo "daemon off;" >> /etc/nginx/nginx.conf

RUN ls -la /etc/nginx
RUN cat /etc/nginx/nginx.config

EXPOSE 80

CMD service nginx start