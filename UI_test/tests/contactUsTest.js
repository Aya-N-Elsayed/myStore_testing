// tests/contactUsTest.js

module.exports = {
  "Contact Us Form Test": function (browser) {
    var contactUsPage = browser.page.contactUsPage();
    // Navigate to the Contact Us page
    contactUsPage.navigate();

    // Test: Valid form submission
    contactUsPage
      .fillForm(
        "Customer service",
        "test@example.com",
        "123456",
        "This is a test message"
      )
      .assert.containsText(
        "@alertSuccess",
        "Your message has been successfully sent to our team."
      );

    // Test: Invalid form submission (missing required fields)
    contactUsPage
      .fillForm("", "", "", "")
      .assert.containsText("@alertDanger", "Invalid email address.");

    // Test: File upload
    contactUsPage
      .fillForm(
        "Webmaster",
        "test@example.com",
        "123456",
        "Testing file upload",
        "/myStore_testing/README.md"
      )
      .assert.containsText(
        "@alertSuccess",
        "Your message has been successfully sent"
      );

    browser.end();
  },
};
