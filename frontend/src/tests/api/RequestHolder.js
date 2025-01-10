// @ts-check
import baseConfig from '../config/baseConfig';

export class RequestHolder {
  apiURL = baseConfig.API_URL;

  /**
   * @param {import("playwright-core").APIRequestContext} request
   */
  constructor(request) {
    this.request = request;
  }
}
