Feature: Create and verify a group

  Scenario: Create a group and check its detail
    Given I am logged in with valid credentials
    When I create a new group called "newgroup1"
    Then I should see the correct group title and description

