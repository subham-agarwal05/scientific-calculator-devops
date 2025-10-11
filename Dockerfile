#Build frontend
FROM node:18-alpine as frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install

# Copy all frontend files
COPY frontend/public ./public
COPY frontend/src ./src

# Increase memory limit for the React build process
ENV NODE_OPTIONS=--max-old-space-size=4096
RUN npm run build

# build backend
FROM maven:3.8-openjdk-11-slim as backend-builder
WORKDIR /app/backend
COPY backend/pom.xml .
RUN mvn dependency:go-offline
COPY backend/ .
RUN mvn package -DskipTests

# Final stage
FROM openjdk:11-jre-slim
WORKDIR /app

# Copy backend JAR
COPY --from=backend-builder /app/backend/target/*.jar app.jar

# Copy frontend build files into the static resources directory of Spring Boot
COPY --from=frontend-builder /app/frontend/build /app/static

EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]