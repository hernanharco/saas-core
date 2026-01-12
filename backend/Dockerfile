# Etapa 1: Compilación
FROM eclipse-temurin:17-jdk-focal AS build
WORKDIR /app

# Copiar archivos de configuración de Maven
COPY pom.xml .
COPY mvnw* ./
COPY .mvn .mvn

# Dar permisos y descargar dependencias (esto aprovecha la caché de Docker)
RUN chmod +x ./mvnw
RUN ./mvnw dependency:go-offline

# Copiar el código fuente y compilar
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Etapa 2: Ejecución (Imagen ligera)
FROM eclipse-temurin:17-jre-focal
WORKDIR /app

# Copiamos solo el JAR resultante de la etapa anterior y lo renombramos a app.jar
COPY --from=build /app/target/saas-core-0.0.1-SNAPSHOT.jar app.jar

# Exponer el puerto
EXPOSE 8080

# Ejecutar el JAR plano (evita problemas de rutas de target)
ENTRYPOINT ["java", "-jar", "app.jar"]