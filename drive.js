const { google } = require('googleapis');
const errorHandler = require('./errorHandler');

class Drive {
  constructor(auth) {
    this.driveService = google.drive({ version: 'v3', auth });
  }

  async syncFile(localContent, remotePath) {
    try {
      // Search for the file by name in the user's drive
      const list = await this.driveService.files.list({
        q: `name='${remotePath}'`,
        fields: 'files(id)'
      });

      if (list.data.files.length > 0) {
        // File exists, update it
        const fileId = list.data.files[0].id;
        await this.driveService.files.update({
          fileId: fileId,
          media: {
            mimeType: 'application/json',
            body: localContent
          }
        });
      } else {
        // File does not exist, create new file
        await this.driveService.files.create({
          resource: {
            name: remotePath,
            mimeType: 'application/json'
          },
          media: {
            mimeType: 'application/json',
            body: localContent
          }
        });
      }

      console.log('Drive synchronization complete.');
    } catch (error) {
      errorHandler.handle(error);
    }
  }
}

module.exports = Drive;
