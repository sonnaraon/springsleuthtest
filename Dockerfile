FROM 192.168.2.151:13000/kdash/common/telemetry/elk/tomcat-centos:jdk8tomcat8
COPY copyFile/logstash-7.3.1.tar.gz .
RUN tar -xzvf logstash-7.3.1.tar.gz
COPY copyFile/logstash.conf logstash-7.3.1/bin/
COPY target/ROOT.war /opt/tomcat/webapps/
CMD ["/root/logstash-7.3.1/bin/logstash", "-f", "/root/logstash-7.3.1/bin/logstash.conf"]
ENTRYPOINT ["/opt/tomcat/bin/catalina.sh", "run"]
