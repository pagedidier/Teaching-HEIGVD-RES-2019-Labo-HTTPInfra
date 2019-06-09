# download the last stable version of php that include apache2
FROM php:7.2-apache

# copy the static content
COPY ./src /var/www/html/

# debug purpose
RUN apt update && apt install -y vim