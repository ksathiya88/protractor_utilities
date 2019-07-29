# protractor_utilities

protractor utility function provides a **upperlevel** over the protractor libraries.
So for setting or checking the element you need not use directly use protractor library like element(by.id)
you need to just pass location reference and value to the library method it will be
taken care automatically.
For setting or checking the element just need to provide location in the format of interface **ILocRef**(.i.e by which the
element can be identified by xpath or id or class and the specifier means id or xpath or class reference)
and value you are interested in.

> `interface ILocRef` {
> type: LocationTypes;
> value: string;
> }

In this above case LocationTypes is enum as specified below

> `enum LocationTypes`{
> Id = "id",
> Xpath = "xpath",
> Class = "class"
> }

So the type in ILocRef can be either "id" or "xpath" or "class"
and the value is the corresponding specifier.

So if you want to set the location for username the location will be provided
as

> `{ type: LocationTypes.Xpath, value: '//*[@id="username"]' }`

in this case we are setting the username through the xpath reference.

Say i want to set the username as "abc"

> `setElement({ type: LocationTypes.Xpath, value: '//*[@id="username"]' },"abc");`

## usuage in Typescript:

> **import {
> setElement,
> setValues,
> checkElement,
> checkValues,
> elemClick,
> waitUntillLoaded,
> waitUntillEnabled,
> readExcel
> } from "protractor_utility";**

_Interface Type Exported:_

> \*\*import {

    ILocRef,
    LocationTypes,
    IValueTypes } from "protractor_utility";**

## Enums Exported

_Enums Used for specifying the location of the element by which the
element can be identified by xpath or id or class_

> **export enum LocationTypes {
> Id = "id",
> Xpath = "xpath",
> Class = "class"
> }**

_Enums Used in reading from the Excel sheet.Used for
specifying what it needs to read Value or Location or
CheckValue parameters from Excel Sheet_

> **export enum IValueTypes {
> Value = "value",
> CheckValue = "checkValue",
> Location = "location"
> }**

## Interfaces Exported

_Defines the format for providing the identification
of the Element_

> **export interface ILocRef {
> type: LocationTypes;
> value: string;
> }**

_Defines the complete structure for setting the value in the
Element.location defines the parameters for the identification of the
element.value defines the value that need to be set in the Element_

> **export interface IElement {
> location: ILocRef;
> value: string;
> }**

## Methods Available:

- setElement,
- setValues,
- checkElement
- checkValues
- elemClick
- waitUntillLoaded,
- waitUntillEnabled,
- readExcel

All our examples we will consider setting value for loginPage
which has username,password and submit button

This is how we should have created the interface for the page:

> `export interface ILoginPage<T>`= {
> username?: T;
> password?: T;
> submit?: T;
> }

This is how we would have developed the ids and values to be set for the page:

> `const loginPageIds: ILoginPage<ILocRef>` = {
> username: { type: LocationTypes.Xpath, value: '//\*[@id="username"]' },
> password: { type: LocationTypes.Id, value: "password" },
> submit: { type: LocationTypes.Class, value: "submit" }
> };

> `const loginPageValues: ILoginPage<string>` = {
> username: "abc",
> password: "pass"
> };

This will be used for checking values

> ` export const loginPageCheckValues: ILoginPage<string> = {
> username: "abc",
> password: "pass"
> };

### setElement

_for setting a single element_
For Example setting username only.

> `setElement({ type: LocationTypes.Xpath, value: '//*[@id="username"]' },"abc");`

For setting multiple element at one use setValues

### setValues

_For setting multiple values in loginPage_
**Example:** for setting multiple values .i.e username and password
as we have only username and password in loginPageValues though we have
id for submit button in loginPageIds.
It will set value only for elements which is present in both.

> `setValues(loginPageIds,loginPageValues)`

### checkElement

_For checking single value in loginPage_.
**Example:** For instance checking the username value set is "abc"

> `checkElement({ type: LocationTypes.Xpath, value: '//*[@id="username"]' },"abc");`

### checkValues

_For checking multiple values in loginPage:_
**Example:** For instance for checking mulltiple values .i.e. username is set to 'abc' and password is set to 'pass' as specified in loginPageCheckValues specified above.
Here as well as the loginPageCheckValues have only two values though loginPageIds
also includes submit id , it will check elements which matches both.

> `checkValues(loginPageIds,loginPageCheckValues)`

### elemClick

\_For clicking on the Element\_\_

**Example:** For instance need to click on the submit button.
Here we need to send the location Ref of the submit button(by which it will know where to click by id or xpath or class) defined as a value to submit in loginPageIds to the elemClick
method.This can be done by

> `elemClick(loginPageIds.submit)`

### waitUntillLoaded

_To make protractor wait for the element_

**Example:** For instance to ascertain login page as appeared after loading our page
we can wait till username id has appeared in the screen

.>`waitUntillLoaded(loginPageIds.username)`

### waitUntillEnabled

_To make protractor wait till the element is Enabled_

**Example:** For instance to make protractor wait till Submit button is enabled.
This may happen in the case when Submit button is enabled only after the username and password is entered.

> `waitUntillEnabled(loginPageIds.submit)`
