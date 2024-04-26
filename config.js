/**
 * Configuration Module for GoogleSync.js
 * This module handles the configuration settings and user interactions for authentication.
 */

const readline = require('readline');

const config = {
  // Function to prompt user to enter the authorization code
  getCodeFromUser: () => {
    return new Promise((resolve, reject) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      rl.question('Enter the authorization code here: ', (code) => {
        rl.close();
        resolve(code);
      });

      rl.on('close', () => {
        console.log('Authorization code received.');
      });

      rl.on('error', (error) => {
        console.error('Error while receiving authorization code:', error);
        reject(error);
      });
    });
  }
};

module.exports = config;
