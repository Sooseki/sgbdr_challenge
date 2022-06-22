import { Requests } from "./Requests";
import { SSH } from "./SSH";
import { readFileSync } from 'fs';
import { Challenge } from "./Challenge";

// Get challenge datas
let challengename: string = 'challenge1';
const challenge = JSON.parse(readFileSync(__dirname + '/challenges/' + challengename + '.json', 'utf8')).data;
const queries: string[] = Challenge.retrieveQueries(challenge);

// Initialize connection
const ssh = SSH;
const datas: any[] = [];

// Connect to the instance database via SSH2
const sshConnect = ssh.Connect('212.47.249.198', 'challenge', 22);

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
    datas.push(el[0])
  })

  // Close the ssh tunnel - shut connection
  ssh.Close();
});
