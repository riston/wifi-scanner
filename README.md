# wifi

Local wifi scanning and history viewer

## Getting Started
The wifi scanner and viewer has two main components.
One is the scanner which runs on background and scans every hour and sends the data to database.
Scanner uses the _iwlist_ CLI program which also requires the root permissions.

To view the sent data there is for that web application based on the Express. 

Both parts can be run separatly:
```javascript
sudo node backgroundJob.js // Background scanner

node app.js // This the web application
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/gruntjs/grunt).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2013 Risto Novik  
Licensed under the MIT license.
