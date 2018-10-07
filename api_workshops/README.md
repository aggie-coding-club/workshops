### API WORKSHOP

## Steps
Create node project in folder:<br/>
<code>npm init</code> (go through the steps)

Create a start script in package.json:<br/>
<code>nodemon ./app.js</code>

Create an app.js with router:<br/>
/app.js: <br/>
```javascript
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./main_router');

const app = express();

app.use(bodyParser.json());

app.use('/',router);

app.listen(3000, () => { console.log('API is running at http://localhost:3000')});
```

/main_router.js:<br/>
```javascript
const express = require('express');

var router = express.Router();

router.get('/', (req,res) => {
    res.send('Hello World');
});

module.exports = router;
```

## Packages we will be using
- express (<code>npm install -S express</code>)
- body-parser (<code>npm install -S body-parser</code>)
- nodemon (<code>npm install --save-dev nodemon</code>)