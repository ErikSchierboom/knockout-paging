# Knockout paging

[![Bower version](https://badge.fury.io/bo/knockout-paging.svg)](http://badge.fury.io/bo/knockout-paging) 
[![Build Status](https://travis-ci.org/ErikSchierboom/knockout-paging.svg?branch=readme)](https://travis-ci.org/ErikSchierboom/knockout-paging)

This library adds an extender to Knockout that can add paging functionality to observable arrays.

## Usage

Using the library is simple. Just call the `extend` method on your observable array with `paged` as its key:

```js
var target = ko.observableArray();
target.extend({ paged: {} });
```

After extending the observable array with the `paged` extender, the observable array will have observables, computed values and functions added to it.

### Observables

The paged observable array has the following observables added to it:

* `pageNumber`: the current page number (default: 1).
* `pageSize`: the page size (default: 50).

Changing the current page number or page size is as simple as:

```js
target.pageSize(10);
target.pageNumber(3);
```

If you want to override the default values, just specify them as parameters when extending the observable array:

```js
target.extend({ paged: { pageNumber: 3, pageSize: 25 } });
```

### Computed values

The following read-only computed values are added: 

* `pageItems`: the array items on the current page.
* `pageCount`: the total number of pages.
* `itemCount`: the total number of items in the array.
* `firstItemOnPage`: the index (one-based) of the first item on the current page.
* `lastItemOnPage`: the index (one-based) of the last item on the current page. 
* `hasPreviousPage`: indicates if there is a previous page.
* `hasNextPage`: indicates if there is a next page.
* `isFirstPage`: indicates if the current page is the first page.
* `isLastPage`:  indicates if the current page is the last page.

The following example shows how these values can be used:

```js
var target = ko.observableArray([2, 3, 5, 9, 11]);
target.extend({ paged: { pageSize: 2 } });

target.pageItems;       // Returns [2, 3]
target.pageCount;       // Returns 3
target.itemCount;       // Returns 5
target.firstItemOnPage; // Returns 1
target.lastItemOnPage;  // Returns 2
target.hasPreviousPage; // Returns false
target.hasNextPage;     // Returns true
target.isFirstPage;     // Returns true
target.isLastPage;      // Returns false
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

## Installation
The best way to install this library is using [Bower](http://bower.io/):

    bower install knockout-paging

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
     <td>2014-04-11</td>
     <td>0.1.0</td>
     <td>None. Initial version.</td>
  </tr>
</table>

## License
[Apache License 2.0](LICENSE)
