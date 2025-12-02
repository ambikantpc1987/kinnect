@regression
Feature: Checkout Flow

  Scenario: Complete checkout with 1 item
    Given I have 1 item in the cart
    When I proceed to checkout and enter details
    Then I should see the order confirmation message
