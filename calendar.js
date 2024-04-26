const { google } = require('googleapis');

class Calendar {
  constructor(auth) {
    this.calendar = google.calendar({ version: 'v3', auth });
  }

  /**
   * List the next 10 events on the user's calendar.
   */
  async listEvents() {
    try {
      const response = await this.calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      });

      const events = response.data.items;
      if (events.length) {
        console.log('Upcoming 10 events:');
        events.map((event, i) => {
          const start = event.start.dateTime || event.start.date;
          console.log(`${start} - ${event.summary}`);
        });
      } else {
        console.log('No upcoming events found.');
      }
    } catch (error) {
      errorHandler.handle(error);
    }
  }

  /**
   * Insert a new event into the calendar.
   * @param {Object} eventDetails - The details of the event to insert.
   */
  async insertEvent(eventDetails) {
    try {
      const event = {
        summary: eventDetails.summary,
        location: eventDetails.location,
        description: eventDetails.description,
        start: {
          dateTime: eventDetails.startDateTime,
          timeZone: 'America/Los_Angeles',
        },
        end: {
          dateTime: eventDetails.endDateTime,
          timeZone: 'America/Los_Angeles',
        },
      };

      const response = await this.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
      });

      console.log('Event created: %s', response.data.htmlLink);
    } catch (error) {
      errorHandler.handle(error);
    }
  }

  /**
   * Delete an event from the calendar.
   * @param {string} eventId - The ID of the event to delete.
   */
  async deleteEvent(eventId) {
    try {
      await this.calendar.events.delete({
        calendarId: 'primary',
        eventId: eventId,
      });

      console.log('Event deleted.');
    } catch (error) {
      errorHandler.handle(error);
    }
  }
}

module.exports = Calendar;
