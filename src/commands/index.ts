// Weird, when doing "export * from './Ping'" and etc. and then importing with "import * as commandFiles from './commands'"
// the result is an empty object.
import Ping from './Ping';
import Pong from './Pong';

export default [Ping, Pong];
