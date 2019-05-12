# Hyderabad Angular Framework 

Objective of this overall solution/project is multi fold. 
1. Create a starter project for any Enterprise Angular project
2. Organize the Library (Currently all the functionality is in a single library. Later, once stabilized, it will be broken into multiple libraries with a specific functionality)
3. Make use of all the typical angular framework features required by any Enterprise Angular applicaiton
4. (Try to) show coding best practices
5. Unit Test Automation (not yet done)

Library - Hyderabad Angular Framework provide following funcitonality
1. Base Components for List, Home and Detail Pages
2. Base Data Service for all the Business Services

### Project Overview
This framework is organized as a library (Hyderabad Library), and using this library, an applicaiton is built which provides facility to list the employees, and the view the details of the selected employee in a tabbed view (Detail, Experience, Allocations)

### Base Components
##### Highlights
1. Base component constructor accpets Injector, and the Service instance of the relevant functionality.
2. Injector will inject all the services required in the base class
3. It takes care of the common funcitonality applicable for listing / detail etc.

Lets go through the individual base classes

##### BaseFormDetailComponent
This component takes care of the simple CRUD functionality and the get of the data. 

### Base Service

