import { readFileSync } from 'fs';
import { Connection, createConnection } from 'mysql2/promise';
import { Client } from 'ssh2';
import tunnel from 'tunnel-ssh';

export class SSH {

  protected static conn: Client = new Client();
  protected static result: any;
  protected static stream: any;
  protected static connection: Connection;
  protected static tnl: any;

  static async Connect (ipAddress: string, userName: string, port: number) {

    return new Promise((resolve, reject) => {

      const tunnelConfig = {
        host: ipAddress,
        dstPort: port,
        username: userName,
        privateKey: readFileSync('./config/id_rsa')
      };

      const server = tunnel(tunnelConfig, (error: any, tnl: any) => {

        this.tnl = tnl;

        if (error) {
          reject(error);
          this.tnl.close();
        };

        this.conn.connect({
          host: ipAddress,
          port: port,
          username: userName,
          privateKey: readFileSync('./config/id_rsa')
        });

        this.conn.on('ready', () => {

          this.conn.forwardOut(
            '127.0.0.1',
            12345,
            '127.0.0.1',
            3309,
            async (err: any, stream: any) => {

              if (err) reject(err);
              
              stream.on('close', (code: any, signal: any) => {
                console.log('stream :: close\n', { code });
                this.conn.end();
                this.tnl.close();
          
              }).stderr.on('data', (data: any) => {
                console.log('STDERR: ' + data);
          
              });

              this.stream = stream;
              this.connection = await this.MysqlConnect();

              resolve(this.connection);
            }
          );
            
        });
      });

      server.on('error', (err: any) => {
        reject(err)
      })

    }).catch((err: any) => {
      console.log(err);
    })
  }

  static async MysqlConnect() {
    return createConnection({
      user: 'challenge',
      password: 'challenge',
      database: 'nutrition',
      port: 3306,
      stream: this.stream
    });
  }

  static Close() {
    this.stream.end();
    this.conn.end();
    this.tnl.close();
  }

  static getConnection() {
    return this.connection;
  }
}