# Wifi scanner

Local wifi scanning and history viewer

## Getting Started
The wifi scanner and viewer has two main components.
One is the scanner which runs on background and scans every hour and sends the data to database.
Scanner uses the _iwlist_ CLI program which also requires the root permissions.

To view the sent data there is for that web application based on the Express. 

Before running application make sure to change the _conf.sample.js_ to _conf.js_ also change the parameters inside.

Both parts can be run separatly:
```javascript
sudo node backgroundJob.js // Background scanner

node app.js // This the web application, runs on port 3000
```

## Stack
Database MongoDB, I used the online hosting from Mongolab.com
Node.js and packages
  * Express.js
  * mongodb-wrapper - thin layer for database to hide the ugly cb hell and the connection init
  * lesscss
  * jade

Client side:
  * JQuery
  * Moment - great date - time manipulation library
  * g.raphaeljs - for line chart


## Screenshots
![Start page](/screen/example3.png "Home page of wifi scanner")
![Wifi spot](/screen/example1.png "View of one wifi spot")

## Release History
_(Nothing yet)_

## License
Copyright (c) 2013 Risto Novik  
Licensed under the MIT license.
