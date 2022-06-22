const swaggerAutogen = require('swagger-autogen')();
 
const doc = {
 info: {
 title: 'Bucket List API',
 description: 'Individual 5-8 Activity',
 },
 host: process.env.PORT || "localhost:3000",
 schemes: ['http'],
};
 
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];
 
/* NOTE: if you use the express Router, you must pass in the
 'endpointsFiles' only the root file where the route starts,
 such as index.js, app.js, routes.js, ... */
 
swaggerAutogen(outputFile, endpointsFiles, doc);