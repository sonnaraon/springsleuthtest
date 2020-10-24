FROM tomcat:8-jdk8-openjdk
RUN apt-get update && apt-get install apt-file -y && apt-file update && apt-get install vim -y && apt-get install telnet -y 
RUN rm -f /usr/local/tomcat/webapps/ROOT
COPY ROOT.war /usr/local/tomcat/webapps
COPY disco /usr/local/tomcat/
CMD ls -la /usr/local/tomcat/disco
ENV JAVA_OPTS="$JAVA_OPTS -Djava.security.egd=file:/dev/./urandom"
ENV JAVA_OPTS="$JAVA_OPTS -javaagent:/usr/local/tomcat/disco/disco-java-agent.jar=pluginPath=/usr/local/tomcat/disco/disco-plugins"
EXPOSE 8080
ENTRYPOINT ["/usr/local/tomcat/bin/catalina.sh", "run"]