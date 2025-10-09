pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKER_IMAGE = "subhamagarwal05/scientific-calculator" // Use your DockerHub username
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/subham-agarwal05/scientific-calculator-devops.git' // Use your repo URL
            }
        }

        stage('Run Backend Tests') {
            steps {
                // Run Maven tests from the backend directory
                dir('backend') {
                    sh 'mvn test'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                // The multi-stage Dockerfile now handles the entire build
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Push to DockerHub') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                sh 'docker push $DOCKER_IMAGE'
            }
        }

        stage('Deploy with Ansible') {
            steps {
                sh 'ansible-playbook ansible/deploy.yml'
            }
        }
    }

    post {
        success {
            mail to: 'you@example.com',
                 subject: 'Pipeline Success!',
                 body: 'Scientific Calculator pipeline executed successfully.'
        }
        failure {
            mail to: 'you@example.com',
                 subject: 'Pipeline Failed!',
                 body: 'Please check Jenkins logs for details.'
        }
    }
}