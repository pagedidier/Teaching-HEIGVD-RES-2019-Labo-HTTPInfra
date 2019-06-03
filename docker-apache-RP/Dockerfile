FROM php:7.2-apache
COPY conf/ /etc/apache2
RUN a2enmod proxy proxy_http
RUN a2enste 000-* 001-*
