const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const fs = require('fs');

const drive = require('./drive');
const sheets = require('./sheets');
const calendar = require('./calendar');
const errorHandler = require('./errorHandler');
const config = require('./config');

class GoogleSync {
  constructor(credentials) {
    this.auth = new OAuth2(
      credentials.clientId,
      credentials.clientSecret,
      credentials.redirectUri
    );

    // Initialize Google services with authenticated OAuth2 client
    this.drive = new drive(this.auth);
    this.sheets = new sheets(this.auth);
    this.calendar = new calendar(this.auth);
  }

  async authenticate(scopes) {
    try {
      // Generate a url that asks permissions for the scopes
      const url = this.auth.generateAuthUrl({
        access_type: 'offline',
        scope: scopes
      });

      console.log(`Authorize this app by visiting this url: ${url}`);

      // Wait for the user to provide the authorization code
      const code = await config.getCodeFromUser();

      // Get the access token from the authorization code
      const { tokens } = await this.auth.getToken(code);
      this.auth.setCredentials(tokens);

      console.log('Successfully authenticated');
    } catch (error) {
      errorHandler.handle(error);
    }
  }

  async syncFile(localPath, remotePath) {
    try {
      const content = fs.readFileSync(localPath, { encoding: 'utf8' });
      await this.drive.syncFile(content, remotePath);
      console.log('File synchronized successfully');
    } catch (error) {
      errorHandler.handle(error);
    }
  }
}

module.exports = GoogleSync;
