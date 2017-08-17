# Playground: Critical CSS served via HTTP/2 from Node.js


## Setup
First you need to clone the repo and install it's dependencies
```
git clone git@github.com:branneman/playground-nodejs-http2-criticalcss.git
cd playground-nodejs-http2-criticalcss
npm install
```

Secondly you'll need to generate a self-signed SSL certificate with OpenSSL (you'll need to provide some dummy details):
```
mkdir cert
openssl req -x509 -newkey rsa:4096 -keyout cert/key.pem -out cert/cert.pem -days 365 -nodes
```

Lastly you can start your server:
```
npm start
```

And then point your browser to: https://localhost:8443/

Since the SSL certificate is self-signed, your browser probably won't trust it by default. If you don't expose your
server to anything other than local machine, you can safely create an exception for the site.


## Implementation
See:

- [/app/areas/shared/layout.njk](/app/areas/shared/layout.njk)
- [/app/areas/homepage/homepage.js](/app/areas/homepage/homepage.js)
- [/app.js](/app.js)
