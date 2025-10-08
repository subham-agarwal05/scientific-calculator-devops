pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKER_IMAGE = "yourdockerhubusername/scientific-calculator"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/subham-agarwal05/scientific-calculator-devops.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Run Tests Inside Container') {
            steps {
                sh 'docker run --rm $DOCKER_IMAGE python -m pytest test_calculator.py'
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
                // This will now work because the executable is in a standard location
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