// pageObjects/contactUsPage.js

module.exports = {
    url: 'http://automationpractice.multiformis.com/index.php?controller=contact',
    elements: {
      subjectHeading: '#id_contact',
      emailField: '#email',
      orderReferenceField: '#id_order',
      attachFileField: '#fileUpload',
      messageField: '#message',
      sendButton: '#submitMessage',
      alertSuccess: '.alert-success',
      alertDanger: '.alert-danger'
    },
    commands: [{
      fillForm(subject, email, orderReference, message, filePath) {
        this
          .setValue('@subjectHeading', subject)
          .setValue('@emailField', email)
          .setValue('@orderReferenceField', orderReference)
          .setValue('@messageField', message);
  
        if (filePath) {
          this.setValue('@attachFileField', require('path').resolve(__dirname + filePath));
        }
  
        return this.click('@sendButton');
      }
    }]
  };
  