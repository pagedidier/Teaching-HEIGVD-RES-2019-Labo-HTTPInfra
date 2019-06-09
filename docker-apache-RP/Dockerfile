# download the last version of apache
FROM php:7.2-apache

# copy the configuration files
COPY conf/ /etc/apache2

# enable proxy
RUN a2enmod proxy proxy_http

# enable sites
RUN a2ensite 000-* 001-*