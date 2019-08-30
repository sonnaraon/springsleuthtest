docker build -t 192.168.2.151:13000/kdash/common/telemetry/elk/logstashsample:1.0 .
docker run -it -p 8080:8080 -d 192.168.2.151:13000/kdash/common/telemetry/elk/logstashsample:1.0
docker exec -it cabc171e7e73 /bin/bash
