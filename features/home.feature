Feature: Home page after login

  Scenario: User sees their name after logging in
    Given I am logged in with valid credentials
    When I navigate to the home page
    Then I should see my username "Good morning, Houssem. Let's get selling!"
