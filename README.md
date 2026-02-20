# YouTube Focus Mode – Chrome Extension (Manifest V3)

YouTube Focus Mode is a productivity-enhancing Chrome Extension designed to convert YouTube into a distraction-free learning environment.

The extension hides recommended videos, comments, and sidebar suggestions during active focus sessions and integrates an interactive clock-based timer with full session control (Start, Pause, Resume, Stop).

---

## Screenshots

![Focus Mode Interface](Screenshot%202026-02-20%20112849.png)
Main focus mode interface with distraction removal

![Clock Timer UI](Screenshot%202026-02-20%20113521.png)
Interactive clock-based time selection

![Active Session](Screenshot%202026-02-20%20112833.png)
Active focus session with real-time countdown

![Break Workflow](Screenshot%202026-02-19%20225053.png)
Break and post-session workflow options

---

## Overview

YouTube Focus Mode helps users maintain deep concentration while consuming educational content on YouTube. It removes distracting page elements during structured focus sessions and manages time using a persistent background timer engine.

The extension is built using Chrome Extension Manifest V3 architecture and demonstrates real-world browser API integration, asynchronous communication, and state synchronization.

---

## Core Features

### Focus Mode

- Hides sidebar recommendations
- Hides related videos
- Hides comment section
- Dynamically injects and removes styles
- Automatically restores layout after session ends

### Interactive Clock-Based Timer

- Visual circular time selection interface
- Start functionality
- Pause functionality
- Resume functionality
- Stop functionality
- Real-time MM:SS countdown display
- Timer continues running even if popup is closed

### Structured Focus–Break Workflow

- Pomodoro-inspired workflow
- Post-session overlay with restart and break options
- Floating break timer displayed on page
- Independent break timer logic
- Restart previous session option

### Background Timer Engine

- Runs inside Manifest V3 service worker
- Maintains persistent state using chrome.storage.local
- Handles lifecycle-aware time calculations
- Sends state updates to popup and content script
- Triggers completion notifications

---

## Architecture

The extension follows a three-layer architecture:

### Background (Service Worker)

- Manages focus and break timers
- Maintains session state
- Handles notifications
- Persists timing data

### Popup Layer

- Provides interactive UI
- Displays real-time countdown
- Sends control commands
- Retrieves state from storage

### Content Script Layer

- Injects focus mode styles
- Manipulates YouTube DOM
- Displays overlay popups
- Renders floating break timer
- Listens for storage changes

---

## Technologies Used

- Chrome Extension Manifest V3
- JavaScript (Event-driven architecture)
- Service Workers
- Chrome Storage API
- Chrome Runtime Messaging
- Chrome Notifications API
- DOM Manipulation and Style Injection
- Asynchronous Event Handling

---

## Technical Challenges Solved

- Service worker lifecycle resets in Manifest V3
- Asynchronous runtime messaging synchronization
- Cross-context state consistency (popup, background, content script)
- Timer persistence across popup closure
- Dynamic DOM injection on frequently updated YouTube pages
- Notification permission and resource handling

---

## Installation (Manual)

1. Clone the repository:

   ```bash
   git clone https://github.com/PetaSravankumar/youtube-focuse.git
   ```

2. Open Chrome and navigate to:

   ```
   chrome://extensions/
   ```

3. Enable Developer Mode.
4. Click "Load unpacked".
5. Select the project folder.

The extension will now be installed locally.

---

## Usage

1. Open YouTube.
2. Click the extension icon.
3. Select focus duration using the clock.
4. Click Start.
5. Use Pause, Resume, or Stop as needed.
6. When session completes, choose Break, Restart, or Quit.

---

## Professional Value

This project demonstrates:

- Chrome Extension development using Manifest V3
- Background service worker lifecycle handling
- Real-time state synchronization
- Event-driven system architecture
- Cross-context messaging
- Production-level debugging and browser API integration

It reflects practical frontend engineering combined with browser-level application design.

---

## Future Enhancements

- Custom focus and break duration settings
- Focus analytics dashboard
- Daily productivity tracking
- Sound alerts
- Automatic Pomodoro cycling
- Theme customization

---

## Author

Peta Sravan Kumar  
B.Tech – Artificial Intelligence and Data Science  

---

## License

This project is open-source and available under the MIT License.
