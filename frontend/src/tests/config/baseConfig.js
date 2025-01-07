// @ts-check
import 'dotenv/config';

const baseConfig = {
  WEB_URL: process.env.REACT_APP_WEB_BASE_URL || 'http://localhost:3000',
  API_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api/v1',
  CUSTOMER_ROLE_ID: process.env.CUSTOMER_ROLE_ID || '665dbb3e62255420bc57dc95',
};

export default baseConfig;
