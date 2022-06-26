const swaggerAutogen = require('swagger-autogen')();

 const doc = process.env.PORT ? {
 info: {
 title: 'Bucket List API',
 description: 'Individual 5-8 Activity',
 },
 host: process.env.PORT,
 schemes: ['https'],
} :
{
  info: {
  title: 'Bucket List API',
  description: 'Individual 5-8 Activity',
  },
  host: "localhost:3000",
  schemes: ['http'],
};

console.log("STARTING SWAGGER AUTO GEN: doc: ", doc);

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];
 
/* NOTE: if you use the express Router, you must pass in the
 'endpointsFiles' only the root file where the route starts,
 such as index.js, app.js, routes.js, ... */
 
swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
  await import('./app.js'); // Your project's root file
});