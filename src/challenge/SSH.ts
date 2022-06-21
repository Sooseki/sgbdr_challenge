import { Connection, createConnection } from 'mysql2/promise';
import { readFileSync } from 'fs';
import { Client } from 'ssh2';
import tunnel from 'tunnel-ssh';

export class SSH {

  protected static conn: Client = new Client();
  protected static result: any;

  static async Connect (ipAddress: string, userName: string, port: number, queries: string[]) {

    new Promise((resolve, reject) => {

      const tunnelConfig = {
        host: ipAddress,
        dstPort: port,
        username: userName,
        privateKey: readFileSync('./config/id_rsa')
      };

      const server = tunnel(tunnelConfig, (error: any, tnl: any) => {

        if (error) reject(error);

        this.conn.connect({
          host: ipAddress,
          port: port,
          username: userName,
          privateKey: readFileSync('./config/id_rsa')
        });

        this.conn.on('ready', () => {
          console.log('Client :: ready');

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
                tnl.close();
          
              }).stderr.on('data', (data: any) => {
                console.log('STDERR: ' + data);
          
              });

              const connection = await this.MysqlConnect(stream);
              
              // ADD logic to make requests to mysql 
              // this.result = await this.MysqlQueries(queries, connection);

              stream.end();
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

  static async Close() {
    this.conn.end();
  }

  static async MysqlConnect(stream: any) {
    return await createConnection({
      user: 'challenge',
      password: 'challenge',
      database: 'nutrition',
      port: 3306,
      stream: stream
    });
  }

  static async MysqlQueries(queries: string[], connection: Connection) {
    let response: any[] = [];

    queries.map(query => {
      const data = connection.query(query);  
      response.push(data);
    })

    return response;
  }
}