# protractor_utilities
protractor utility functions

usuage in Typescript:

import {
  setElement,
  elemClick,
  setValues,
  waitUntillLoaded,
  waitUntillEnabled,
  checkValues,
  readExcel
} from "protractor_utility";

Interface Type imported:

import { ILocRef, LocationTypes, IValueTypes } from "protractor_utility";

Methods exported:
 setElement,
 elemClick,
 setValues,
 waitUntillLoaded,
 waitUntillEnabled,
 checkValues,
 readExcel

For example setting values in loginPage 
setValues:

const loginPageIds: ILoginPage<ILocRef> = {
   username: { type: LocationTypes.Xpath, value: '//*[@id="username"]' },
   password: { type: LocationTypes.Id, value: "password" },
   submit: { type: LocationTypes.Class, value: "submit" }
 };

 const loginPageValues: ILoginPage<string> = {
   username: "abc",
   password: "pass"
 };


To be used for setting the values in loginPage for example:
setValues(loginPageIds,loginPageValues)


For checking the values in loginPage:

 export const loginPageCheckValues: ILoginPage<string> = {
   username: "abc",
   password: "pass"
 };
checkValues(loginPageIds,loginPageCheckValues)

