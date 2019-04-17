# express-router-reload
Easy to use, hot swapper for your express routes.

## Examples
```js
const express = require('express'); // normal express what nots
var app = express();
var router = require('./routers/router.js');

const RR = require('express-router-reload');
let reloader = new RR(app);

app.use("/route", router);

// After whatever else. Let's say you change the file

delete require.cache[require.resolve("./routers/router.js")];
router = require('./routers/router.js');

//now
reloader("/route", router);

// Overwrites the old router with the new refreshed one!
```

#### An easier way:

```js
const RR = require('express-router-reload');
let reloader = new RR(app);

//express stuff...

reloader.reloadFromFile("/route", path.resolve(__dirname, "./routes/router.js"));
//The second paramater MUST be the full path.
//This basically just does the delete require.cache[require.resolve(path)] for you!
```

### Links
[NPM Package](https://npmjs.com/package/express-router-reload)\
[GitHub](https://github.com/jpbberry/express-router-reload)\
[Creator's Website](https://www.jt3ch.net)