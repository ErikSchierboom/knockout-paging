mocha.setup('bdd')
assert = chai.assert;

describe("paged extender", function () {
  var target;
  var options;

  beforeEach(function() {
    target = ko.observableArray();
    options = {};
  });
  
  context("on regular observable", function () {
    it("throws", function () {
      target = ko.observable();
      assert.throws(target.extend.bind(target, { paged: options }));
    });
  });
    
  context("on empty observable", function () {
    beforeEach(function() {
      options = {};
      target.extend({ paged: options });
    });
    
    it("itemCount is 0", function () {
      assert.strictEqual(target.itemCount(), 0);
    });
    
    it("pageCount is 1", function () {
      assert.strictEqual(target.pageCount(), 1);
    });
    
    it("firstItemOnPage is 1", function () {
      assert.strictEqual(target.firstItemOnPage(), 1);
    });
    
    it("lastItemOnPage is 1", function () {
      assert.strictEqual(target.lastItemOnPage(), 1);
    });
    
    it("hasPreviousPage is false", function () {
      assert.isFalse(target.hasPreviousPage());
    });
    
    it("hasNextPage is false", function () {
      assert.isFalse(target.hasNextPage());
    });
    
    it("isFirstPage is true", function () {
      assert.isTrue(target.isFirstPage());
    });
    
    it("isLastPage is true", function () {
      assert.isTrue(target.isLastPage());
    });
    
    it("pageItems returns empty array", function () {
      assert.deepEqual(target.pageItems(), []);
    });
    
    it("toNextPage does not change pageNumber", function () {
      var oldPageNumber = target.pageNumber();      
      target.toNextPage();      
      assert.strictEqual(target.pageNumber(), oldPageNumber);
    });
    
    it("toPreviousPage does not change pageNumber", function () {
      var oldPageNumber = target.pageNumber();      
      target.toPreviousPage();      
      assert.strictEqual(target.pageNumber(), oldPageNumber);
    });
    
    it("toFirstPage does not change pageNumber", function () {
      var oldPageNumber = target.pageNumber();      
      target.toFirstPage();      
      assert.strictEqual(target.pageNumber(), oldPageNumber);
    });
    
    it("toLastPage does not change pageNumber", function () {
      var oldPageNumber = target.pageNumber();      
      target.toLastPage();      
      assert.strictEqual(target.pageNumber(), oldPageNumber);
    });
  });
    
  context("on single-page observable", function () {
    beforeEach(function() {
      options = {};
      target = ko.observableArray([2, 3, 5, 7, 11]);
      target.extend({ paged: options });
    });
    
    it("itemCount is number of elements in array", function () {
      assert.strictEqual(target.itemCount(), target().length);
    });
    
    it("pageCount is 1", function () {
      assert.strictEqual(target.pageCount(), 1);
    });
    
    it("firstItemOnPage is 1", function () {
      assert.strictEqual(target.firstItemOnPage(), 1);
    });
    
    it("lastItemOnPage is is number of elements in array", function () {
      assert.strictEqual(target.lastItemOnPage(), target().length);
    });
    
    it("hasPreviousPage is false", function () {
      assert.isFalse(target.hasPreviousPage());
    });
    
    it("hasNextPage is false", function () {
      assert.isFalse(target.hasNextPage());
    });
    
    it("isFirstPage is true", function () {
      assert.isTrue(target.isFirstPage());
    });
    
    it("isLastPage is true", function () {
      assert.isTrue(target.isLastPage());
    });
    
    it("pageItems returns all array elements", function () {
      assert.deepEqual(target.pageItems(), target());
    });
    
    it("toNextPage does not change pageNumber", function () {
      var oldPageNumber = target.pageNumber();      
      target.toNextPage();      
      assert.strictEqual(target.pageNumber(), oldPageNumber);
    });
    
    it("toPreviousPage does not change pageNumber", function () {
      var oldPageNumber = target.pageNumber();      
      target.toPreviousPage();      
      assert.strictEqual(target.pageNumber(), oldPageNumber);
    });
    
    it("toFirstPage does not change pageNumber", function () {
      var oldPageNumber = target.pageNumber();      
      target.toFirstPage();      
      assert.strictEqual(target.pageNumber(), oldPageNumber);
    });
    
    it("toLastPage does not change pageNumber", function () {
      var oldPageNumber = target.pageNumber();      
      target.toLastPage();      
      assert.strictEqual(target.pageNumber(), oldPageNumber);
    });
  });
    
  context("on multi-page observable", function () {
    beforeEach(function() {
      options = { pageSize: 2 };
      target = ko.observableArray([2, 3, 5, 7, 11]);
      target.extend({ paged: options });
    });
    
    context("with current page is first page", function () {
      beforeEach(function() {
        target.pageNumber(1);
      });
    
      it("itemCount is number of elements in array", function () {
        assert.strictEqual(target.itemCount(), target().length);
      });
      
      it("pageCount is 3", function () {
        assert.strictEqual(target.pageCount(), 3);
      });
      
      it("firstItemOnPage is 1", function () {
        assert.strictEqual(target.firstItemOnPage(), 1);
      });
      
      it("lastItemOnPage is 2", function () {
        assert.strictEqual(target.lastItemOnPage(), 2);
      });
      
      it("hasPreviousPage is false", function () {
        assert.isFalse(target.hasPreviousPage());
      });
      
      it("hasNextPage is true", function () {
        assert.isTrue(target.hasNextPage());
      });
      
      it("isFirstPage is true", function () {
        assert.isTrue(target.isFirstPage());
      });
      
      it("isLastPage is false", function () {
        assert.isFalse(target.isLastPage());
      });
      
      it("pageItems returns all array elements on page", function () {
        assert.deepEqual(target.pageItems(), [2, 3]);
      });
      
      it("toNextPage increments pageNumber", function () {
        var oldPageNumber = target.pageNumber();      
        target.toNextPage();      
        assert.strictEqual(target.pageNumber(), oldPageNumber + 1);
      });
      
      it("toPreviousPage does not change pageNumber", function () {
        var oldPageNumber = target.pageNumber();      
        target.toPreviousPage();      
        assert.strictEqual(target.pageNumber(), oldPageNumber);
      });
      
      it("toFirstPage does not change pageNumber", function () {
        var oldPageNumber = target.pageNumber();      
        target.toFirstPage();      
        assert.strictEqual(target.pageNumber(), oldPageNumber);
      });
      
      it("toLastPage sets pageNumber to last page", function () {
        target.toLastPage();      
        assert.strictEqual(target.pageNumber(), target.pageCount());
      });    
    });
    
    context("with current page is middle page", function () {
      beforeEach(function() {
        target.pageNumber(2);
      });
    
      it("itemCount is number of elements in array", function () {
        assert.strictEqual(target.itemCount(), target().length);
      });
      
      it("pageCount is 3", function () {
        assert.strictEqual(target.pageCount(), 3);
      });
      
      it("firstItemOnPage is 3", function () {
        assert.strictEqual(target.firstItemOnPage(), 3);
      });
      
      it("lastItemOnPage is 4", function () {
        assert.strictEqual(target.lastItemOnPage(), 4);
      });
      
      it("hasPreviousPage is true", function () {
        assert.isTrue(target.hasPreviousPage());
      });
      
      it("hasNextPage is true", function () {
        assert.isTrue(target.hasNextPage());
      });
      
      it("isFirstPage is false", function () {
        assert.isFalse(target.isFirstPage());
      });
      
      it("isLastPage is false", function () {
        assert.isFalse(target.isLastPage());
      });
      
      it("pageItems returns all array elements on page", function () {
        assert.deepEqual(target.pageItems(), [5, 7]);
      });
      
      it("toNextPage increments pageNumber", function () {
        var oldPageNumber = target.pageNumber();      
        target.toNextPage();      
        assert.strictEqual(target.pageNumber(), oldPageNumber + 1);
      });
      
      it("toPreviousPage decrements pageNumber", function () {
        var oldPageNumber = target.pageNumber();      
        target.toPreviousPage();      
        assert.strictEqual(target.pageNumber(), oldPageNumber - 1);
      });
      
      it("toFirstPage sets pageNumber to first page", function () {
        target.toFirstPage();      
        assert.strictEqual(target.pageNumber(), 1);
      });
      
      it("toLastPage sets pageNumber to last page", function () {
        target.toLastPage();      
        assert.strictEqual(target.pageNumber(), target.pageCount());
      });    
    });
    
    context("with current page is last page", function () {
      beforeEach(function() {
        target.pageNumber(3);
      });
    
      it("itemCount is number of elements in array", function () {
        assert.strictEqual(target.itemCount(), target().length);
      });
      
      it("pageCount is 3", function () {
        assert.strictEqual(target.pageCount(), 3);
      });
      
      it("firstItemOnPage is 5", function () {
        assert.strictEqual(target.firstItemOnPage(), 5);
      });
      
      it("lastItemOnPage is 5", function () {
        assert.strictEqual(target.lastItemOnPage(), 5);
      });
      
      it("hasPreviousPage is true", function () {
        assert.isTrue(target.hasPreviousPage());
      });
      
      it("hasNextPage is false", function () {
        assert.isFalse(target.hasNextPage());
      });
      
      it("isFirstPage is false", function () {
        assert.isFalse(target.isFirstPage());
      });
      
      it("isLastPage is true", function () {
        assert.isTrue(target.isLastPage());
      });
      
      it("pageItems returns all array elements on page", function () {
        assert.deepEqual(target.pageItems(), [11]);
      });
      
      it("toNextPage does not change pageNumber", function () {
        var oldPageNumber = target.pageNumber();      
        target.toNextPage();      
        assert.strictEqual(target.pageNumber(), oldPageNumber);
      });
      
      it("toPreviousPage decrements pageNumber", function () {
        var oldPageNumber = target.pageNumber();      
        target.toPreviousPage();      
        assert.strictEqual(target.pageNumber(), oldPageNumber - 1);
      });
      
      it("toFirstPage sets pageNumber to first page", function () {
        target.toFirstPage();      
        assert.strictEqual(target.pageNumber(), 1);
      });
      
      it("toLastPage does not change pageNumber", function () {
        var oldPageNumber = target.pageNumber();      
        target.toLastPage();      
        assert.strictEqual(target.pageNumber(), oldPageNumber);
      });    
    });
  });
  
  context("constructor", function () {
    context("without options", function () {      
      beforeEach(function() {
        options = {};
        target.extend({ paged: options });
      });
      
      it("pageNumber is 1", function () {
        assert.strictEqual(target.pageNumber(), 1);
      });
  
      it("pageSize is 50", function () {
        assert.strictEqual(target.pageSize(), 50);
      });
    });
  
    context("with options", function () {
      beforeEach(function() {
        options = { pageNumber: 3, pageSize: 25 };
        target.extend({ paged: options });
      });
      
      it("pageNumber is equal to supplied option value", function () {
        assert.strictEqual(target.pageNumber(), options.pageNumber);
      });
  
      it("pageSize is equal to supplied option value", function () {
        assert.strictEqual(target.pageSize(), options.pageSize);
      });
      
      var numbersLessThenZero = [0, -1, -3];
      
      numbersLessThenZero.forEach(function(invalidNumber) {
        it("pageNumber less than 1 throws", function () {
          options = { pageNumber: invalidNumber };
          assert.throws(target.extend.bind(target, { paged: options }));
        });
        
        it("pageSize less than 1 throws", function () {
          options = { pageSize: invalidNumber };
          assert.throws(target.extend.bind(target, { paged: options }));
        });
      });
    });
  });
  
  context("observable", function () {
    beforeEach(function() {
      target = ko.observableArray([2, 3, 5, 7, 11]);
      target.extend({ paged: options });
    });

    it("pageNumber can be explicitly set", function () {
      target.pageNumber(2);
      assert.strictEqual(target.pageNumber(), 2);
    });

    it("pageSize can be explicitly set", function () {
      target.pageSize(10);
      assert.strictEqual(target.pageSize(), 10);
    });
  });
});