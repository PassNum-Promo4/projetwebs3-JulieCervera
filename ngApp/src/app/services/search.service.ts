import { Injectable } from '@angular/core';

@Injectable()
export class SearchService {

  constructor() { }

  
  // return array with elements matching the query
  // search(array: any[], query: String) {
  //   if (!query) {
  //     return array;
  //   }
  //   const lQuery = query.toLowerCase();
  //   const filteredArray = array.filter(item => {
  //     for (const key in item) {
  //       if (item.hasOwnProperty(key)) return true;
  //       }
  //   });
  //   return filteredArray;
  // }

  private _objArrayCheck(array: any[]): boolean {
    // Checks if the first item in the array is an object
    // (assumes same-shape for all array items)
    // Necessary because some arrays passed in may have
    // models that don't match {[key: string]: any}[]
    // This check prevents uncaught reference errors
    const item0 = array[0];
    const check = !!(array.length && item0 !== null && Object.prototype.toString.call(item0) === '[object Object]');
    return check;
  }
  
  search(array: any[], query: String, excludeProps?: string|string[],) {
    // Match query to strings and Date objects / ISO UTC strings
    // Optionally exclude properties from being searched
    // If matching dates, can optionally pass in date format string
    if (!query || !this._objArrayCheck(array)) {
      return array;
    }
    const lQuery = query.toLowerCase();
    const filteredArray = array.filter(item => {
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
            const thisVal = item[key];
            if (
              // Value is a string and NOT a UTC date
              typeof thisVal === 'string' &&
              thisVal.toLowerCase().indexOf(lQuery) !== -1
            ) {
              return true;
              }
        }
      }
    });
    return filteredArray;
  }
}
