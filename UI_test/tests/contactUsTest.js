module.exports = {
  "Contact Us Form Test - Valid Submission": function (browser) {
    var contactUsPage = browser.page.contactUsPage();
    contactUsPage.navigate();

    contactUsPage
      .fillForm(
        "Customer service",
        "test@example.com",
        "123456",
        "This is a test message"
      )
      .waitForElementVisible("@alertSuccess", 10000)
      .assert.containsText(
        "@alertSuccess",
        "Your message has been successfully sent to our team."
      );

    browser.refresh();

    contactUsPage
      .fillForm(
        "Customer service",
        "test@example.com",
        "",
        "This is a test message"
      )
      .waitForElementVisible("@alertSuccess", 10000)
      .assert.containsText(
        "@alertSuccess",
        "Your message has been successfully sent to our team."
      );

    browser.end();
  },

  "Contact Us Form Test - Invalid Submission: Empty Email": function (browser) {
    var contactUsPage = browser.page.contactUsPage();
    contactUsPage.navigate();

    contactUsPage
      .fillForm("Customer service", "", "", "")
      .waitForElementVisible("@alertDanger", 10000)
      .assert.containsText("@alertDanger", "Invalid email address.");

    browser.end();
  },

  "Contact Us Form Test - Invalid Submission: Empty Message": function (
    browser
  ) {
    var contactUsPage = browser.page.contactUsPage();
    contactUsPage.navigate();

    contactUsPage
      .fillForm("Customer service", "test@example.com", "", "")
      .waitForElementVisible("@alertDanger", 10000)
      .assert.containsText("@alertDanger", "The message cannot be blank");

    browser.end();
  },

  "Contact Us Form Test - Invalid Submission: Empty Message with Order Reference":
    function (browser) {
      var contactUsPage = browser.page.contactUsPage();
      contactUsPage.navigate();

      contactUsPage
        .fillForm("Customer service", "test@example.com", "123456", "")
        .waitForElementVisible("@alertDanger", 10000)
        .assert.containsText("@alertDanger", "The message cannot be blank");

      browser.end();
    },

  "Contact Us Form Test - Missing Subject": function (browser) {
    var contactUsPage = browser.page.contactUsPage();
    contactUsPage.navigate();

    contactUsPage
      .fillForm("", "test@example.com", "123456", "Message text")
      .waitForElementVisible("@alertDanger", 10000)
      .assert.containsText(
        "@alertDanger",
        "Please select a subject from the list provided"
      );

    browser.end();
  },

  "Contact Us Form Test - Invalid Email": function (browser) {
    var contactUsPage = browser.page.contactUsPage();
    contactUsPage.navigate();

    contactUsPage
      .fillForm("Customer service", "invalid_email", "123456", "Message text")
      .waitForElementVisible("@alertDanger", 10000)
      .assert.containsText("@alertDanger", "Invalid email address");

    browser.end();
  },
  "Contact Us Form Test - File Upload": function (browser) {
    var contactUsPage = browser.page.contactUsPage();
    contactUsPage.navigate();

    contactUsPage
      .fillForm(
        "Webmaster",
        "test@example.com",
        "123456",
        "Testing file upload",
        "/SDET 2024 - Technical Task.pdf"
      )
      .waitForElementVisible("@alertSuccess", 20000)
      .assert.containsText(
        "@alertSuccess",
        "Your message has been successfully sent"
      );

    browser.end();
  },

  "Contact Us Form Test - Fields State After Reload": function (browser) {
    var contactUsPage = browser.page.contactUsPage();
    contactUsPage.navigate();
    browser.refresh();

    contactUsPage.assert.value("@emailField", ""); //to check if the email field is empty

    browser.end();
  },

  // Edge cases testing
  "Contact Us Form - Script Injection": function (browser) {
    var contactUsPage = browser.page.contactUsPage();
    contactUsPage.navigate();
    contactUsPage
      .fillForm(
        "Customer service",
        "test@example.com",
        "123456",
        "<script>alert('XSS')</script>"
      )
      .waitForElementVisible("@alertDanger", 10000)
      .assert.containsText("@alertDanger", "Invalid message");
    browser.end();
  },

  "Contact Us Form - Excessively Long Text": function (browser) {
    var contactUsPage = browser.page.contactUsPage();
    contactUsPage.navigate();
    contactUsPage
      .fillForm(
        "Customer service",
        "longemail@example.com",
        "123456",
        "A".repeat(1000)
      )
      .waitForElementVisible("@alertDanger", 10000)
      .assert.containsText(
        "@alertDanger",
        "Error message for excessively long text"
      );
    browser.end();
  },

  "Contact Us Form - HTML Injection": function (browser) {
    var contactUsPage = browser.page.contactUsPage();
    contactUsPage.navigate();
    contactUsPage
      .fillForm(
        "Customer service",
        "test@example.com",
        "123456",
        "<div>HTML Code</div> "
      )
      .waitForElementVisible("@alertDanger", 10000)
      .assert.containsText("@alertDanger", "Error message for HTML/SQL code");
    browser.end();
  },
};
