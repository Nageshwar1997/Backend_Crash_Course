# Middlewares [Read More](https://expressjs.com/en/resources/middleware.html)

## Global Middlewares

### Body Parser: To parse the incoming request bodies (like JSON or URL-encoded data).
#### Although body-parser used to be part of Express and is now included via express.json() and express.urlencoded(), it’s still often used as a separate package. It helps parse incoming request bodies in various formats, including JSON, URL-encoded data, and raw data.
##### `npm install body-parser`

```javascript
const express = require('express');
const app = express();

app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded requests
```

### CORS Middleware: For enabling Cross-Origin Resource Sharing (CORS).
#### Cors middleware is used to allow or restrict resources from being requested from another domain, which is critical for web APIs that might serve different frontend applications hosted on other domains.
##### `npm install cors`

```javascript
const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors()); // Enable CORS for all routes by default

// Example for enabling CORS for specific domains
app.use(cors({
    origin: ['http://example.com', 'http://anotherdomain.com']
}));
```

### Custom Authentication Middleware: To check user authentication for every request.
````javascript
app.use((req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send('Unauthorized');
    }
    next();
});
````

### Error Handling Middleware: To handle errors that occur during request processing.
````javascript
app.use((err, req, res, next) => {
    res.status(500).send({ error: err.message });
});
````


## Custom Middlewares

### Request Time Logger
#### This middleware logs the time when a request was made.
````javascript
const express = require('express');
const app = express();

// Custom middleware to log request time
const requestTimeLogger = (req, res, next) => {
    req.requestTime = new Date().toISOString(); // Attach request time to the req object
    console.log(`Request received at: ${req.requestTime}`);
    next(); // Pass control to the next middleware
};

app.use(requestTimeLogger); // Apply middleware globally

