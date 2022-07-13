import { readFileSync } from 'fs';
import { Connection, createConnection } from 'mysql2/promise';
import { Client } from 'ssh2';

export class SSH {

  protected static conn: Client = new Client();
  protected static result: any;
  protected static stream: any;
  protected static connection: Connection;
  protected static connectionError: Error | null = null;

  static async Connect 
  (
    ipAddress: string, 
    sshUser: string, 
    sshPort: number, 
    sqlUser: string,
    sqlPass: string
  ) 
  {

    return await new Promise((resolve, reject) => {

        this.conn.connect({
          host: ipAddress,
          port: sshPort,
          username: sshUser,
          privateKey: readFileSync('./config/id_rsa')
        });

        this.conn.on('ready', () => {

          this.conn.forwardOut(
            '127.0.0.1',
            12345,
            '127.0.0.1',
            3309,
            async (err: any, stream: any) => {

              if (err) {
                // 'Error: (SSH) Channel open failure: Connection refused' - wrong sql port
                reject(err);
                return;
              };
              
              stream.on('close', (code: any, signal: any) => {
                console.log('stream :: close\n', { code });
                this.conn.end();
          
              }).stderr.on('data', (data: any) => {
                console.log('STDERR: ' + data);
          
              });

              this.stream = stream;
              let connection = await this.MysqlConnect(sqlUser, sqlPass);

              if (this.connectionError != null) { 
                reject(this.connectionError);
              } else {
                this.connection = connection;
                resolve(this.connection)
              }
            }
          );
            
        }).on('error', (err: Error) => {
          // 'Timed out while waiting for handshake' - instance shut
          // 'Timed out while waiting for handshake' - wrong ip
          // 'All configured authentication methods failed' - wrong user
          reject(err);
          return;
        });

    })
  }

  static async MysqlConnect(sqlUser: string, sqlPass: string) {
    return await createConnection({
      user: sqlUser,
      password: sqlPass,
      database: 'nutrition',
      port: 3306,
      stream: this.stream
    }).catch(err => {
      // 'Error: Access denied for user 'challenger'@'172.18.0.1' (using password: YES)' - wrong user / password
      this.connectionError = err;
      return err;
    });
  }

  static Close() {
    this.stream.end();
    this.conn.end();
  }

  static getConnection() {
    return this.connection;
  }
}