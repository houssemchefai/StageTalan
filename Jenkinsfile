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
                // Run the login scenario in headed Chromium with debugging mode
                bat 'npx cross-env PWDEBUG=1 npx cucumber-js --config cucumber.config.js --name "User logs in with valid credentials"'
            }
        }
    }

    post {
        always {
            echo 'Pipeline complete!'
        }
    }
}
