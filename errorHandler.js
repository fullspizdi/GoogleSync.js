/**
 * Error Handler Module for GoogleSync.js
 * This module provides a centralized error handling mechanism for the GoogleSync application.
 */

class ErrorHandler {
  /**
   * Handles errors by logging them to the console and optionally rethrowing them.
   * @param {Error} error - The error object to handle.
   * @param {boolean} rethrow - Whether to rethrow the error after handling.
   */
  handle(error, rethrow = false) {
    console.error('Error occurred:', error);

    // Optionally rethrow the error for further handling
    if (rethrow) {
      throw error;
    }
  }
}

module.exports = new ErrorHandler();
