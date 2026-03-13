Feature: Login Functionality

  Scenario: User successfully logs in with valid credentials
    Given the login page is opened
    When I enter the username "testuser"
    And I enter the password "password123"
    And I click the login button
    Then I should see the dashboard page