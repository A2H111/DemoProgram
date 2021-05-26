// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    keys(): string[];
    <T>(id: string): T;
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
//Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
const contextnew = require.context('../', true, /app\.services\.spec\.ts$/);
contextnew.keys().map(contextnew);
// And load the modules.
context.keys().map(context);

// const context = require.context('../', true, /out\.spec\.ts$|in\.spec\.ts$/);//
// context.keys().map(context);