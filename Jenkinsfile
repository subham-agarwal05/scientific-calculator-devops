pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKER_IMAGE = "subhamagarwal05/scientific-calculator"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/subham-agarwal05/scientific-calculator-devops.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                // Build the image. The tests will run inside this environment.
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Run Tests Inside Container') {
            steps {
                // Run tests inside a container from the image we just built.
                // The container is automatically removed after the command finishes.
                sh 'docker run --rm $DOCKER_IMAGE python -m pytest test_calculator.py'
            }
        }

        stage('Push to DockerHub') {
            steps {
                // This stage now runs only after the tests have passed.
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                sh 'docker push $DOCKER_IMAGE'
            }
        }

        stage('Deploy with Ansible') {
            steps {
                // This command runs Ansible directly on your computer
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