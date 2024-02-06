module.exports = {
  'Search for "Dress" and Verify Product Titles': function (browser) {
      let homepage = browser.page.homePage();

      homepage
          .navigate()
          .performSearch('dress')
          .waitForElementVisible('@searchResultItem', 10000);

      homepage.api.elements('@productTitle', function (resultItems) {
          if (resultItems.value && resultItems.value.length > 0) {
              let matchingTitlesCount = 0;
              let totalTitlesCount = resultItems.value.length;

              resultItems.value.forEach(function (element, index) {
                  homepage.api.elementIdText(element['element-6066-11e4-a52e-4f735466cecf'], function (textResult) {
                      if (textResult.value.toLowerCase().includes('dress')) {
                          matchingTitlesCount++;
                      }

                      // Perform the calculation and assertion after the last item
                    if (index === totalTitlesCount - 1) {
                          let matchingPercentage = (matchingTitlesCount / totalTitlesCount) * 100;
                          browser.assert.ok(matchingPercentage == 100, `100% of product titles contain "Dress" (Actual: ${matchingPercentage}%)`);
                      }
                  });
              });
          } else {
              browser.assert.fail('No product titles found');
          }
      });

      browser.end();
  }
};
