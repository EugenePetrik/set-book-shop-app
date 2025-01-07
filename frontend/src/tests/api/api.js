// @ts-check
import { AuthController } from './controllers/auth.controller';
import { RequestHolder } from './RequestHolder';

export class API extends RequestHolder {
  auth = new AuthController(this.request);
}
