pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKER_IMAGE = "subhamagarwal05/scientific-calculator"
        PATH = "/home/subham05/.local/bin:${env.PATH}"
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
                script {
                    echo "--- Running Diagnostics ---"
                    sh 'echo "1. Jenkins is running as user:"'
                    sh 'whoami'
                    
                    sh 'echo "\n2. The PATH variable Jenkins is using:"'
                    sh 'echo $PATH'

                    sh 'echo "\n3. Which ansible-playbook Jenkins is finding:"'
                    sh 'which ansible-playbook'

                    sh 'echo "\n4. Permissions of the file found by Jenkins:"'
                    sh 'ls -l $(which ansible-playbook)'
                    
                    echo "--- Attempting to Run Ansible ---"
                    sh 'ansible-playbook ansible/deploy.yml'
                }
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