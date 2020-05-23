FROM httpd:2-alpine

COPY ./build /usr/local/apache2/htdocs/

RUN sed -i \
        -e 's/^#\(LoadModule .*mod_proxy.so\)/\1/' \
        -e 's/^#\(LoadModule .*mod_proxy_http.so\)/\1/' \
        -e 's/^#\(LoadModule .*mod_xml2enc*\)/\1/' \
        -e 's/^#\(LoadModule .*mod_rewrite*\)/\1/' \
        -e 's/^#\(LoadModule .*mod_header*\)/\1/' \
        -e 's/^#\(LoadModule .*log_forensic_module*\)/\1/' \
        -e 's/^#\(LoadModule .*mod_proxy_wstunnel*\)/\1/' \
      conf/httpd.conf

RUN echo $'\
<IfModule log_forensic_module> \n\
        ForensicLog /var/log/forensic_log \n\
</IfModule> \n\
<Location "/ws/"> \n\
        ProxyPass            "ws://backend-chat:8000/ws/chat/" \n\
        ProxyPassReverse     "ws://backend-chat:8000/ws/chat/" \n\
</Location> \n\
' >> /usr/local/apache2/conf/httpd.conf

EXPOSE 80

RUN /usr/local/apache2/bin/apachectl restart
