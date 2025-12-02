Features of This Framework
. Playwright + Cucumber (BDD)

Uses Gherkin syntax (.feature files) with step definitions in TypeScript.

. Page Object Model (POM)

All locators & UI actions are separated into logical page classes.

. Test Tagging

Supports execution using tags:

@smoke

@regression

. Reporting

Includes:

HTML report

Allure report ( installed)

. Parallel Execution

Runs scenarios in parallel using Playwright Test Runner.

. Screenshots on Failure

Automatically captures screenshots for failed steps.

. Environment Variables

Credentials (username/password) can be passed via .env.


///Folder Structure///

├── features
│   ├── login.feature
│   ├── add_to_cart.feature
│   └── checkout.feature
│
├── step-definitions
│   ├── login.steps.ts
│   ├── addToCart.steps.ts
│   └── checkout.steps.ts
│
├── pages
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── ConfirmationPage.ts
│
├── hooks
│   ├── hooks.ts
│   └── pageFixture.ts
│
├── test-results
├── playwright.config.ts
├── cucumber.config.ts
├── README.md
└── package.json


Implemented Test Scenarios
Feature 1: Login

Successful login with valid credentials

Invalid login for locked-out user

Feature 2: Add to Cart

Login

Add Sauce Labs Backpack

Verify cart badge = 1

Feature 3: Checkout Flow

Add item to cart

Checkout with user information

Verify success message:
"THANK YOU FOR YOUR ORDER"