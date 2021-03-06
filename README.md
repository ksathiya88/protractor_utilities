# protractor_utilities

protractor utility function provides a **upperlevel** over the protractor libraries.           
So for setting or checking the element you need not use directly use protractor library like element(by.id)       
you need to just pass location reference and value to the library method it will be       
taken care automatically.       
For setting or checking the element just need to provide location in the format of interface **ILocRef**(.i.e by which the       
element can be identified by xpath or id or class and the specifier means id or xpath or class reference)      
and value you are interested in.       

> interface **ILocRef** {  
> type: **LocationTypes**;  
> value: **string**;  
> }  

In this above case LocationTypes is enum as specified below

> enum **LocationTypes**{  
> **Id** = "id",  
> **Xpath** = "xpath",  
> **Class** = "class"  
> }  

So the type in ILocRef can be either **"id"** or **"xpath"** or **"class"**          
and the value is the corresponding specifier.      
            
So if you want to set the location for username the location will be provided          
as          

> { type: **LocationTypes.Xpath**, value: **'//*[@id="username"]'** }              

in this case we are setting the username through the xpath reference.           

Say i want to set the username as "abc"          

> setElement({ type: **LocationTypes.Xpath**,     
   value: **'//*[@id="username"]'** },**"abc"**);          

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
           
> **import {   
    ILocRef,  
    LocationTypes,   
    IValueTypes } from "protractor_utility";**            
      
## Enums Exported
       
_Enums Used for specifying the location of the element by which the    
element can be identified by xpath or id or class_     
        
> export enum **LocationTypes** {     
> **Id** = "id",  
> **Xpath** = "xpath",    
> **Class** = "class"   
> }     

_Enums Used in reading from the Excel sheet.Used for    
specifying what it needs to read Value or Location or    
CheckValue parameters from Excel Sheet_    
     
> export enum **IValueTypes** {    
> **Value** = "value",    
> **CheckValue** = "checkValue",   
> **Location** = "location"    
> }     

## Interfaces Exported    
       
_Defines the format for providing the identification     
of the Element_      
     
> export interface **ILocRef** {   
> type: **LocationTypes**;   
> value: **string**;   
> }    
      
_Defines the complete structure for setting the value in the     
Element.location defines the parameters for the identification of the     
element.value defines the value that need to be set in the Element_    

> export interface **IElement** {   
> **location**: ILocRef;   
> **value**: string;   
> }    

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
       
> export interface **ILoginPage<T>**= {   
> **username**?: T;   
> **password**?: T;      
> **submit**?: T;   
> }     
        
This is how we would have developed the ids and values to be set for the page:      
          
> const loginPageIds: **ILoginPage<ILocRef>** = {   
> username: **{ type: LocationTypes.Xpath, value: '//\*[@id="username"]' }**,   
> password: **{ type: LocationTypes.Id, value: "password" }**,   
> submit: **{ type: LocationTypes.Class, value: "submit" }**   
> };   
     
> const loginPageValues: **ILoginPage<string>** = {      
> username: "abc",    
> password: "pass"    
> };    

This will be used for checking values
       
> export const loginPageCheckValues: **ILoginPage<string>** = {   
> username: "abc",   
> password: "pass"   
> };   

### setElement
       
_for setting a single element_
For Example setting username only.

> setElement(
{ type: **LocationTypes.Xpath**,  
  value:**'//*[@id="username"]'** },   
   **"abc"**);   
       
For setting multiple element at one use setValues      

### setValues   

_For setting multiple values in loginPage_  
**Example:** for setting multiple values .i.e username and password   
as we have only username and password in loginPageValues though we have   
id for submit button in loginPageIds.   
It will set value only for elements which is present in both.   

> **setValues**(loginPageIds,loginPageValues)     

### checkElement  
     
_For checking single value in loginPage_.
**Example:** For instance checking the username value set is "abc"

> **checkElement**(    
   { type: LocationTypes.Xpath, value: '//*[@id="username"]' },     
   "abc");     

