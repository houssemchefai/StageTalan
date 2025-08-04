const { spawn } = require('child_process');
const path = require('path');

const cucumberPath = path.join('node_modules', '.bin', 'cucumber-js');

const run = spawn(cucumberPath, ['--config', 'cucumber.config.js'], {
  stdio: 'inherit', // inherit stdout/stderr from the parent process (shows test output)
  shell: true,      // needed for Windows compatibility
});

run.on('close', (code) => {
  console.log(`\n🚀 Test run completed with exit code: ${code}`);
  process.exit(code);
});
