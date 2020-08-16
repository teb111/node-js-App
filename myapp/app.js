const fs = require('fs');
const http = require ('http');
const { parse } = require('querystring');


const server = http.createServer((req, res) => {

    if(req.method === "POST") {
        userData(req, data => {
            console.log(data);
            
            res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Write File</title>
                <style>
                body{
                    margin: 0;
                    padding: 0;
                    background: rgb(3, 25, 25);
                }

                h1 {
                    margin: 0 auto;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 100px;
                }
            </style>
            </head>
            <body>
            <h1> Thank You ${data.name} </h1>
            </body>
            </html>
            `);
            const content = `My name is ${data.name}, I am ${data.job}`;

            fs.writeFile(`./${data.name}.txt`, content, {flag: 'a+'}, err => {
                if(err) {
                    throw new Error;
                }
            })

            
        });
    } else {
    
    res.end(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Write File</title>
        
    <style>
        body{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-size: 20px;
            background: chocolate;
        }
    
        form{
            margin-top: 200px;
            display: grid;
            justify-content: center;
            align-items: center;
        }
    
        form input {
            width: 300px;
            padding: 10px;
            box-shadow: none;
        }
    </style>
    </head>
    
    
    <body>
        <form action="/" method="post">
            <label for="name">Name</label>
                <input type="text" name="name">
            
    
            <label for="job">Job</label>
                <input type="text" name="job">
            
                <div>
                    <button>Submit</button>
                </div>
        </form>
    </body>
    
    </html>
    `)

    }
});

server.listen(3000, '127.0.0.1');
console.log(`Copy this link to your Clipboard and paste in the browser ==> http://127.0.0.1:3000/`);


function userData(req, func) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';    if(req.headers['content-type'] === FORM_URLENCODED) {
       let data = '';
        req.on('data', inputs => {
            data += inputs.toString();
        })
        req.on('end', () => {
            func(parse(data));
        })
    }
    else {
        func(null);
    }
}

