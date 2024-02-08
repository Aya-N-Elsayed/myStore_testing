
# SDET 2024 - Technical Task

This project contains an automated testing suite developed with Nightwatch.js for the "My Store" web application, aimed at ensuring the reliability and functionality of the site's key features, including the contact form and search functionality. Additionally, it encompasses API testing using Jest and Supertest to validate the functionality of the mock-user-auth npm package.

# Automated Testing Suite for My Store with Nightwatch.js
## Features

- **Contact Us Form Validation**: Tests for both valid and invalid submissions, ensuring robust error handling, figuring out the optional and required
fields and add the required tests for the form submission.
- **Search Functionality**: Validates the search feature on the homepage, checking for accurate results when searching for products.


## Getting Started

### Prerequisites

    "chromedriver": "^121.0.0",
    "geckodriver": "^4.3.2",
    "nightwatch": "^3.4.0"

### Installation

1. Clone the repository:


git clone https://github.com/Aya-N-Elsayed/myStore_testing

- **To run all tests**
npx nightwatch

- **To run  contactUs test**
npx nightwatch tests/contactUsTest.js

- **To run  search test**
npx nightwatch tests/homeTest.js


# API Testing
## Features

- **Authentication Testing: Validate the functionality of the mock-user-auth npm package API using Jest and Supertest.**

## Getting Started

### Prerequisites

    "jest": "^29.7.0",
    "jest-html-reporter": "^3.10.2",
    "supertest": "^6.3.4",
    "mock-user-auth": "^1.0.15"

1. Start the server manually :
    npm run dev

2. Run the test 
- **To run all tests**
npm test

- **To run a specific task**
npm test createUser

