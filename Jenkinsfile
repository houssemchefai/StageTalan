pipeline {
    agent any

    environment {
        CI = 'true'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Tests') {
            steps {
                // Run only the "User logs in with valid credentials" scenario
                bat 'npx cucumber-js --config cucumber.config.js --name "User logs in with valid credentials"'
            }
        }

    }

    post {
        always {
            echo 'Pipeline complete!'
        }
    }
}
