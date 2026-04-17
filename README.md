# Socket.io Slack Clone 💬

A real-time chat application that mimics Slack's architecture using **Socket.io**. This project demonstrates the implementation of namespaces and rooms to organize and isolate data streams.

## 🚀 Key Features
* **Multi-Namespace Support:** Handles different workspaces (e.g., Wikipedia, Mozilla, Linux) within a single server instance.
* **Dynamic Rooms:** Each namespace contains specific thematic channels for targeted communication.
* **Real-time Messaging:** Instant message delivery to all participants within a specific room.
* **Chat History:** Retains message history within the current server session.
* **Live User Count:** Real-time updates on the number of active users in a room.
* **Persistence:** Uses `localStorage` to automatically reconnect users to their last visited namespace.

## 🛠 Tech Stack
* **Backend:** Node.js, Express.
* **Real-time Engine:** Socket.io.
* **Frontend:** Vanilla JavaScript (DOM), CSS3, HTML5.
* **UI Frameworks:** Bootstrap 5, Font Awesome.

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/oleksandrivanyshyn/socket.io-slack.git
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the server:**
   ```bash
   npm run dev
   ```
   *The server will start on port 9000. go to http://localhost:9000/slack.html*

## 📖 Project Architecture
The project follows a class-based structure for clean data management:
* **Namespace:** Manages endpoints, images, and collections of rooms.
* **Room:** Manages specific channel titles, IDs, and their message histories.
