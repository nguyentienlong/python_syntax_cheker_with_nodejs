const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

const server = http.createServer();

server.on('request', (req, res) => {
  if (req.url === '/validate-python') {
    // todo parse formular1 fro request
    const validFormular = "(20000 if x <= 4 else 20000 + (x - 4) *5000 ";

    // formular2 = '(20000 if x <= 4 else 20000 + (x - 4) *5000)';
    const tempPyFile = '/tmp/temp.py';

    fs.writeFile('/tmp/temp.py', validFormular, (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;
        // success case, the file was saved
        console.log('/tmp/temp.py');
    });


    const pep8Checker = spawn('python', ['py_checker.py', tempPyFile], {capture: ['stdout', 'stderr']});

    pep8Checker.stdout.on('data', (data) => {
      console.log(data);
      res.end('ok')
    });

    pep8Checker.stderr.on('data', (data) => {
      console.log(data);
      res.end(data)
    });
  } else {
    res.end('Ok')
  }
});

server.listen(3000);