app.get('/', (req, res) => {
    res.send(`Hello! Request received at: ${req.requestTime}`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
````

### IP Logger
#### This middleware logs the IP address of the client making the request.
````javascript
const ipLogger = (req, res, next) => {
    const ipAddress = req.ip || req.connection.remoteAddress; // Get client IP address
    console.log(`Client IP: ${ipAddress}`);
    next();
};

app.use(ipLogger); // Apply this middleware globally
````

### Authentication Middleware
#### This custom middleware checks if a request has a valid authentication token.
````javascript
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']; // Get the token from headers

    if (!token) {
        return res.status(403).send('Access Denied. No token provided.');
    }

    // Example token check (you might use JWT or another token mechanism)
    if (token === 'valid-token') {
        next(); // Token is valid, continue to the next middleware/route handler
    } else {
        return res.status(401).send('Invalid token');
    }
};

// Apply middleware to a specific route
app.get('/protected', authMiddleware, (req, res) => {
    res.send('You have accessed a protected route!');
});
````

### Request Logger
#### Logs the HTTP method and URL of incoming requests.
````javascript
const requestLogger = (req, res, next) => {
    console.log(`Request Method: ${req.method}, URL: ${req.url}`);
    next();
};

app.use(requestLogger); // Apply this globally
````

### Rate Limiter
#### This middleware limits the number of requests a user can make within a time period.
````javascript
const rateLimit = (limit, windowMs) => {
    let requestCounts = {};

    return (req, res, next) => {
        const userIP = req.ip;

        // Check if user has made any requests within the time window
        if (!requestCounts[userIP]) {
            requestCounts[userIP] = { count: 1, startTime: Date.now() };
        } else {
            requestCounts[userIP].count++;

            const elapsedTime = Date.now() - requestCounts[userIP].startTime;

            // Reset counter if time window has passed
            if (elapsedTime > windowMs) {
                requestCounts[userIP] = { count: 1, startTime: Date.now() };
            }

            // Block the user if request count exceeds the limit
            if (requestCounts[userIP].count > limit) {
                return res.status(429).send('Too many requests. Please try again later.');
            }
        }

        next();
    };
};

// Apply rate limit middleware to all routes with limit 5 requests per minute
app.use(rateLimit(5, 60 * 1000));
````

### Maintenance Mode Middleware
#### This middleware allows you to enable a "maintenance mode" for the application.
````javascript
let maintenanceMode = false; // Toggle this to true to enable maintenance mode

const maintenanceMiddleware = (req, res, next) => {
    if (maintenanceMode) {
        res.status(503).send('The site is currently under maintenance. Please try again later.');
    } else {
        next(); // Pass control to the next middleware if not in maintenance mode
    }
};

app.use(maintenanceMiddleware); // Apply globally

// You can create an admin route to toggle maintenance mode (for example)
app.post('/admin/maintenance', (req, res) => {
    maintenanceMode = !maintenanceMode;
    res.send(`Maintenance mode is now ${maintenanceMode ? 'enabled' : 'disabled'}`);
});
````


## Inbuilt Middlewares

### express.json()
#### This middleware parses incoming requests with JSON payloads. It is used to automatically parse the `application/json` content-type in the request body and attach it to `req.body`.
````javascript
const express = require('express');
const app = express();

app.use(express.json()); // Parse JSON bodies

app.post('/data', (req, res) => {
    console.log(req.body); // Access the parsed JSON body
    res.send('Data received');
});

app.listen(3000);
````

### express.urlencoded()
#### This middleware parses incoming requests with URL-encoded payloads. It is typically used to parse form data submitted via HTTP POST with the `application/x-www-form-urlencoded` content-type.
```javascript
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.post('/form', (req, res) => {
    console.log(req.body); // Access the parsed form data
    res.send('Form submitted');
});
```

### express.static()
#### This middleware is used to serve static files such as HTML, CSS, JavaScript, images, etc. It allows you to specify a directory that contains static resources for the application.
```javascript
app.use(express.static('public')); // Serve files from the "public" directory

// Now you can access files in the "public" folder via the URL.
```

### express.text()
#### This middleware parses incoming requests with plain text payloads (`text/plain` content-type). It makes the raw text available on `req.body`.
```javascript
app.use(express.text());

app.post('/text', (req, res) => {
    console.log(req.body); // Access raw text
    res.send('Text received');
});
```

### express.raw()
#### This middleware parses incoming requests with raw buffer data, which is useful for handling binary data such as file uploads. It makes the raw binary data available in `req.body` as a Buffer object.
```javascript
app.use(express.raw({ type: 'application/octet-stream' }));

app.post('/upload', (req, res) => {
    console.log(req.body); // Access the raw binary data
    res.send('File uploaded');
});
```

### express.Router()
#### This is not exactly middleware but a routing mechanism that allows you to create modular, mountable route handlers. You can think of routers as "mini-apps" that contain middleware and route definitions.
```javascript
const router = express.Router();

router.use((req, res, next) => {
    console.log('Router-level middleware');
    next();
});

router.get('/info', (req, res) => {
    res.send('Router info');
});

app.use('/api', router); // Mount router on the "/api" path
```



## Custom Middlewares

### Route-Specific Middleware Example
#### In this example, we have a custom authentication middleware that is applied only to the `/dashboard` route. Any user trying to access this route must pass through the authentication check.
```javascript
const express = require('express');
const app = express();

// Custom middleware for authentication
const checkAuth = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token === 'valid-token') {
        next(); // Proceed to the route handler if authenticated
    } else {
        res.status(403).send('Access Denied. Invalid token.');
    }
};

// Route-specific middleware applied to '/dashboard'
app.get('/dashboard', checkAuth, (req, res) => {
    res.send('Welcome to the dashboard!');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```
#### Here, `checkAuth` middleware is applied only to the `/dashboard` route, ensuring the user is authenticated before they can access it.

### Applying Multiple Middlewares to a Route
#### You can apply more than one middleware function to a single route. For example, you can have a logging middleware and an authentication middleware applied to the same route.
```javascript
const logRequest = (req, res, next) => {
    console.log(`Received request for ${req.url} at ${new Date()}`);
    next();
};

const checkAuth = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token === 'valid-token') {
        next();
    } else {
        res.status(403).send('Unauthorized');
    }
};

// Multiple middlewares for '/profile' route
app.get('/profile', logRequest, checkAuth, (req, res) => {
    res.send('Welcome to your profile');
});
```
#### In this case, both `logRequest` and `checkAuth` will be executed sequentially before the route handler for `/profile`.

### Middleware for Specific HTTP Methods
#### You can apply middleware to routes that use specific HTTP methods like `GET`, `POST`, `PUT`, `DELETE`, etc.
```javascript
const validateData = (req, res, next) => {
    if (req.body && req.body.name) {
        next(); // Data is valid, proceed
    } else {
        res.status(400).send('Invalid data');
    }
};

// Middleware applied only to POST requests on '/submit'
app.post('/submit', validateData, (req, res) => {
    res.send('Data submitted successfully');
});
```
#### Here, `validateData` middleware is only applied to POST requests on the `/submit` route.

### Route Grouping with Routers (Router-Level Middleware)
#### You can also group routes together and apply middleware to the entire group using `express.Router()`.
```javascript
const router = express.Router();

// Middleware for all routes in this router
router.use((req, res, next) => {
    console.log('Request received for API route');
    next();
});

// Apply the router to a specific path
router.get('/info', (req, res) => {
    res.send('API Info');
});

router.post('/data', (req, res) => {
    res.send('API Data');
});

app.use('/api', router); // All routes in the router will have the middleware applied
```
#### In this example, any request to `/api/*` will go through the `router.use()` middleware before reaching its route handler.

### Middleware for Parameterized Routes
#### Express allows middleware to run only when specific route parameters are matched.
```javascript
// Middleware for routes with 'userId' parameter
app.param('userId', (req, res, next, userId) => {
    console.log(`User ID: ${userId}`);
    next();
});

// Route that uses the userId parameter
app.get('/user/:userId', (req, res) => {
    res.send(`User Profile for ID: ${req.params.userId}`);
});
```
#### Here, the middleware is only triggered when a route contains the `userId` parameter.



## Third-Party Middlewares

### Morgan – HTTP Request Logger
#### Morgan is a popular middleware used to log HTTP requests in your application. It provides predefined logging formats, as well as the ability to create custom logging formats.
##### `npm install morgan`

```javascript
const morgan = require('morgan');
const express = require('express');
const app = express();

app.use(morgan('dev')); // Logs request details
```

### Helmet – Security Middleware
#### Helmet helps secure Express applications by setting various HTTP headers that protect against common vulnerabilities (e.g., XSS, clickjacking, etc.).
##### `npm install helmet`

```javascript
const helmet = require('helmet');
const express = require('express');
const app = express();

app.use(helmet()); // Adds security-related headers
```
#### Headers added by Helmet:
* `Strict-Transport-Security`
* `X-Content-Type-Options`
* `X-Frame-Options`
* `X-XSS-Protection`

### Express-Session – Session Management
#### Express-Session is used to create and manage user sessions, which are necessary for features like authentication and storing user-specific data between requests.
##### `npm install express-session`

```javascript
const session = require('express-session');
const express = require('express');
const app = express();

app.use(session({
  secret: 'your-secret-key', // Secret for session encryption
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set secure to true if using HTTPS
}));

app.get('/', (req, res) => {
  req.session.user = 'John Doe';
  res.send('Session Set');
});
```

### Cookie-Parser – Parse Cookie Header
#### Cookie-Parser is used to parse cookies attached to client requests, making them easily accessible via `req.cookies`.
##### `npm install cookie-parser`

```javascript
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

app.use(cookieParser()); // Parse cookies

app.get('/', (req, res) => {
  console.log(req.cookies); // Access cookies sent by the client
  res.send('Cookies parsed');
});
```

### Compression – Gzip Compression
#### Compression middleware is used to compress response bodies, improving the speed of the app by reducing the size of the response sent to the client.
##### `npm install compression`

```javascript
const compression = require('compression');
const express = require('express');
const app = express();

app.use(compression()); // Enable response compression
```