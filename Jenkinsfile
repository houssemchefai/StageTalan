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
        // Run tests in headed Chromium mode (no debug)
        bat 'set HEADED=true && npx cucumber-js --config cucumber.config.js --name "User logs in with valid credentials"'
        bat 'set HEADED=true && npx cucumber-js --config cucumber.config.js --name "User fails to log in with invalid credentials"'
        bat 'set HEADED=true && npx cucumber-js --config cucumber.config.js --name "Create a new opportunity with details and verify it"'
        bat 'set HEADED=true && npx cucumber-js --config cucumber.config.js --name "User sees their name after logging in"'
        bat 'set HEADED=true && npx cucumber-js --config cucumber.config.js --name "Create a group and check its detail"'
    }
        }
    }

    post {
        always {
            echo 'Pipeline complete!'
        }
    }
}











