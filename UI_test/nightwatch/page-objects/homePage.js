module.exports = {
  url: "http://automationpractice.multiformis.com/index.php",
  elements: {
    searchBox: ".search_query",
    searchButton: ".button-search",
    searchResultItem: ".product_list",
    productTitle: ".product-container .product-name",

  },
  commands: [
    {
      performSearch: function(query) {
        this.setValue('@searchBox', query)
           .click('@searchButton');
        return this;
      },
    },
  ],
};
