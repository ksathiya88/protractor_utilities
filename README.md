# protractor_utilities

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


protractor utility function provides a upperlevel over the protractor libraries.
So for setting or checking the element just need to provide location through ILocRef(.i.e by which the 
element can be identified by xpath or id or class and the specifier)
and value you are interested in.

interface ILocRef {
  type: LocationTypes;
  value: string;
}
In this above case LocationTypes is enum as specified below
enum LocationTypes {
  Id = "id",
  Xpath = "xpath",
  Class = "class"
}

So the type in ILocRef can be either "id" or "xpath" or "class"
and the value is the corresponding specifier.

So if you want to set the location for username the location will be provided
as { type: LocationTypes.Xpath, value: '//*[@id="username"]' }
in this case we are setting the username through the xpath reference.

Say i want to set the username as "abc"

So for setting a single element you can use 
setElement({ type: LocationTypes.Xpath, value: '//*[@id="username"]' },"abc");

For setting multiple element at one use setValues

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

For checking single value in loginPage:

checkElement({ type: LocationTypes.Xpath, value: '//*[@id="username"]' },"abc");

For checking multiple values in loginPage:


 export const loginPageCheckValues: ILoginPage<string> = {
   username: "abc",
   password: "pass"
 };
checkValues(loginPageIds,loginPageCheckValues)

