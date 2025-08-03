FROM eclipse-temurin:24-jdk-alpine

WORKDIR /app

COPY target/ticket-manager.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]