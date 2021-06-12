const fs = require('fs');
 // import { writeFile } from 'fs'; if you are using a typescript file

require('dotenv').config();

const environmentFile = `export const environment = {
  googleMapsApiKey: "${process.env.GOOGLE_MAPS_API_KEY}",
  production: ${process.env.GOOGLE_MAPS_API_KEY == 'production'},
};
`;

// Generate environment.ts file
fs.writeFile('./src/environments/environment.ts', environmentFile, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(`Angular environment.ts file generated`);
  }
});


/*
Run npm node set-env.js (or c) to generate your file  
*/