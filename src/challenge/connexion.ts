import { Requests } from "./Requests";
import { SSH } from "./SSH";
import { readFileSync } from "fs";

export class Connexion {
  protected stderr: string = "";
  protected stdout: any[] = [];
  protected ip: string;
  protected user: string;
  protected db_user: string;
  protected db_pass: string;

  constructor(
    ip: string = "212.47.249.198",
    user: string = "challenge",
    db_user: string = "challenge",
    db_pass: string = "challenge"
  ) {
    this.ip = ip;
    this.user = user;
    this.db_user = db_user;
    this.db_pass = db_pass;
  }

  public async connect() {
    // Get challenge datas
    let challengeName: string = "challenge1";
    const challenge = JSON.parse(
      readFileSync(__dirname + "/challenges/" + challengeName + ".json", "utf8")
    ).data;
    // const queries: (string | any[])[] = Challenge.retrieveQueries(challenge);

    // Initialize connection
    const ssh = SSH;

    // Connect to the instance database via SSH2
    const sshConnect = ssh.Connect(this.ip, this.user, 22, this.db_user, this.db_pass);

    // Once connected accomplished :
    await sshConnect
      .then(() => {
        // Make any request to the instance database
        const connection = ssh.getConnection();
        // let data = Requests.getRequests(queries, connection);
        let data = Requests.checkRequests(challenge, connection);

        // Return the promise of request
        return data;
      })
      .then(data => {
        // Add request value to our datas[] table to store it
        // data.map(el => {
        //   this.stdout.push(el[0]);
        // });

        // Close the ssh tunnel - shut connection
        ssh.Close();
      });

    sshConnect.catch(err => {
      // Errors are gotten here when connection issues !
      this.stderr = err;
      // console.log(err);
    });
  }

  public async getStandard() {
    return this.stdout;
  }
}
