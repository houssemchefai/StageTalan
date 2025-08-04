pipeline {
    agent any

    environment {
        CI = 'true'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm run test:one' // or test:all depending on your setup
            }
        }

        stage('Archive Results') {
            steps {
                archiveArtifacts artifacts: 'test-results/**/*.*', fingerprint: true
            }
        }
    }

    post {
        always {
            echo 'Pipeline complete!'
        }
    }
}
