# 🛠️ FixItNow

**FixItNow** is a community-powered platform designed to help users report local civic issues—like potholes, garbage overflow, and broken infrastructure—and get them resolved faster through real-time updates and transparency.

---


## 🚀 Live Demo

👉 [Click here to try the demo](https://civic-fix-now-reports.lovable.app/)
*(Add your deployed project link here if available)*

---

## 💡 Inspiration

Every day, people come across unresolved problems in their locality, but there’s no unified system to report or track them. **FixItNow** was built during a hackathon with the vision of empowering citizens to raise their concerns and drive real, visible change.

---

## 🔧 Features

- 📍 Submit local issues with description, image, and location
- 🔁 Track status: pending → in-progress → resolved
- 👍 Upvote existing complaints
- 🗺️ GPS-based auto-location tagging using Google Maps API
- 🔔 Real-time notifications and status updates
- 📊 View community issue analytics

---

## 🧱 Tech Stack

**Frontend**  
- React Native  
- Firebase Authentication  

**Backend**  
- Node.js  
- Express.js  

**Database**  
- Firebase Firestore  

**APIs & Services**  
- Google Maps API  
- Firebase Cloud Messaging (for notifications)

---

## 📦 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/FixItNow.git
cd FixItNow

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install

# Start frontend
cd ../client
npm start

# Start backend
cd ../server
node index.js
