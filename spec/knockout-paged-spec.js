mocha.setup('bdd')
assert = chai.assert;

function createRange(min, max) {
  var list = [];

  for (var i = min; i <= max; i++) {
      list.push(i);
  }

  return list;
}

describe("paged extender", function () {
  var emptyObservableArray,
      singlePageObservableArray,
      smallNumberPagesObservableArray,
      largeNumberPagesObservableArray;

  beforeEach(function() {
    var options = { pageSize: 3 };

    // Reset the defaults
    ko.paging.defaults.pageNumber = 1;
    ko.paging.defaults.pageSize = 50;

    // Reset the observable arrays
    emptyObservableArray = ko.observableArray([]).extend({ paged: options });
    singlePageObservableArray = ko.observableArray([1]).extend({ paged: options });
    smallNumberPagesObservableArray = ko.observableArray(createRange(1, 7)).extend({ paged: options });
    largeNumberPagesObservableArray = ko.observableArray(createRange(1, 30)).extend({ paged: options });
  });
  
  context("on regular observable", function () {
    it("throws", function () {
      var regularObservable = ko.observable();
      assert.throws(regularObservable.extend.bind(regularObservable, { paged: {} }));
    });
  });
    
  context("on empty observable", function () {
    it("itemCount is 0", function () {
      assert.strictEqual(emptyObservableArray.itemCount(), 0);
    });
    
    it("pageCount is 1", function () {
      assert.strictEqual(emptyObservableArray.pageCount(), 1);
    });
    
    it("firstItemOnPage is 1", function () {
      assert.strictEqual(emptyObservableArray.firstItemOnPage(), 1);
    });
    
    it("lastItemOnPage is 1", function () {
      assert.strictEqual(emptyObservableArray.lastItemOnPage(), 1);
    });
    
    it("hasPreviousPage is false", function () {
      assert.isFalse(emptyObservableArray.hasPreviousPage());
    });
    
    it("hasNextPage is false", function () {
      assert.isFalse(emptyObservableArray.hasNextPage());
    });
    
    it("isFirstPage is true", function () {
      assert.isTrue(emptyObservableArray.isFirstPage());
    });
    
    it("isLastPage is true", function () {
      assert.isTrue(emptyObservableArray.isLastPage());
    });
    
    it("pageItems returns empty array", function () {
      assert.deepEqual(emptyObservableArray.pageItems(), []);
    });
    
    it("toNextPage does not change pageNumber", function () {
      var oldPageNumber = emptyObservableArray.pageNumber();      
      emptyObservableArray.toNextPage();      
      assert.strictEqual(emptyObservableArray.pageNumber(), oldPageNumber);
    });
    
    it("toPreviousPage does not change pageNumber", function () {
      var oldPageNumber = emptyObservableArray.pageNumber();      
      emptyObservableArray.toPreviousPage();      
      assert.strictEqual(emptyObservableArray.pageNumber(), oldPageNumber);
    });
    
    it("toFirstPage does not change pageNumber", function () {
      var oldPageNumber = emptyObservableArray.pageNumber();      
      emptyObservableArray.toFirstPage();      
      assert.strictEqual(emptyObservableArray.pageNumber(), oldPageNumber);
    });
    
    it("toLastPage does not change pageNumber", function () {
      var oldPageNumber = emptyObservableArray.pageNumber();      
      emptyObservableArray.toLastPage();      
      assert.strictEqual(emptyObservableArray.pageNumber(), oldPageNumber);
    });
  });
    
  context("on single-page observable", function () {    
    it("itemCount is number of elements in array", function () {
      assert.strictEqual(singlePageObservableArray.itemCount(), singlePageObservableArray().length);
    });
    
    it("pageCount is 1", function () {
      assert.strictEqual(singlePageObservableArray.pageCount(), 1);
    });
    
    it("firstItemOnPage is 1", function () {
      assert.strictEqual(singlePageObservableArray.firstItemOnPage(), 1);
    });
    
    it("lastItemOnPage is is number of elements in array", function () {
      assert.strictEqual(singlePageObservableArray.lastItemOnPage(), singlePageObservableArray().length);
    });
    
    it("hasPreviousPage is false", function () {
      assert.isFalse(singlePageObservableArray.hasPreviousPage());
    });
    
    it("hasNextPage is false", function () {
      assert.isFalse(singlePageObservableArray.hasNextPage());
    });
    
    it("isFirstPage is true", function () {
      assert.isTrue(singlePageObservableArray.isFirstPage());
    });
    
    it("isLastPage is true", function () {
      assert.isTrue(singlePageObservableArray.isLastPage());
    });
      
    it("pageItems returns all array elements", function () {
      assert.deepEqual(singlePageObservableArray.pageItems(), singlePageObservableArray());
    });
    
    it("toNextPage does not change pageNumber", function () {
      var oldPageNumber = singlePageObservableArray.pageNumber();      
      singlePageObservableArray.toNextPage();      
      assert.strictEqual(singlePageObservableArray.pageNumber(), oldPageNumber);
    });
    
    it("toPreviousPage does not change pageNumber", function () {
      var oldPageNumber = singlePageObservableArray.pageNumber();      
      singlePageObservableArray.toPreviousPage();      
      assert.strictEqual(singlePageObservableArray.pageNumber(), oldPageNumber);
    });
    
    it("toFirstPage does not change pageNumber", function () {
      var oldPageNumber = singlePageObservableArray.pageNumber();      
      singlePageObservableArray.toFirstPage();      
      assert.strictEqual(singlePageObservableArray.pageNumber(), oldPageNumber);
    });
    
    it("toLastPage does not change pageNumber", function () {
      var oldPageNumber = singlePageObservableArray.pageNumber();      
      singlePageObservableArray.toLastPage();      
      assert.strictEqual(singlePageObservableArray.pageNumber(), oldPageNumber);
    });
  });
    
  context("on multi-page observable", function () {    
    context("with current page is first page", function () {
      beforeEach(function() {
        smallNumberPagesObservableArray.pageNumber(1);
      });
    
      it("itemCount is number of elements in array", function () {
        assert.strictEqual(smallNumberPagesObservableArray.itemCount(), smallNumberPagesObservableArray().length);
      });
      
      it("pageCount is correct", function () {
        assert.strictEqual(smallNumberPagesObservableArray.pageCount(), 3);
      });
      
      it("firstItemOnPage is correct", function () {
        assert.strictEqual(smallNumberPagesObservableArray.firstItemOnPage(), 1);
      });
      
      it("lastItemOnPage is correct", function () {
        assert.strictEqual(smallNumberPagesObservableArray.lastItemOnPage(), 3);
      });
      
      it("hasPreviousPage is false", function () {
        assert.isFalse(smallNumberPagesObservableArray.hasPreviousPage());
      });
      
      it("hasNextPage is true", function () {
        assert.isTrue(smallNumberPagesObservableArray.hasNextPage());
      });
      
      it("isFirstPage is true", function () {
        assert.isTrue(smallNumberPagesObservableArray.isFirstPage());
      });
      
      it("isLastPage is false", function () {
        assert.isFalse(smallNumberPagesObservableArray.isLastPage());
      });
      
      it("pageItems returns all array elements on page", function () {
        assert.deepEqual(smallNumberPagesObservableArray.pageItems(), [1, 2, 3]);
      });
      
      it("toNextPage increments pageNumber", function () {
        var oldPageNumber = smallNumberPagesObservableArray.pageNumber();      
        smallNumberPagesObservableArray.toNextPage();      
        assert.strictEqual(smallNumberPagesObservableArray.pageNumber(), oldPageNumber + 1);
      });
      
      it("toPreviousPage does not change pageNumber", function () {
        var oldPageNumber = smallNumberPagesObservableArray.pageNumber();      
        smallNumberPagesObservableArray.toPreviousPage();      
        assert.strictEqual(smallNumberPagesObservableArray.pageNumber(), oldPageNumber);
      });
      
      it("toFirstPage does not change pageNumber", function () {
        var oldPageNumber = smallNumberPagesObservableArray.pageNumber();      
        smallNumberPagesObservableArray.toFirstPage();      
        assert.strictEqual(smallNumberPagesObservableArray.pageNumber(), oldPageNumber);
      });
      
      it("toLastPage sets pageNumber to last page", function () {
        smallNumberPagesObservableArray.toLastPage();      
        assert.strictEqual(smallNumberPagesObservableArray.pageNumber(), smallNumberPagesObservableArray.pageCount());
      });    
    });
    
    context("with current page is middle page", function () {
      beforeEach(function() {
        smallNumberPagesObservableArray.pageNumber(2);
      });
    
      it("itemCount is number of elements in array", function () {
        assert.strictEqual(smallNumberPagesObservableArray.itemCount(), smallNumberPagesObservableArray().length);
      });
      
      it("pageCount is correct", function () {
        assert.strictEqual(smallNumberPagesObservableArray.pageCount(), 3);
      });
      
      it("firstItemOnPage is correct", function () {
        assert.strictEqual(smallNumberPagesObservableArray.firstItemOnPage(), 4);
      });
      
      it("lastItemOnPage is correct", function () {
        assert.strictEqual(smallNumberPagesObservableArray.lastItemOnPage(), 6);
      });
      
      it("hasPreviousPage is true", function () {
        assert.isTrue(smallNumberPagesObservableArray.hasPreviousPage());
      });
      
      it("hasNextPage is true", function () {
        assert.isTrue(smallNumberPagesObservableArray.hasNextPage());
      });
      
      it("isFirstPage is false", function () {
        assert.isFalse(smallNumberPagesObservableArray.isFirstPage());
      });
      
      it("isLastPage is false", function () {
        assert.isFalse(smallNumberPagesObservableArray.isLastPage());
      });
      
      it("pageItems returns all array elements on page", function () {
        assert.deepEqual(smallNumberPagesObservableArray.pageItems(), [4, 5, 6]);
      });
      
      it("toNextPage increments pageNumber", function () {
        var oldPageNumber = smallNumberPagesObservableArray.pageNumber();      
        smallNumberPagesObservableArray.toNextPage();      
        assert.strictEqual(smallNumberPagesObservableArray.pageNumber(), oldPageNumber + 1);
      });
      
      it("toPreviousPage decrements pageNumber", function () {
        var oldPageNumber = smallNumberPagesObservableArray.pageNumber();      
        smallNumberPagesObservableArray.toPreviousPage();      
        assert.strictEqual(smallNumberPagesObservableArray.pageNumber(), oldPageNumber - 1);
      });
      
      it("toFirstPage sets pageNumber to first page", function () {
        smallNumberPagesObservableArray.toFirstPage();      
        assert.strictEqual(smallNumberPagesObservableArray.pageNumber(), 1);
      });
      
      it("toLastPage sets pageNumber to last page", function () {
        smallNumberPagesObservableArray.toLastPage();      
        assert.strictEqual(smallNumberPagesObservableArray.pageNumber(), smallNumberPagesObservableArray.pageCount());
      });    
    });
    
    context("with current page is last page", function () {
      beforeEach(function() {
        smallNumberPagesObservableArray.pageNumber(3);
      });
    
      it("itemCount is number of elements in array", function () {
        assert.strictEqual(smallNumberPagesObservableArray.itemCount(), smallNumberPagesObservableArray().length);
      });
      
      it("pageCount is correct", function () {
        assert.strictEqual(smallNumberPagesObservableArray.pageCount(), 3);
      });
      
      it("firstItemOnPage is correct", function () {
        assert.strictEqual(smallNumberPagesObservableArray.firstItemOnPage(), 7);
      });
      
      it("lastItemOnPage is correct", function () {
        assert.strictEqual(smallNumberPagesObservableArray.lastItemOnPage(), 7);
      });
      
      it("hasPreviousPage is true", function () {
        assert.isTrue(smallNumberPagesObservableArray.hasPreviousPage());
      });
      
      it("hasNextPage is false", function () {
        assert.isFalse(smallNumberPagesObservableArray.hasNextPage());
      });
      
      it("isFirstPage is false", function () {
        assert.isFalse(smallNumberPagesObservableArray.isFirstPage());
      });
      
      it("isLastPage is true", function () {
        assert.isTrue(smallNumberPagesObservableArray.isLastPage());
      });
      
      it("pageItems returns all array elements on page", function () {
        assert.deepEqual(smallNumberPagesObservableArray.pageItems(), [7]);
      });
      
      it("toNextPage does not change pageNumber", function () {
        var oldPageNumber = smallNumberPagesObservableArray.pageNumber();      
        smallNumberPagesObservableArray.toNextPage();      
        assert.strictEqual(smallNumberPagesObservableArray.pageNumber(), oldPageNumber);
      });
      
      it("toPreviousPage decrements pageNumber", function () {
        var oldPageNumber = smallNumberPagesObservableArray.pageNumber();      
        smallNumberPagesObservableArray.toPreviousPage();      
        assert.strictEqual(smallNumberPagesObservableArray.pageNumber(), oldPageNumber - 1);
      });
      
      it("toFirstPage sets pageNumber to first page", function () {
        smallNumberPagesObservableArray.toFirstPage();      
        assert.strictEqual(smallNumberPagesObservableArray.pageNumber(), 1);
      });
      
      it("toLastPage does not change pageNumber", function () {
        var oldPageNumber = smallNumberPagesObservableArray.pageNumber();      
        smallNumberPagesObservableArray.toLastPage();      
        assert.strictEqual(smallNumberPagesObservableArray.pageNumber(), oldPageNumber);
      });    
    });
  });
  
  context("constructor", function () {
    context("without options", function () {
      var pagedArrayWithoutOptions,
          emptyOptions;

      beforeEach(function() {
        emptyOptions = {};
        pagedArrayWithoutOptions = ko.observableArray([]).extend({ paged: emptyOptions });
      });
      
      it("pageNumber is 1", function () {
        assert.strictEqual(pagedArrayWithoutOptions.pageNumber(), 1);
      });
  
      it("pageSize is 50", function () {
        assert.strictEqual(pagedArrayWithoutOptions.pageSize(), 50);
      });
  
      it("pageGenerator is default", function () {
        assert.strictEqual(pagedArrayWithoutOptions.pageGenerator, ko.paging.generators['default']);
      });
      
      it("pageNumber uses global default", function () {
        ko.paging.defaults.pageNumber = 2;
        pagedArrayWithoutOptions = ko.observableArray();
        pagedArrayWithoutOptions.extend({ paged: emptyOptions });

        assert.strictEqual(pagedArrayWithoutOptions.pageNumber(), 2);
      });
  
      it("pageSize uses global default", function () {
        ko.paging.defaults.pageSize = 25;
        pagedArrayWithoutOptions = ko.observableArray();
        pagedArrayWithoutOptions.extend({ paged: emptyOptions });

        assert.strictEqual(pagedArrayWithoutOptions.pageSize(), 25);
      });
    });
  
    context("with options", function () {
      var pagedArrayWithOptions,
          options;

      beforeEach(function() {
        options = { pageNumber: 3, pageSize: 25 };
        pagedArrayWithOptions = ko.observableArray(createRange(1, 7)).extend({ paged: options });
      });
      
      it("pageNumber is equal to supplied option value", function () {
        assert.strictEqual(pagedArrayWithOptions.pageNumber(), options.pageNumber);
      });
  
      it("pageSize is equal to supplied option value", function () {
        assert.strictEqual(pagedArrayWithOptions.pageSize(), options.pageSize);
      });

      var pageGeneratorNames = ['default'];
      
      pageGeneratorNames.forEach(function(pageGeneratorName) {
        it("pageGenerator is equal to page generator with supplied option value", function () {
          assert.strictEqual(pagedArrayWithOptions.pageGenerator, ko.paging.generators[pageGeneratorName]);
        });
      });
  
      it("pageGenerator is equal to custom page generator with supplied option value", function () {
        var customPageGenerator = function (pagedObservable) { return []; }
        ko.paging.generators['custom'] = customPageGenerator;
        options = { pageGenerator: 'custom' };
        pagedArrayWithOptions.extend({ paged: options });

        assert.strictEqual(pagedArrayWithOptions.pageGenerator, customPageGenerator);
      });
      
      var numbersLessThenZero = [0, -1, -3];
      
      numbersLessThenZero.forEach(function(invalidNumber) {
        it("pageNumber less than 1 throws", function () {
          options = { pageNumber: invalidNumber };
          assert.throws(pagedArrayWithOptions.extend.bind(pagedArrayWithOptions, { paged: options }));
        });
        
        it("pageSize less than 1 throws", function () {
          options = { pageSize: invalidNumber };
          assert.throws(pagedArrayWithOptions.extend.bind(pagedArrayWithOptions, { paged: options }));
        });
      });
      
      var unknownPageGeneratorNames = [null, '', 'unknown'];
      
      unknownPageGeneratorNames.forEach(function(unknownPageGeneratorName) {
        it("pageGenerator with unknown name throws", function () {
          options = { pageGenerator: unknownPageGeneratorName };
          assert.throws(pagedArrayWithOptions.extend.bind(pagedArrayWithOptions, { paged: options }));
        });
      });
    });
  });
  
  context("observable value", function () {
    it("pageNumber can be explicitly set", function () {
      singlePageObservableArray.pageNumber(2);
      assert.strictEqual(singlePageObservableArray.pageNumber(), 2);
    });

    it("pageSize can be explicitly set", function () {
      singlePageObservableArray.pageSize(10);
      assert.strictEqual(singlePageObservableArray.pageSize(), 10);
    });
  });
  
  context("page generators", function () {
    context("default page generator", function () {
      beforeEach(function() {
        singlePageObservableArray['pageGenerator'] = ko.paging.generators['default'];
        smallNumberPagesObservableArray['pageGenerator'] = ko.paging.generators['default'];
        largeNumberPagesObservableArray['pageGenerator'] = ko.paging.generators['default'];
      });

      it("works for single page", function () {
        assert.deepEqual(singlePageObservableArray.pages(), createRange(1, 1));
      });

      it("works for small numbers of pages", function () {
        assert.deepEqual(smallNumberPagesObservableArray.pages(), createRange(1, 3));
      });

      it("works for large number of pages", function () {
        assert.deepEqual(largeNumberPagesObservableArray.pages(), createRange(1, 10));
      });

      context("responds to change of", function () {
        it("pageSize", function () {
          var oldPages = smallNumberPagesObservableArray.pages();
          smallNumberPagesObservableArray.pageSize(2);
          var newPages = smallNumberPagesObservableArray.pages();

          assert.deepEqual(oldPages, createRange(1, 3));
          assert.deepEqual(newPages, createRange(1, 4));
        });

        it("number of items in array", function () {
          var oldPages = smallNumberPagesObservableArray.pages();
          smallNumberPagesObservableArray(createRange(1, 4))
          var newPages = smallNumberPagesObservableArray.pages();

          assert.deepEqual(oldPages, createRange(1, 3));
          assert.deepEqual(newPages, createRange(1, 2));
        });
      });
    });

    context("sliding page generator", function () {
      beforeEach(function() {
        ko.paging.generators['sliding'].windowSize(5);

        singlePageObservableArray['pageGenerator'] = ko.paging.generators['sliding'];
        smallNumberPagesObservableArray['pageGenerator'] = ko.paging.generators['sliding'];
        largeNumberPagesObservableArray['pageGenerator'] = ko.paging.generators['sliding'];
      });

      it("works for single page", function () {
        assert.deepEqual(singlePageObservableArray.pages(), createRange(1, 1));
      });

      it("works for small numbers of pages", function () {
        assert.deepEqual(smallNumberPagesObservableArray.pages(), createRange(1, 3));
      });

      it("works for large number of pages", function () {
        assert.deepEqual(largeNumberPagesObservableArray.pages(), createRange(1, 5));
      });

      it("works when page is first page", function () {
        largeNumberPagesObservableArray.pageNumber(1);
        assert.deepEqual(largeNumberPagesObservableArray.pages(), createRange(1, 5));
      });

      it("works when page is middle page", function () {
        largeNumberPagesObservableArray.pageNumber(5);
        assert.deepEqual(largeNumberPagesObservableArray.pages(), createRange(3, 7));
      });

      it("works when page is last page", function () {
        largeNumberPagesObservableArray.pageNumber(10);
        assert.deepEqual(largeNumberPagesObservableArray.pages(), createRange(6, 10));
      });

      it("works when window size is even", function () {
        largeNumberPagesObservableArray.pageGenerator.windowSize(2);
        largeNumberPagesObservableArray.pageNumber(6);
        assert.deepEqual(largeNumberPagesObservableArray.pages(), [5, 6]);
      });

      it("works when window size is odd", function () {
        largeNumberPagesObservableArray.pageGenerator.windowSize(3);
        largeNumberPagesObservableArray.pageNumber(6);
        assert.deepEqual(largeNumberPagesObservableArray.pages(), [5, 6, 7]);
      });

      context("responds to change of", function () {
        it("pageSize", function () {
          var oldPages = smallNumberPagesObservableArray.pages();
          smallNumberPagesObservableArray.pageSize(2);
          var newPages = smallNumberPagesObservableArray.pages();

          assert.deepEqual(oldPages, createRange(1, 3));
          assert.deepEqual(newPages, createRange(1, 4));
        });

        it("number of items in array", function () {
          var oldPages = smallNumberPagesObservableArray.pages();
          smallNumberPagesObservableArray(createRange(1, 4))
          var newPages = smallNumberPagesObservableArray.pages();

          assert.deepEqual(oldPages, createRange(1, 3));
          assert.deepEqual(newPages, createRange(1, 2));
        });

        it("window size", function () {
          var oldPages = smallNumberPagesObservableArray.pages();
          smallNumberPagesObservableArray.pageGenerator.windowSize(2);
          var newPages = smallNumberPagesObservableArray.pages();

          assert.deepEqual(oldPages, createRange(1, 3));
          assert.deepEqual(newPages, createRange(1, 2));
        });
      });
    });

    context("custom page generator", function () {
      before(function() {
        ko.paging.generators['custom'] = {
          generate: function(pagedObservable) {
            return createRange(0, pagedObservable.pageCount() - 1);
          }
        }
      });

      beforeEach(function() {
        singlePageObservableArray['pageGenerator'] = ko.paging.generators['custom'];
        smallNumberPagesObservableArray['pageGenerator'] = ko.paging.generators['custom'];
        largeNumberPagesObservableArray['pageGenerator'] = ko.paging.generators['custom'];
      });

      it("works for single page", function () {
        assert.deepEqual(singlePageObservableArray.pages(), [0]);
      });

      it("works for small numbers of pages", function () {
        assert.deepEqual(smallNumberPagesObservableArray.pages(), createRange(0, 2));
      });

      it("works for large number of pages", function () {
        assert.deepEqual(largeNumberPagesObservableArray.pages(), createRange(0, 9));
      });

      context("responds to change of", function () {
        it("pageSize", function () {
          var oldPages = smallNumberPagesObservableArray.pages();
          smallNumberPagesObservableArray.pageSize(2);
          var newPages = smallNumberPagesObservableArray.pages();

          assert.deepEqual(oldPages, createRange(0, 2));
          assert.deepEqual(newPages, createRange(0, 3));
        });

        it("number of items in array", function () {
          var oldPages = smallNumberPagesObservableArray.pages();
          smallNumberPagesObservableArray(createRange(1, 4))
          var newPages = smallNumberPagesObservableArray.pages();

          assert.deepEqual(oldPages, createRange(0, 2));
          assert.deepEqual(newPages, createRange(0, 1));
        });
      });
    });
  });
  
  context("created using ko.pagedObservableArray", function () {
    it("works without parameters", function () {
      var pagedObservableArray = ko.pagedObservableArray();
      assert.deepEqual(pagedObservableArray(), []);
      assert.deepEqual(pagedObservableArray.pageNumber(), 1);
    });

    it("works with array parameter", function () {
      var pagedObservableArray = ko.pagedObservableArray([1, 2, 3]);
      assert.deepEqual(pagedObservableArray(), [1, 2, 3]);
      assert.deepEqual(pagedObservableArray.pageNumber(), 1);
    });

    it("works with array and options parameters", function () {
      var options = { pageSize: 2 };
      var pagedObservableArray = ko.pagedObservableArray([1, 2, 3], options);
      assert.deepEqual(pagedObservableArray(), [1, 2, 3]);
      assert.deepEqual(pagedObservableArray.pageSize(), 2);
    });
  });
});