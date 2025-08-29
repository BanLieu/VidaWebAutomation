Feature: Login to the Coach Dashboard

Scenario: Successful login
    Given I navigate to the login page
    When I enter a valid username and password
    Then I should be logged in

Scenario: Invalid login
    Given I navigate to the login page
    When I enter invalid username and password
    Then I should not be able to log in successfully

Scenario: Coach action
    Given I navigate to the login page
    When I enter a valid username and password
    And I tap on Recently Added
    Then I should see Key Information
    