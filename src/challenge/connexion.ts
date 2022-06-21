import { SSH } from "./SSH";

const ssh = SSH;
const queries = [
  'SELECT id FROM Repas',
  'SELECT id FROM Emotions'
]
ssh.Connect('212.47.249.198', 'challenge', 22, queries);

// ssh.Close();
