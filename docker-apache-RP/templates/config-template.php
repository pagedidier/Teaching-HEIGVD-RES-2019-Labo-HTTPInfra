<?php

$dynamic_app = getenv("dynamic_app");
$static_app = getenv("static_app");
?>

<VirtualHost *:80>
    ServerName reslab

    ProxyPass '/api/' 'http://<?= $dynamic_app ?>/'
    ProxyPassReverse '/api/' 'http://<?= $dynamic_app ?>/'

    ProxyPass '/' 'http://<?= $static_app ?>/'
    ProxyPassReverse '/' 'http://<?= $static_app ?>/'
</VirtualHost>

