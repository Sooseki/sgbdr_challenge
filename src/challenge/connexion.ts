const { readFileSync } = require('fs');
const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');

  conn.shell((err, stream) => {
    stream.on('close', (code, signal) => {
      console.log('stream :: close\n', { code });
      conn.end();
    }).on('data', (data) => {
      console.log('STDOUT: ' + data);
    }).stderr.on('data', (data) => {
      console.log('STDERR: ' + data);
    });
    
    stream.write('docker exec -it mydbms_my-first-dbms_1 mysql -u challenge --password=challenge\n');
    stream.write('use nutrition;\n');
    stream.write('select * from User limit 10;\n');
    stream.write('exit;\n');

    stream.end('exit\n');
  })
  
}).connect({
  host: '212.47.249.198',
  port: 22,
  username: 'challenge',
  privateKey: readFileSync('./config/id_rsa')
});