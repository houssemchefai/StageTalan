Feature: Opportunities

  Scenario: Create a new opportunity with details and verify it
    Given I am logged in with valid credentials
    When I go to the Opportunities tab
    And I create a new opportunity with full details
    Then I should see the new opportunity details displayed
