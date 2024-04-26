const { google } = require('googleapis');

class Sheets {
  constructor(auth) {
    this.sheetsService = google.sheets({ version: 'v4', auth });
  }

  async syncSheet(localData, spreadsheetId, range) {
    try {
      const response = await this.sheetsService.spreadsheets.values.update({
        spreadsheetId: spreadsheetId,
        range: range,
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: localData
        },
      });
      console.log('Sheet updated successfully:', response.data);
    } catch (error) {
      console.error('Failed to update sheet:', error);
    }
  }

  async retrieveSheetData(spreadsheetId, range) {
    try {
      const response = await this.sheetsService.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: range,
      });
      console.log('Data retrieved successfully:', response.data);
      return response.data.values;
    } catch (error) {
      console.error('Failed to retrieve data:', error);
      return null;
    }
  }
}

module.exports = Sheets;
