const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const server = http.createServer();

server.on('request', (req, res) => {
  if (req.url === '/validate-python') {
    // todo parse formular1 fro request
    const formular = "(20000 if x <= 4 else 20000 + (x - 4) *5000 ";
    const tempPyFile = '/tmp/temp.py';

    fs.writeFile('/tmp/temp.py', formular, (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;
        // success case, the file was saved
        console.log('/tmp/temp.py');
    });

    const pySyntaxChecker = spawn('python', ['py_checker.py', tempPyFile], {capture: ['stdout', 'stderr']});

    pySyntaxChecker.stdout.on('data', (data) => {
      console.log(data);
      res.end('ok')
    });

    pySyntaxChecker.stderr.on('data', (data) => {
      console.log(data);
      res.end(data)
    });
  } else {
    res.end('Ok')
  }
});

server.listen(3000);
