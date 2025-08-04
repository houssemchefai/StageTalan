module.exports = {
  default: {
    require: [
      './support/world.js',
      './step-definitions/**/*.js'
    ],
    paths: ['./features/**/*.feature'],
    format: [
      'html:./reports/cucumber-report.html',
      'json:./reports/cucumber-report.json'
    ],
    worldParameters: {
      baseUrl: process.env.SF_BASE_URL
    }
  }
};