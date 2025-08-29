Feature: Sign up new account

Scenario: Create user account step 1
    Given I navigate to the signup page
    When I enter random name, email address, birthday, password
    And I check Terms of use
    And I check Policies Agreement
    And I hit Continue button
    Then I should see "Let's create your profile"

Scenario: Create user account step 2
    Given I navigate to create your profile page
    When I enter Height, Weight, Gender, Ethnicity
    And I hit Continue button
    Then I should see Search for Employer
