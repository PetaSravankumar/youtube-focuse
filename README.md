<img width="596" height="223" alt="Screenshot 2026-02-20 113521" src="https://github.com/user-attachments/assets/b3d896bd-1167-4d71-9d22-ad393153f31b" />
<img width="479" height="153" alt="Screenshot 2026-02-20 112849" src="https://github.com/user-attachments/assets/e5e4c79a-0322-4f60-a863-88ff64f33cf7" />
<img width="1888" height="897" alt="Screenshot 2026-02-20 112833" src="https://github.com/user-attachments/assets/46a07e6a-f0d1-4f98-a0e9-2cfc1e7ba2c2" />
<img width="359" height="475" alt="Screenshot 2026-02-19 225053" src="https://github.com/user-attachments/assets/81e1a5d0-7aca-4260-85e5-fd776150fd8e" />
<img width="1903" height="975" alt="Screenshot 2026-02-19 225042" src="https://github.com/user-attachments/assets/6e6c7511-0b09-4458-a768-02c772bcc2f3" />
<img width="1920" height="1080" alt="Screenshot 2026-02-19 221812" src="https://github.com/user-attachments/assets/af54360a-1978-49db-850e-7fc6fa2ff4b3" />
<img width="1920" height="1080" alt="Screenshot 2026-02-19 221805" src="https://github.com/user-attachments/assets/519ae771-b16d-4b5e-821b-4b407be84ccf" />
<img width="1920" height="1080" alt="Screenshot 2026-02-19 221747" src="https://github.com/user-attachments/assets/482c06c8-8b1a-490a-bc27-9f04a8dfa948" />
<img width="1920" height="1080" alt="Screenshot 2026-02-19 221739" src="https://github.com/user-attachments/assets/c1add8ed-f826-4928-a8e6-c2ca3f8f79bd" />
<img width="1920" height="1080" alt="Screenshot 2026-02-19 221731" src="https://github.com/user-attachments/assets/b6ddbabd-a6d3-4138-815d-2a3462a4dda0" />
**YouTube Focus Mode – Chrome Extension (Manifest V3)**

**Overview**

YouTube Focus Mode is a productivity-focused Chrome Extension designed to transform YouTube into a structured, distraction-free learning environment. The extension dynamically removes recommended videos, comments, and sidebar suggestions during active focus sessions while integrating a fully functional, persistent timer engine.

The primary objective of this project was not just UI manipulation, but to implement a scalable and reliable browser extension architecture using Chrome’s Manifest V3 standards, service workers, and inter-script communication.

This project demonstrates real-world browser extension development, asynchronous state synchronization, DOM injection strategies, and lifecycle-aware timer management.

**Problem Statement**

While YouTube is a powerful learning platform, it also contains highly distracting elements such as:

Related videos

Recommended content

Comment sections

Sidebar suggestions

These elements interrupt deep concentration and reduce study efficiency. The extension was built to address this problem by creating a structured focus workflow directly within the browser.

**Core Features
1. Focus Mode**

The extension enables a distraction-free mode by dynamically hiding:

Sidebar recommendations

Related videos section

**Comments section**

Secondary watch results container

This is achieved through content script–based DOM manipulation and runtime style injection. Focus mode activates during an active timer session and automatically restores the original YouTube layout once the session ends.

**2. Interactive Clock-Based Focus Timer**

A custom-built circular clock interface allows users to visually select study duration. The timer system includes:

Interactive time selection

Start control

Pause functionality

Resume capability

**Stop control**

Real-time MM:SS countdown display

The timer continues running in the background even when the popup UI is closed. This is implemented using a background service worker that maintains time state independently from the popup interface.

**3. Persistent Background Timer Engine**

The timer engine runs inside the background service worker (Manifest V3). Key responsibilities include:

Managing focus session lifecycle

Tracking remaining time

Synchronizing state using chrome.storage.local

Triggering UI updates via runtime messaging

Maintaining persistence even when popup is closed

This ensures accurate timing behavior without relying on popup-based intervals.

**4. Structured Focus–Break Workflow**

The extension implements a Pomodoro-inspired workflow:

Focus session

Break session

Optional restart of previous session

Quit workflow

When a focus session ends or is manually stopped:

A dynamic overlay is displayed

The user can choose to take a break

A floating break timer appears on the YouTube page

The previous focus duration can be restarted

The break timer operates independently from the main focus timer.

**5. Chrome Notifications**

Upon session completion, a Chrome system notification is triggered using the Notifications API. This ensures that users are alerted even if they switch tabs or minimize the browser window.

**Technical Architecture**

The extension follows a modular three-layer architecture:

**Background Layer (Service Worker)**

Manages focus and break timer engines

Maintains state persistence

Handles asynchronous time calculations

Controls notification logic

Stores previous focus session duration

**Popup Layer**

Interactive clock UI

Timer control interface

Real-time display synchronization

Sends control messages to background

Retrieves session state from storage

**Content Script Layer**

Injects focus mode styles

Manipulates YouTube DOM

Displays overlay popups

Renders floating break timer

Listens to storage changes for UI updates

**Technologies Used**

Chrome Extension Manifest V3

JavaScript (Vanilla, Event-Driven Architecture)

Service Workers

Chrome Storage API

Chrome Runtime Messaging API

Chrome Notifications API

DOM Manipulation and Dynamic Style Injection

Asynchronous Event Handling

****Technical Challenges and Solutions**
Service Worker Lifecycle Management**

Manifest V3 service workers can become inactive. The timer engine was designed to rehydrate state from storage and maintain consistent behavior across lifecycle resets.

**Asynchronous Runtime Messaging**

Message passing between popup, background, and content scripts required careful handling of asynchronous responses and state updates.

Cross-Context State Synchronization

Focus state needed to remain consistent across:

Popup UI

**Background worker**

**Content script**

This was achieved using chrome.storage.local as a centralized state store.

**Timer Persistence Across Popup Closure**

Since popup scripts are destroyed when closed, all timing logic was moved to the background service worker to prevent session loss.

**Dynamic DOM Injection Handling**

YouTube dynamically updates its layout. Focus mode selectors were carefully implemented to maintain stability even with dynamic DOM changes.

**Notification Permission Handling**

Proper manifest configuration and icon resource handling were required to avoid runtime notification errors.

**Project Structure**

**youtube-focus-mode/
│
├── manifest.json
├── background.js
├── content.js
├── popup.html
├── popup.js
├── popup.css
│
└── README.md**

**Installation (Manual – Free Method)**

**Clone the repository:**

git clone https://github.com/yourusername/youtube-focus-mode.git

Open Chrome and navigate to:

chrome://extensions/

Enable Developer Mode.

Click “Load unpacked”.

Select the project folder.

The extension is now installed and ready to use.

Professional Value

**This project demonstrates:**

Practical Chrome Extension development experience

Browser-level application architecture understanding

Asynchronous programming expertise

**Real-time state management**

UI–background synchronization patterns

Manifest V3 service worker implementation

Real-world debugging and lifecycle handling

It reflects strong frontend engineering skills combined with browser API integration and system-level thinking.
**
**Future Enhancements****

Customizable focus and break durations

Focus analytics dashboard

Daily productivity tracking

Sound alerts

Cloud synchronization

Auto-cycle Pomodoro mode

Theme customization

**Author**
Peta Sravan Kumar

Focused on building practical, real-world productivity tools and browser-based applications.
