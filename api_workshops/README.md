# API WORKSHOP

## Steps

Create node project in folder:

`npm init` (go through the steps)

Create a start script in package.json:

`nodemon app.js`

Create an app.js with router:

/app.js:

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./main_router');

const app = express();

app.use(bodyParser.json());

app.use('/',router);

app.listen(3000, () => { console.log('API is running at http://localhost:3000')});
```

/main_router.js:

```javascript
const express = require('express');

var router = express.Router();

router.get('/', (req,res) => {
    res.send('Hello World');
});

module.exports = router;
```

## Packages Used

- express (`npm install -S express`)
- body-parser (`npm install -S body-parser`)
- nodemon (`npm install --save-dev nodemon`)
- mongodb (`npm install -S mongodb`)

## Resources

- This project makes use of [JavaScript Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Node.js MongoDB Driver API](http://mongodb.github.io/node-mongodb-native/2.0/api/index.html), aka the `mongodb` package
- [W3Schools Node.js MongoDB](https://www.w3schools.com/nodejs/nodejs_mongodb.asp)
- [DuckDuckGo](https://duckduckgo.com/)
