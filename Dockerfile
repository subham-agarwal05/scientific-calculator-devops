# Stage 1: Build React Frontend
FROM node:18-alpine as frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build Spring Boot Backend
FROM maven:3.8.5-openjdk-11 as backend-builder
WORKDIR /app/backend
COPY backend/pom.xml .
RUN mvn dependency:go-offline
COPY backend/ .
RUN mvn package -DskipTests

# Stage 3: Create Final Image
FROM openjdk:11-jre-slim
WORKDIR /app
# Copy backend JAR
COPY --from=backend-builder /app/backend/target/*.jar app.jar
# Copy frontend build files into the static resources directory of Spring Boot
COPY --from=frontend-builder /app/frontend/build /app/static

EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]