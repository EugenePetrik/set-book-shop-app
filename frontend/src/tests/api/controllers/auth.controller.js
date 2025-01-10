// @ts-check
import { RequestHolder } from '../RequestHolder';

export class AuthController extends RequestHolder {
  /**
   * @param {string} email
   * @param {string} password
   */
  async login(email, password) {
    const response = await this.request.post(`${this.apiURL}/auth/login`, {
      data: {
        email,
        password,
      },
    });

    return response.json();
  }

  /**
   * @typedef {Object} RegisterUserData
   * @property {string} name - The user's name.
   * @property {string} email - The user's email address.
   * @property {string} phone - The user's phone number.
   * @property {string} address - The user's address.
   * @property {string} login - The user's login username.
   * @property {string} password - The user's password.
   * @property {string} role - The user's role in the system.
   */

  /**
   * Registers a new user with the provided data.
   *
   * @param {RegisterUserData} data - The user data for registration.
   * @returns {Promise<Object>} The response from the registration request.
   */
  async registerUser(data) {
    const response = await this.request.post(`${this.apiURL}/auth/register`, {
      data,
    });

    return response.json();
  }

  /**
   * @param {string} token
   */
  async getUser(token) {
    const response = await this.request.get(`${this.apiURL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  }
}
