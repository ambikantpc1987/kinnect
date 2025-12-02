@regression
Feature: Add to Cart

  Scenario: Add a product to the cart
    Given I am logged in as "standard_user"
    When I add the product "Sauce Labs Backpack" to the cart
    Then the cart icon badge should show "1"
