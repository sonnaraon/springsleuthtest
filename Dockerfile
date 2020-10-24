FROM tomcat:8-jdk8-openjdk
RUN apt-get update && apt-get install apt-file -y && apt-file update && apt-get install vim -y && apt-get install telnet -y 
RUN rm -f /usr/local/tomcat/webapps/ROOT
COPY copyFile/logstash-7.3.1.tar.gz .
RUN tar -xzvf logstash-7.3.1.tar.gz
COPY copyFile/logstash.conf logstash-7.3.1/bin/
COPY target/ROOT.war /opt/tomcat/webapps/
CMD ["/root/logstash-7.3.1/bin/logstash", "-f", "/root/logstash-7.3.1/bin/logstash.conf"]
ENTRYPOINT ["/opt/tomcat/bin/catalina.sh", "run"]
