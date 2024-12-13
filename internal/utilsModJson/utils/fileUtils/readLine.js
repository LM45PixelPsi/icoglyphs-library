const fs = require("fs").promises;
const readline = require("readline");

// Create a readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false, // Disables the terminal's automatic echo
});

// Function to properly close readline
function closeReadLine() {
  if (!rl.closed) {
    rl.close();
  }
}

module.exports = { rl, closeReadLine };
