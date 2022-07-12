import { Requests } from "./Requests";
import { SSH } from "./SSH";
import { readFileSync } from "fs";
import { Challenge } from "./Challenge";

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
    return await sshConnect
      .then(async () => {
        // Make any request to the instance database
        const connection = ssh.getConnection();
        // let data = Requests.getRequests(queries, connection);
        const [data, points] = await Requests.checkRequests(challenge, connection);
        // Return the promise of request
        return data;
      })
      .then(data => {
        // Close the ssh tunnel - shut connection
        ssh.Close();
        return data;
      })
      .catch(err => {
      // Errors are gotten here when connection issues !
      this.stderr = err;
      return this.stderr;
      // console.log(err);
    });
  }
}
