<<<<<<< HEAD
import { Requests } from "./Requests";
import { SSH } from "./SSH";
import { readFileSync } from 'fs';
import { Challenge } from "./Challenge";

// Get challenge datas
let challengename: string = 'challenge1';
const challenge = JSON.parse(readFileSync(__dirname + '/challenges/' + challengename + '.json', 'utf8')).data;
const queries: string[] = Challenge.retrieveQueries(challenge);

// Initialize returnal values
let stdout: any[] = [];
let stderr = '';

// Initialize connection
const ssh = SSH;

// Connect to the instance database via SSH2
const sshConnect = ssh.Connect(
  '212.47.249.198', 
  'challenge', 
  22, 
  'challenge', 
  'challenge'
);

// Once connected accomplished :
sshConnect.then(() => {

  // Make any request to the instance databse 
  const connection = ssh.getConnection();
  let data = Requests.getRequests(queries, connection);

  // Return the promise of request 
  return data;

}).then((data) => {

  // Add request value to our datas[] table to store it
  data.map((el) => {
    stdout.push(el[0])
  })

  // Close the ssh tunnel - shut connection
  ssh.Close();

});

sshConnect.catch((err) => {
  // Errors are getted here when connection issues !
  stderr = err;
  // console.log(err);
})
=======
// const { readFileSync } = require('fs');

// const { Client } = require('ssh2');

// const conn = new Client();
// conn.on('ready', () => {
//   console.log('Client :: ready');
//   conn.exec('uptime', (err, stream) => {
//     if (err) throw err;
//     stream.on('close', (code, signal) => {
//       console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
//       conn.end();
//     }).on('data', (data) => {
//       console.log('STDOUT: ' + data);
//     }).stderr.on('data', (data) => {
//       console.log('STDERR: ' + data);
//     });
//   });
// }).connect({
//   host: '212.47.249.198',
//   port: 22,
//   studentname: 'challenge',
//   privateKey: readFileSync('./config/id_rsa')
// });
>>>>>>> origin/alex
