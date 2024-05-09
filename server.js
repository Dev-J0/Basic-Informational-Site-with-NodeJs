import http from 'http';
import fs from 'fs/promises';
import url from 'url';
import path from 'path';
const PORT = 8080;

//get current path

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__filename, __dirname);
// Method to create server
const server = http.createServer((async(req, res) => {
   // res.setHeader('Content-Type', 'text/html');
    //changing status from active to 404
   // res.statusCode = 404;

   try {
    //check if GET request 
    if(req.method === 'GET') {
        let filePath;
        if(req.url === '/') {
            filePath = path.join(__dirname, 'public', 'index.html')
           } else if (req.url === '/about') {
            filePath = path.join(__dirname, 'public', 'about.html')

           } else if (req.url === '/contact') {
            filePath = path.join(__dirname, 'public', 'contact.html')
          
        } else {
            throw new Error ('not found')
           }
        
           const data = await fs.readFile(filePath);
           res.setHeader('Content-Type', 'text/html');
           res.write(data);
           res.end();
    } else {
        throw new Error('Method not allowed')
    }
} catch (error) {
    res.writeHead(500, {'Content-Type' : 'text/plain' })
            res.end('Server Error');
        
    
}

   
   // console.log(req.url);
//    console.log(req.method);
  
}));



server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


//npm i -D_nodemon  ->>>> installs node_modules as a dev 

// DO NOT push to git node_modules directory (delet folder before commiting, run npm install it will automatically install back because  of the package json)

//so create .gitignore file