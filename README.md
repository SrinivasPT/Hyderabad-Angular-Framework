# Hyderabad Angular Framework 
Objective of this overall solution/project is multi fold. 
- [X] Create a starter project for any Enterprise Angular project
- [X] Organize the Library (Currently all the functionality is in a single library. Later, once stabilized, it will be broken into multiple libraries with a specific functionality)
- [X] Make use of all the typical angular framework features required by any Enterprise Angular applicaiton
- [X] (Try to) show coding best practices
- [ ] Unit Test Automation (not yet done)

## Technology Involved
1. Angular 7
2. dotnet core 2.3
3. SQL Server 2016
4. JWT

# Brief Overview
This solution consists of an applicaiton for managing employees. Functionality supported include
1. List of Employees
2. View a particular employee details in various tabs - Detail, Past Experience, Current Project Allocations

This solution also has a library called Hyderabad, which provides the typical funcitonalty required by any of the enterprise applicaiton. We will explore the details of the library in the subsequent sections.

As I have mentioned erlier, the purpose of the project is multi fold and some of they are
1. Project Organization
2. Library (which takes care of the routine work)
3. Coding Best practices and Functional Programming(?)
4. Test Automation (Future versions)

Let's explore each of these areas

## View 1 - Organization & Features
### Angular Features
1. Lazy Loading & Child Routes
2. Resolver
3. Business Services
4. Interceptors
5. Gaurds
6. Reactive Forms
7. 

### Code Organization


### VS Code Settings
Setting leverages John Papas Angular Essentials which installs multiple addons. My customized setting for this tool can be found at


## View 2 - Library
Library - Hyderabad Angular Framework provide following funcitonality
1. Base Components for List, Home and Detail Pages
2. Base Data Service for all the Business Services
3. Base Components for Textbox, Datepicker, Textarea etc. (these are wrapper on Kendo Controls)
4. Grid Component (wrapper on Kendo Grid) which provides additional functionality required for typical enterprise application
5. Reactive Forms
6. JWT Integration

### Base Components
##### Highlights
1. Base component constructor accpets Injector, and the Service instance of the relevant functionality.
2. Injector will inject all the services required in the base class
3. It takes care of the common funcitonality applicable for listing / detail etc.

Lets go through the individual base classes

##### BaseFormDetailComponent
This component takes care of the simple CRUD functionality and the get of the data. 

### Base Service

## View 3 - Coding Practices

## View 4 - Test Automation (future)


# Credits
##### Saikiran Mandhala
Grid Logic for extending the Kendo grid to include the designer columns and the dynamic columns