### checkValues
      
_For checking multiple values in loginPage:_     
**Example:** For instance for checking mulltiple values .i.e. username is set to 'abc'    
and password is set to 'pass' as specified in loginPageCheckValues specified above.   
Here as well as the loginPageCheckValues have only two values though loginPageIds     
also includes submit id , it will check elements which matches both.     

> **checkValues**(loginPageIds,loginPageCheckValues)        

### elemClick

_For clicking on the Element_    

**Example:** For instance need to click on the submit button.       
Here we need to send the location Ref of the submit button(by which it will know    
where to click by id or xpath or class) defined as a value to submit in loginPageIds    
to the elemClick   
method.This can be done by   

> **elemClick**(loginPageIds.submit)     

### waitUntillLoaded

_To make protractor wait for the element_     

**Example:** For instance to ascertain login page as appeared after loading our page   
we can wait till username id has appeared in the screen   

> **waitUntillLoaded**(loginPageIds.username)         

### waitUntillEnabled

_To make protractor wait till the element is Enabled_    

**Example:** For instance to make protractor wait till Submit button is enabled.   
This may happen in the case when Submit button is enabled only after the username    
and password is entered.     

> **waitUntillEnabled**(loginPageIds.submit)    


### readExcel
In the above, loginPageIds, loginPageValues and loginPageCheckValues we actually provided.  
But these values can also be read from a Excel file by specifying in a prescribed format.   
__To provide the ids and values from a excel sheet__   
                 
Example: 
**For giving ids through Excel**
> export const **loginPageIds**: ILoginPage<ILocRef> = readExcel(   
  **IValueTypes.Location**,   
  **"./e2e/values/login.xlsx"**   
);   
            
First param will be what we trying to retrieve location or Value or CheckValue   
defined by the enum IValueTypes.               
Second param will be the path of the Excel sheet where we have saved the value.         
                 
 These conditions need to be followed in excel sheet:
 - In this excel sheet providing values       
   First sheet need to be the location     
   Second sheet need to be providing value         
   Third sheet need to be providing checkValues.         
 **This order needs to be maintained as this is temporarily hardcoded
 in library.**        
 
 - Also for location need to be provided under headers **PROPERTYKEY,LOCATIONTYPE,LOCATIONVALUE**
 - For Value and CheckValues need to be provided under headers **PROPERTYKEY,PROPERTYVALUE**
                     
**For giving value through Excel**
> export const **loginPageValues**: ILoginPage<string> = readExcel(    
  **IValueTypes.Value**,    
  **"./e2e/values/login.xlsx"**    
);    
                                
**For giving Check value through Excel**

> export const **loginPageCheckValues** = readExcel(   
  **IValueTypes.CheckValue**,   
  **"./e2e/values/login.xlsx"**    
);     

Example refer to this Excel for providing values:
[login.xlsx](https://github.com/ksathiya88/Angular_Learning/blob/master/e2e/values/login.xlsx)      
      

## For the complete example refer to this folder:    
[e2e folder](https://github.com/ksathiya88/Angular_Learning/blob/master/e2e)
                                   
Also use this Angular project for running the protractor test     
[project](https://github.com/ksathiya88/Angular_Learning)  
                   
**Starting the Angular project**      
- clone the projectusing **git clone** ,
- move to the folder **Angular_Learning** created by clone and do **npm install**
- **ng serve** to start the project
                 
**Running the protractor test**    
           
- update the drivers ans selenium jars using **webdriver-manager update**   
- start the selenium server using **webdriver-manager start**    
- And inside the Angular_Learning folder run the command 
  >node node_modules/protractor/bin/protractor e2e/protractor_jasmine.conf.js
            
This should run the protactor test using jasmine and you should be able to see       
screenshots under reports. If you make the test fail also you should be also able to see     
screenshots in the report.    
  



            
            
            
            
            
            
        
            
            
            
            
            
            
     
            
            
            
