///////////////////////////////////////////////////////// Project: Playwright + Cucumber.js Tests ///////////////////////////////////////////////////

 Prerequisites
Node.js (v18+ recommended)
npm (comes with Node.js)
VS Code
Git

-------------------------------------------------------------------------------------------------------------------------------------------------

Steps to Run the Project
1. Clone the repository

Open VS Code terminal and run:

git clone <https://github.com/houssemchefai/StageTalan.git>
cd <repository-folder>

-------------------------------------------------------------------------------------------------------------------------------------------------


2. Install dependencies
npm install

------------------------------------------------------------------------------------------------------------------------------------------------


3. Run tests in headed mode (see browser)
set HEADED=true && npx cucumber-js --config cucumber.config.js --name "User logs in with valid credentials"


To run all tests, just remove the --name part:

set HEADED=true && npx cucumber-js --config cucumber.config.js

-----------------------------------------------------------------------------------------------------------------------------------------------------


4. Add new tests

Create a new scenario in features/

Add step definitions in step-definitions/

Run using the same command but change the --name to your new scenario

----------------------------------------------------------------------------------------------------------------------------------------------------


5. Tips

Keep HEADED=true if you want to see the browser

Use VS Code terminal (not PowerShell) for best results

Update Git after changes:

git add .
git commit -m "Add new test"
git push
