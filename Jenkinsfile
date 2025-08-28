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
                bat 'npx cross-env  npx cucumber-js --config cucumber.config.js --name "User logs in with valid credentials"'
                bat 'npx cross-env  npx cucumber-js --config cucumber.config.js --name "User fails to log in with invalid credentials"'
                bat 'npx cross-env  npx cucumber-js --config cucumber.config.js --name "Create a new opportunity with details and verify it"'
                bat 'npx cross-env  npx cucumber-js --config cucumber.config.js --name "User sees their name after logging in"'
                bat 'npx cross-env  npx cucumber-js --config cucumber.config.js --name "Create a group and check its detail"'
            }
        }
    }

    post {
        always {
            echo 'Pipeline complete!'
        }
    }
}
