mocha.setup('bdd');
var expect = chai.expect;

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
      expect(regularObservable.extend.bind(regularObservable, { paged: {} })).to.throw(Error);
    });
  });
    
  context("on empty paged observable array", function () {
    it("itemCount is 0", function () {
      expect(emptyObservableArray.itemCount()).to.equal(0);
    });
    
    it("pageCount is 1", function () {
      expect(emptyObservableArray.pageCount()).to.equal(1);
    });
    
    it("firstItemOnPage is 1", function () {
      expect(emptyObservableArray.firstItemOnPage()).to.equal(1);
    });
    
    it("lastItemOnPage is 1", function () {
      expect(emptyObservableArray.lastItemOnPage()).to.equal(1);
    });
    
    it("hasPreviousPage is false", function () {
      expect(emptyObservableArray.hasPreviousPage()).to.be.false;
    });
    
    it("hasNextPage is false", function () {
      expect(emptyObservableArray.hasNextPage()).to.be.false;
    });
    
    it("isFirstPage is true", function () {
      expect(emptyObservableArray.isFirstPage()).to.be.true;
    });
    
    it("isLastPage is true", function () {
      expect(emptyObservableArray.isLastPage()).to.be.true;
    });
    
    it("pageItems returns empty array", function () {
      expect(emptyObservableArray.pageItems()).to.deep.equal([]);
    });
    
    it("toNextPage does not change pageNumber", function () {
      var oldPageNumber = emptyObservableArray.pageNumber();      
      emptyObservableArray.toNextPage();      
      expect(emptyObservableArray.pageNumber()).to.equal(oldPageNumber);
    });
    
    it("toPreviousPage does not change pageNumber", function () {
      var oldPageNumber = emptyObservableArray.pageNumber();      
      emptyObservableArray.toPreviousPage();      
      expect(emptyObservableArray.pageNumber()).to.equal(oldPageNumber);
    });
    
    it("toFirstPage does not change pageNumber", function () {
      var oldPageNumber = emptyObservableArray.pageNumber();      
      emptyObservableArray.toFirstPage();      
      expect(emptyObservableArray.pageNumber()).to.equal(oldPageNumber);
    });
    
    it("toLastPage does not change pageNumber", function () {
      var oldPageNumber = emptyObservableArray.pageNumber();      
      emptyObservableArray.toLastPage();      
      expect(emptyObservableArray.pageNumber()).to.equal(oldPageNumber);
    });
  });
    
  context("on single-page paged observable array", function () {    
    it("itemCount is number of elements in array", function () {
      expect(singlePageObservableArray.itemCount()).to.equal(singlePageObservableArray().length);
    });
    
    it("pageCount is 1", function () {
      expect(singlePageObservableArray.pageCount()).to.equal(1);
    });
    
    it("firstItemOnPage is 1", function () {
      expect(singlePageObservableArray.firstItemOnPage()).to.equal(1);
    });
    
    it("lastItemOnPage is is number of elements in array", function () {
      expect(singlePageObservableArray.lastItemOnPage()).to.equal(singlePageObservableArray().length);
    });
    
    it("hasPreviousPage is false", function () {
      expect(singlePageObservableArray.hasPreviousPage()).to.be.false;
    });
    
    it("hasNextPage is false", function () {
      expect(singlePageObservableArray.hasNextPage()).to.be.false;
    });
    
    it("isFirstPage is true", function () {
      expect(singlePageObservableArray.isFirstPage()).to.be.true;
    });
    
    it("isLastPage is true", function () {
      expect(singlePageObservableArray.isLastPage()).to.be.true;
    });
      
    it("pageItems returns all array elements", function () {
      expect(singlePageObservableArray.pageItems()).to.deep.equal(singlePageObservableArray());
    });
    
    it("toNextPage does not change pageNumber", function () {
      var oldPageNumber = singlePageObservableArray.pageNumber();      
      singlePageObservableArray.toNextPage();      
      expect(singlePageObservableArray.pageNumber()).to.equal(oldPageNumber);
    });
    
    it("toPreviousPage does not change pageNumber", function () {
      var oldPageNumber = singlePageObservableArray.pageNumber();      
      singlePageObservableArray.toPreviousPage();      
      expect(singlePageObservableArray.pageNumber()).to.equal(oldPageNumber);
    });
    
    it("toFirstPage does not change pageNumber", function () {
      var oldPageNumber = singlePageObservableArray.pageNumber();      
      singlePageObservableArray.toFirstPage();      
      expect(singlePageObservableArray.pageNumber()).to.equal(oldPageNumber);
    });
    
    it("toLastPage does not change pageNumber", function () {
      var oldPageNumber = singlePageObservableArray.pageNumber();      
      singlePageObservableArray.toLastPage();      
      expect(singlePageObservableArray.pageNumber()).to.equal(oldPageNumber);
    });
  });
    
  context("on multi-page paged observable array", function () {    
    context("with current page is first page", function () {
      beforeEach(function() {
        smallNumberPagesObservableArray.pageNumber(1);
      });
    
      it("itemCount is number of elements in array", function () {
        expect(smallNumberPagesObservableArray.itemCount()).to.equal(smallNumberPagesObservableArray().length);
      });
      
      it("pageCount is correct", function () {
        expect(smallNumberPagesObservableArray.pageCount()).to.equal(3);
      });
      
      it("firstItemOnPage is correct", function () {
        expect(smallNumberPagesObservableArray.firstItemOnPage()).to.equal(1);
      });
      
      it("lastItemOnPage is correct", function () {
        expect(smallNumberPagesObservableArray.lastItemOnPage()).to.equal(3);
      });
      
      it("hasPreviousPage is false", function () {
        expect(smallNumberPagesObservableArray.hasPreviousPage()).to.be.false;
      });
      
      it("hasNextPage is true", function () {
        expect(smallNumberPagesObservableArray.hasNextPage()).to.be.true;
      });
      
      it("isFirstPage is true", function () {
        expect(smallNumberPagesObservableArray.isFirstPage()).to.be.true;
      });
      
      it("isLastPage is false", function () {
        expect(smallNumberPagesObservableArray.isLastPage()).to.be.false;
      });
      
      it("pageItems returns all array elements on page", function () {
        expect(smallNumberPagesObservableArray.pageItems()).to.deep.equal([1, 2, 3]);
      });
      
      it("toNextPage increments pageNumber", function () {
        var oldPageNumber = smallNumberPagesObservableArray.pageNumber();      
        smallNumberPagesObservableArray.toNextPage();      
        expect(smallNumberPagesObservableArray.pageNumber()).to.equal(oldPageNumber + 1);
      });
      
      it("toPreviousPage does not change pageNumber", function () {
        var oldPageNumber = smallNumberPagesObservableArray.pageNumber();      
        smallNumberPagesObservableArray.toPreviousPage();      
        expect(smallNumberPagesObservableArray.pageNumber()).to.equal(oldPageNumber);
      });
      
      it("toFirstPage does not change pageNumber", function () {
        var oldPageNumber = smallNumberPagesObservableArray.pageNumber();      
        smallNumberPagesObservableArray.toFirstPage();      
        expect(smallNumberPagesObservableArray.pageNumber()).to.equal(oldPageNumber);
      });
      
      it("toLastPage sets pageNumber to last page", function () {
        smallNumberPagesObservableArray.toLastPage();      
        expect(smallNumberPagesObservableArray.pageNumber()).to.equal(smallNumberPagesObservableArray.pageCount());
      });    
    });
    
    context("with current page is middle page", function () {
      beforeEach(function() {
        smallNumberPagesObservableArray.pageNumber(2);
      });
    
      it("itemCount is number of elements in array", function () {
        expect(smallNumberPagesObservableArray.itemCount()).to.equal(smallNumberPagesObservableArray().length);
      });
      
      it("pageCount is correct", function () {
        expect(smallNumberPagesObservableArray.pageCount()).to.equal(3);
      });
      
      it("firstItemOnPage is correct", function () {
        expect(smallNumberPagesObservableArray.firstItemOnPage()).to.equal(4);
      });
      
      it("lastItemOnPage is correct", function () {
        expect(smallNumberPagesObservableArray.lastItemOnPage()).to.equal(6);
      });
      
      it("hasPreviousPage is true", function () {
        expect(smallNumberPagesObservableArray.hasPreviousPage()).to.be.true;
      });
      
      it("hasNextPage is true", function () {
        expect(smallNumberPagesObservableArray.hasNextPage()).to.be.true;
      });
      
      it("isFirstPage is false", function () {
        expect(smallNumberPagesObservableArray.isFirstPage()).to.be.false;
      });
      
      it("isLastPage is false", function () {
        expect(smallNumberPagesObservableArray.isLastPage()).to.be.false;
      });
      
      it("pageItems returns all array elements on page", function () {
        expect(smallNumberPagesObservableArray.pageItems()).to.deep.equal([4, 5, 6]);
      });
      
      it("toNextPage increments pageNumber", function () {
        var oldPageNumber = smallNumberPagesObservableArray.pageNumber();      
        smallNumberPagesObservableArray.toNextPage();      
        expect(smallNumberPagesObservableArray.pageNumber()).to.equal(oldPageNumber + 1);
      });
      
      it("toPreviousPage decrements pageNumber", function () {
        var oldPageNumber = smallNumberPagesObservableArray.pageNumber();      
        smallNumberPagesObservableArray.toPreviousPage();      
        expect(smallNumberPagesObservableArray.pageNumber()).to.equal(oldPageNumber - 1);
      });
      
      it("toFirstPage sets pageNumber to first page", function () {
        smallNumberPagesObservableArray.toFirstPage();      
        expect(smallNumberPagesObservableArray.pageNumber()).to.equal(1);
      });
      
      it("toLastPage sets pageNumber to last page", function () {
        smallNumberPagesObservableArray.toLastPage();      
        expect(smallNumberPagesObservableArray.pageNumber()).to.equal(smallNumberPagesObservableArray.pageCount());
      });    
    });
    
    context("with current page is last page", function () {
      beforeEach(function() {
        smallNumberPagesObservableArray.pageNumber(3);
      });
    
      it("itemCount is number of elements in array", function () {
        expect(smallNumberPagesObservableArray.itemCount()).to.equal(smallNumberPagesObservableArray().length);
      });
      
      it("pageCount is correct", function () {
        expect(smallNumberPagesObservableArray.pageCount()).to.equal(3);
      });
      
      it("firstItemOnPage is correct", function () {
        expect(smallNumberPagesObservableArray.firstItemOnPage()).to.equal(7);
      });
      
      it("lastItemOnPage is correct", function () {
        expect(smallNumberPagesObservableArray.lastItemOnPage()).to.equal(7);
      });
      
      it("hasPreviousPage is true", function () {
        expect(smallNumberPagesObservableArray.hasPreviousPage()).to.be.true;
      });
      
      it("hasNextPage is false", function () {
        expect(smallNumberPagesObservableArray.hasNextPage()).to.be.false;
      });
      
      it("isFirstPage is false", function () {
        expect(smallNumberPagesObservableArray.isFirstPage()).to.be.false;
      });
      
      it("isLastPage is true", function () {
        expect(smallNumberPagesObservableArray.isLastPage()).to.be.true;
      });
      
      it("pageItems returns all array elements on page", function () {
        expect(smallNumberPagesObservableArray.pageItems()).to.deep.equal([7]);
      });
      
      it("toNextPage does not change pageNumber", function () {
        var oldPageNumber = smallNumberPagesObservableArray.pageNumber();      
        smallNumberPagesObservableArray.toNextPage();      
        expect(smallNumberPagesObservableArray.pageNumber()).to.equal(oldPageNumber);
      });
      
      it("toPreviousPage decrements pageNumber", function () {
        var oldPageNumber = smallNumberPagesObservableArray.pageNumber();      
        smallNumberPagesObservableArray.toPreviousPage();      
        expect(smallNumberPagesObservableArray.pageNumber()).to.equal(oldPageNumber - 1);
      });
      
      it("toFirstPage sets pageNumber to first page", function () {
        smallNumberPagesObservableArray.toFirstPage();      
        expect(smallNumberPagesObservableArray.pageNumber()).to.equal(1);
      });
      
      it("toLastPage does not change pageNumber", function () {
        var oldPageNumber = smallNumberPagesObservableArray.pageNumber();      
        smallNumberPagesObservableArray.toLastPage();      
        expect(smallNumberPagesObservableArray.pageNumber()).to.equal(oldPageNumber);
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
        expect(pagedArrayWithoutOptions.pageNumber()).to.equal(1);
      });
  
      it("pageSize is 50", function () {
        expect(pagedArrayWithoutOptions.pageSize()).to.equal(50);
      });
  
      it("pageGenerator is default", function () {
        expect(pagedArrayWithoutOptions.pageGenerator).to.equal(ko.paging.generators['default']);
      });
      
      it("pageNumber uses global default", function () {
        ko.paging.defaults.pageNumber = 2;
        pagedArrayWithoutOptions = ko.observableArray();
        pagedArrayWithoutOptions.extend({ paged: emptyOptions });

        expect(pagedArrayWithoutOptions.pageNumber()).to.equal(2);
      });
  
      it("pageSize uses global default", function () {
        ko.paging.defaults.pageSize = 25;
        pagedArrayWithoutOptions = ko.observableArray();
        pagedArrayWithoutOptions.extend({ paged: emptyOptions });

        expect(pagedArrayWithoutOptions.pageSize()).to.equal(25);
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
        expect(pagedArrayWithOptions.pageNumber()).to.equal(options.pageNumber);
      });
  
      it("pageSize is equal to supplied option value", function () {
        expect(pagedArrayWithOptions.pageSize()).to.equal(options.pageSize);
      });

      var pageGeneratorNames = ['default'];
      
      pageGeneratorNames.forEach(function(pageGeneratorName) {
        it("pageGenerator is equal to page generator with supplied option value", function () {
          expect(pagedArrayWithOptions.pageGenerator).to.equal(ko.paging.generators[pageGeneratorName]);
        });
      });
  
      it("pageGenerator is equal to custom page generator with supplied option value", function () {
        var customPageGenerator = function (pagedObservable) { return []; }
        ko.paging.generators['custom'] = customPageGenerator;
        options = { pageGenerator: 'custom' };
        pagedArrayWithOptions.extend({ paged: options });

        expect(pagedArrayWithOptions.pageGenerator).to.equal(customPageGenerator);
      });
      
      var numbersLessThenZero = [0, -1, -3];
      
      numbersLessThenZero.forEach(function(invalidNumber) {
        it("pageNumber less than 1 throws", function () {
          options = { pageNumber: invalidNumber };
          expect(pagedArrayWithOptions.extend.bind(pagedArrayWithOptions, { paged: options })).to.throw(Error);
        });
        
        it("pageSize less than 1 throws", function () {
          options = { pageSize: invalidNumber };
          expect(pagedArrayWithOptions.extend.bind(pagedArrayWithOptions, { paged: options })).to.throw(Error);
        });
      });
      
      var unknownPageGeneratorNames = [null, '', 'unknown'];
      
      unknownPageGeneratorNames.forEach(function(unknownPageGeneratorName) {
        it("pageGenerator with unknown name throws", function () {
          options = { pageGenerator: unknownPageGeneratorName };
          expect(pagedArrayWithOptions.extend.bind(pagedArrayWithOptions, { paged: options })).to.throw(Error);
        });
      });
    });

    context("with initial value is", function() {
      it("empty array works", function () {
        var pagedArray = ko.observableArray([]).extend({ paged: {} });
        expect(pagedArray()).to.deep.equal([]);
      });
  
      it("non-empty array works", function () {
        var pagedArray = ko.observableArray([1, 2, 3]).extend({ paged: {} });
        expect(pagedArray()).to.deep.equal([1, 2, 3]);
      });
    });
  });
  
  context("observable value", function () {
    it("pageNumber can be explicitly set", function () {
      singlePageObservableArray.pageNumber(2);
      expect(singlePageObservableArray.pageNumber()).to.equal(2);
    });

    it("pageSize can be explicitly set", function () {
      singlePageObservableArray.pageSize(10);
      expect(singlePageObservableArray.pageSize()).to.equal(10);
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
        expect(singlePageObservableArray.pages()).to.deep.equal(createRange(1, 1));
      });

      it("works for small numbers of pages", function () {
        expect(smallNumberPagesObservableArray.pages()).to.deep.equal(createRange(1, 3));
      });

      it("works for large number of pages", function () {
        expect(largeNumberPagesObservableArray.pages()).to.deep.equal(createRange(1, 10));
      });

      context("responds to change of", function () {
        it("pageSize", function () {
          var oldPages = smallNumberPagesObservableArray.pages();
          smallNumberPagesObservableArray.pageSize(2);
          var newPages = smallNumberPagesObservableArray.pages();

          expect(oldPages).to.deep.equal(createRange(1, 3));
          expect(newPages).to.deep.equal(createRange(1, 4));
        });

        it("number of items in array", function () {
          var oldPages = smallNumberPagesObservableArray.pages();
          smallNumberPagesObservableArray(createRange(1, 4))
          var newPages = smallNumberPagesObservableArray.pages();

          expect(oldPages).to.deep.equal(createRange(1, 3));
          expect(newPages).to.deep.equal(createRange(1, 2));
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
        expect(singlePageObservableArray.pages()).to.deep.equal(createRange(1, 1));
      });

      it("works for small numbers of pages", function () {
        expect(smallNumberPagesObservableArray.pages()).to.deep.equal(createRange(1, 3));
      });

      it("works for large number of pages", function () {
        expect(largeNumberPagesObservableArray.pages()).to.deep.equal(createRange(1, 5));
      });

      it("works when page is first page", function () {
        largeNumberPagesObservableArray.pageNumber(1);
        expect(largeNumberPagesObservableArray.pages()).to.deep.equal(createRange(1, 5));
      });

      it("works when page is middle page", function () {
        largeNumberPagesObservableArray.pageNumber(5);
        expect(largeNumberPagesObservableArray.pages()).to.deep.equal(createRange(3, 7));
      });

      it("works when page is last page", function () {
        largeNumberPagesObservableArray.pageNumber(10);
        expect(largeNumberPagesObservableArray.pages()).to.deep.equal(createRange(6, 10));
      });

      it("works when window size is even", function () {
        largeNumberPagesObservableArray.pageGenerator.windowSize(2);
        largeNumberPagesObservableArray.pageNumber(6);
        expect(largeNumberPagesObservableArray.pages()).to.deep.equal([5, 6]);
      });

      it("works when window size is odd", function () {
        largeNumberPagesObservableArray.pageGenerator.windowSize(3);
        largeNumberPagesObservableArray.pageNumber(6);
        expect(largeNumberPagesObservableArray.pages()).to.deep.equal([5, 6, 7]);
      });

      context("responds to change of", function () {
        it("pageSize", function () {
          var oldPages = smallNumberPagesObservableArray.pages();
          smallNumberPagesObservableArray.pageSize(2);
          var newPages = smallNumberPagesObservableArray.pages();

          expect(oldPages).to.deep.equal(createRange(1, 3));
          expect(newPages).to.deep.equal(createRange(1, 4));
        });

        it("number of items in array", function () {
          var oldPages = smallNumberPagesObservableArray.pages();
          smallNumberPagesObservableArray(createRange(1, 4))
          var newPages = smallNumberPagesObservableArray.pages();

          expect(oldPages).to.deep.equal(createRange(1, 3));
          expect(newPages).to.deep.equal(createRange(1, 2));
        });

        it("window size", function () {
          var oldPages = smallNumberPagesObservableArray.pages();
          smallNumberPagesObservableArray.pageGenerator.windowSize(2);
          var newPages = smallNumberPagesObservableArray.pages();

          expect(oldPages).to.deep.equal(createRange(1, 3));
          expect(newPages).to.deep.equal(createRange(1, 2));
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
        expect(singlePageObservableArray.pages()).to.deep.equal([0]);
      });

      it("works for small numbers of pages", function () {
        expect(smallNumberPagesObservableArray.pages()).to.deep.equal(createRange(0, 2));
      });

      it("works for large number of pages", function () {
        expect(largeNumberPagesObservableArray.pages()).to.deep.equal(createRange(0, 9));
      });

      context("responds to change of", function () {
        it("pageSize", function () {
          var oldPages = smallNumberPagesObservableArray.pages();
          smallNumberPagesObservableArray.pageSize(2);
          var newPages = smallNumberPagesObservableArray.pages();

          expect(oldPages).to.deep.equal(createRange(0, 2));
          expect(newPages).to.deep.equal(createRange(0, 3));
        });

        it("number of items in array", function () {
          var oldPages = smallNumberPagesObservableArray.pages();
          smallNumberPagesObservableArray(createRange(1, 4))
          var newPages = smallNumberPagesObservableArray.pages();

          expect(oldPages).to.deep.equal(createRange(0, 2));
          expect(newPages).to.deep.equal(createRange(0, 1));
        });
      });
    });
  });
  
  context("created using ko.pagedObservableArray", function () {
    it("works without parameters", function () {
      var pagedObservableArray = ko.pagedObservableArray();
      expect(pagedObservableArray()).to.deep.equal([]);
      expect(pagedObservableArray.pageNumber()).to.deep.equal(1);
    });

    it("works with empty array parameter", function () {
      var pagedObservableArray = ko.pagedObservableArray([]);
      expect(pagedObservableArray()).to.deep.equal([]);
      expect(pagedObservableArray.pageNumber()).to.deep.equal(1);
    });

    it("works with non-empty array parameter", function () {
      var pagedObservableArray = ko.pagedObservableArray([1, 2, 3]);
      expect(pagedObservableArray()).to.deep.equal([1, 2, 3]);
      expect(pagedObservableArray.pageNumber()).to.deep.equal(1);
    });

    it("works with array and options parameters", function () {
      var options = { pageSize: 2 };
      var pagedObservableArray = ko.pagedObservableArray([1, 2, 3], options);
      expect(pagedObservableArray()).to.deep.equal([1, 2, 3]);
      expect(pagedObservableArray.pageSize()).to.deep.equal(2);
    });
  });
});