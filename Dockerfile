# Stage 1: Build the application (using a Maven or Gradle image)
FROM eclipse-temurin:17-jdk-focal AS build
WORKDIR /app
# Copy the necessary build files (pom.xml, source code)
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

# Build the application - creates the JAR file
RUN ./mvnw clean package -DskipTests

# Stage 2: Create the final, smaller runtime image
FROM eclipse-temurin:17-jre-focal
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]