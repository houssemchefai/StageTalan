Feature: Salesforce Login

  @positive
  Scenario: User logs in with valid credentials
    Given I am on the login page
    When I enter valid username and password
    Then I should see the home page or dashboard

  @negative
  Scenario Outline: User fails to log in with invalid credentials
    Given I am on the login page
    When I enter username "<user>" and password "<pass>"
    And I click the login button
    Then I should see an error message "<error>"

    Examples:
      | user               | pass        | error                                                                                             |
      | wrong@example.com  | badPass123  | Please check your username and password. If you still can't log in, contact your Salesforce administrator. |

