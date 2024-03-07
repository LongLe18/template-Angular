#java 17 is required
#install follow java in vscode

trong folder iworkspace_api/src/main/resource, copy file application application-dev.properties.template đặt tên là application-dev.properties
sau đó cấu hình lại đường dẫn đến database.

./mvnw clean
./mvnw install 
./mvnw spring-boot:run -pl iworkspace_api



