pipeline {
  agent any

  options {
    buildDiscarder(logRotator(numToKeepStr: '30'))
    timeout(time: 1, unit: 'HOURS')
    timestamps()
  }

  tools {
    nodejs 'node'
  }

  environment {
    CI = 'true'
    BASE_URL = 'https://practice.saucedemo.com'
    LOG_LEVEL = 'warn'
  }

  stages {
    stage('Checkout Code') {
      steps {
        checkout([
          $class: 'GitSCM',
          branches: [[name: '*/main']],
          userRemoteConfigs: [[url: 'https://github.com/Ganesh509/WebdriverIO_BDD.git']]
        ])
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Code Quality - Lint') {
      steps {
        sh 'npm run lint'
      }
    }

    stage('Run Tests - Smoke') {
      steps {
        sh '''
          mkdir -p allure-results
          # Use docker-compose to start Grid + nodes and run tests inside the `tests` service.
          # TAGS is passed to the tests container to run only smoke tests.
          TAGS="@smoke" docker-compose -f docker-compose.yml up --build --abort-on-container-exit --exit-code-from tests || true
          docker-compose -f docker-compose.yml down --volumes --remove-orphans || true
        '''
      }
    }

    stage('Run Tests - Regression') {
      when {
        branch 'main'
      }
      steps {
        sh '''
          mkdir -p allure-results
          # Full test run against the Grid (no TAGS => all tests)
          docker-compose -f docker-compose.yml up --build --abort-on-container-exit --exit-code-from tests || true
          docker-compose -f docker-compose.yml down --volumes --remove-orphans || true
        '''
      }
    }
  }

  post {
    always {
      echo 'Generating Allure Report...'
      script {
        sh '''
          if [ -d "allure-results" ]; then
            npx allure generate allure-results -o allure-report --clean || true
          fi
        '''
      }

      publishAllure(
        results: [[path: 'allure-results']],
        reportBuildPolicy: 'ALWAYS'
      )

      archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true
    }

    success {
      echo '✅ Build SUCCESS'
    }

    failure {
      echo '❌ Build FAILED'
      sh 'echo "Pipeline failed on branch ${GIT_BRANCH}"'
    }

    unstable {
      echo '⚠️  Build UNSTABLE'
    }

    cleanup {
      cleanWs()
    }
  }
}

