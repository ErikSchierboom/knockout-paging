# Knockout paging

[![Bower version](https://badge.fury.io/bo/knockout-paging.svg)](http://badge.fury.io/bo/knockout-paging) 
[![npm version](https://badge.fury.io/js/knockout-paging.svg)](http://badge.fury.io/js/knockout-paging)
[![Build Status](https://travis-ci.org/ErikSchierboom/knockout-paging.svg?branch=master)](https://travis-ci.org/ErikSchierboom/knockout-paging)
[![Build status](https://ci.appveyor.com/api/projects/status/9odakh2g33mtpbm5?svg=true)](https://ci.appveyor.com/project/ErikSchierboom/knockout-paging)

This library adds an extender to Knockout that can add paging functionality to observable arrays.

## Usage

Using the library is simple. Just call the `extend` method on your observable array with `paged` as its key:

```js
var options = {};
var target = ko.observableArray();
target.extend({ paged: options });
```

After extending the observable array with the `paged` extender, the observable array will have new observables, computed values and functions added to it.

You can also use `ko.pagedObservableArray()`, which calls `ko.observableArray()` and applies the `paged` extender to it: 

```js
var emptyShort   = ko.pagedObservableArray(); 
var valueShort   = ko.pagedObservableArray([1, 2, 3]); 
var optionsShort = ko.pagedObservableArray([1, 2, 3], { pageSize: 2 }); 
```

### Observables

The paged observable array has the following observables added to it:

* `pageNumber`: the current page number (default: 1).
* `pageSize`: the page size (default: 50).

Changing the current page number or page size is as simple as:

```js
target.pageSize(10);
target.pageNumber(3);
```

#### Defaults 

If you want to override the default, initial values, for a single paged observable array, just specify them as parameters:

```js
target.extend({ paged: { pageNumber: 3, pageSize: 25 } });
```

You can also define global defaults in `ko.paging.defaults`:

```js
ko.paging.defaults.pageNumber = 2;
ko.paging.defaults.pageSize = 25;

// Create a paged observable array uses the global defaults
target.extend({ paged: {} });
target.pageNumber(); // Returns 2
target.pageSize();   // Returns 25
```

### Computed values

The following *read-only* computed values are added: 

* `pageItems`: the array items on the current page.
* `pageCount`: the total number of pages.
* `itemCount`: the total number of items in the array.
* `firstItemOnPage`: the index (one-based) of the first item on the current page.
* `lastItemOnPage`: the index (one-based) of the last item on the current page. 
* `hasPreviousPage`: indicates if there is a previous page.
* `hasNextPage`: indicates if there is a next page.
* `isFirstPage`: indicates if the current page is the first page.
* `isLastPage`:  indicates if the current page is the last page.
* `pages`: an array of pages.

The following example shows how these values can be used:

```js
var target = ko.observableArray([2, 3, 5, 9, 11]);
target.extend({ paged: { pageSize: 2 } });

target.pageItems();       // Returns [2, 3]
target.pageCount();       // Returns 3
target.itemCount();       // Returns 5
target.firstItemOnPage(); // Returns 1
target.lastItemOnPage();  // Returns 2
target.hasPreviousPage(); // Returns false
target.hasNextPage();     // Returns true
target.isFirstPage();     // Returns true
target.isLastPage();      // Returns false
target.pages();           // Returns [1, 2, 3]
```

### Functions

The following functions are available on the paged observable array:

* `toNextPage`: move to the next page (if there is one).
* `toPreviousPage`: move to the previous page (if there is one).
* `toFirstPage`: move to the first page.
* `toLastPage`: move to the last page.

This example shows how to use these functions:

```js
var target = ko.observableArray([2, 3, 5, 9, 11]);
target.extend({ paged: { pageSize: 2 } }); // page number is 1

target.toNextPage();     // pageNumber becomes 2
target.toLastPage();     // pageNumber becomes 3
target.toNextPage();     // pageNumber remains 3
target.toPreviousPage(); // pageNumber becomes 2
target.toFirstPage();    // pageNumber becomes 1
```

### Page generators

As we saw earlier, the `pages` computed observable returns an array of page numbers. It generates page through a concept known a page generators. Out of the box, there are two page generators you can use:

- Default page generator: returns all pages.
- Sliding page generator: returns current page and some pages surrounding.

#### Default page generator

The default page generator simply returns all available pages. The following example shows how to use the *default* page generator:

```js
var input = [1,2,3,4,5,6,7,8,9];

// Create a paged observable array using the 'default' page generater
var default = ko.observableArray(input).extend({ 
  paged: { 
    pageSize: 2, 
    pageGenerator: 'default'
  } 
});
```

The `default` paged observable array will now use the default page generator in its `pages` observable:

```js
// The returned pages are simply all available pages
default.pages(); // Returns [1, 2, 3, 4, 5]

// Changing the page number does not change the returned pages
default.pageNumber(3);
default.pages(); // Returns [1, 2, 3, 4, 5]
```

Note: as the default page generator is the default option, the following two statements are equivalent:

```js
ko.observableArray(input).extend({ paged: { pageGenerator: 'default' } });
ko.observableArray(input).extend({ paged: {} });
```

#### Sliding page generator

Although the simple page generator is fine for a small number of pages, it becomes unwieldy when there are many pages. This is where the *sliding* page generator shines, as it only returns the current page and some pages surrounding it.

This example shows how to use the `sliding` page generator:

```js
var input = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

// Create a paged observable array using the 'sliding' page generater
var sliding = ko.observableArray(input).extend({ 
  paged: { 
    pageSize: 2, 
    pageGenerator: 'sliding' 
  } 
});
```

The `sliding` paged observable array will use the sliding page generator in its `pages` observable:

```js
// Returned pages is a window around the current page
sliding.pages(); // Returns [1, 2, 3, 4, 5]

// Changing the page number changes the returned pages
sliding.pageNumber(7);
sliding.pages(); // Returns [5, 6, 7, 8, 9]
```

As can be seen, the sliding page generator returns the current page number and some pages left and right of it. By default, the window size is equal to five, which means that two items to the left and two items to the right of the current page are also returned.

You can easily change the *sliding* generator's window size:

```js
sliding.pageNumber(7);
sliding.pageGenerator.windowSize(3);
sliding.pages(); // Returns [6, 7, 8]
```

#### Custom page generators

You can also supply your own page generator. First, you define an object that has a `generate` function. This function takes a paged observable array as its parameter and should return an array of pages.

The following custom page generator is an adaptation of the simple page generator, but one that starts with zero:

```js
function CustomPageGenerator() {
  this.generate = function(pagedObservable) {
    return createRange(0, pagedObservable.pageCount() - 1);
  }
}
```

To be able to use this custom generator, we have to add it to `ko.paging.generators`:

```js
ko.paging.generators['custom'] = new CustomPageGenerator();
```

The key in which you stored the page generator is what you should specify in the `pageGenerator` parameter when extending the observable array:

```js
var input = [1,2,3,4,5,6,7,8,9];

// Create a paged observable array using our 'custom' page generater
var custom = ko.observableArray(input).extend({ 
  paged: { 
    pageSize: 2, 
    pageGenerator: 'custom'
  } 
});
```

The `custom` paged observable array will now use our custom page generator in its `pages` observable:

```js
// The returned pages are now zero-based
custom.pages(); // Returns [0, 1, 2, 3, 4]
```

## Installation
The best way to install this library is using [Bower](http://bower.io/):

    bower install knockout-paging

You can also install the library using NPM:

    npm install knockout-paging --save-dev

The library is also available from a [CDN](https://cdnjs.com/libraries/knockout-paging).

## Demos
There is a [JSBin demo](http://jsbin.com/liruyo/) that shows how the `paged` extender can be used.

## History
<table>
  <tr>
     <th>Date</th>
     <th>Version</th>
     <th>Changes</th>
  </tr>
  <tr>
     <td>2014-05-13</td>
     <td>0.2.1</td>
     <td>Added ko.pagedObservableArray shortcut method.</td>
  </tr>
  <tr>
     <td>2014-05-09</td>
     <td>0.2.0</td>
     <td>Added page generator support.</td>
  </tr>
  <tr>
     <td>2014-05-06</td>
     <td>0.1.0</td>
     <td>None. Initial version.</td>
  </tr>
</table>

## License
[Apache License 2.0](LICENSE)
