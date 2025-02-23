# **Real-Time Chat Application (Laravel)**

## **Overview**
This is a real-time chat application built with Laravel. It allows users to register, authenticate, and chat with others while seeing their online/offline status in real-time using WebSockets.

## **Features**
- ✅ **User Authentication**: 
  - Register an account.
  - Log in and log out securely using Laravel Breeze.
- ✅ **Real-Time Chat**: 
  - Authenticated users can select another user and start a chat.
  - Messages are sent and received instantly using WebSockets.
- ✅ **Online/Offline Status**: 
  - Users can see each other's status in real-time (online or offline).
- ✅ **Event Broadcasting**: 
  - Pusher Channels to broadcast events via WebSockets API.

## **Tech Stack**
- **Backend:** Laravel, Eloquent ORM
- **Frontend:** Laravel Blade Template, HTML, CSS, JavaScript, jQuery
- **Real-Time Communication:** Pusher Channels (WebSockets API)
- **Authentication:** Laravel Breeze
- **Database:** MySQL
- **Styling:** Bootstrap, UI Ball


## **Usage**
- **Register & Authenticate**: Create an account and log in.
- **Chat with Users**: Select a user from the list to start a real-time chat.
- **Check User Status**: See if users are online or offline in real-time.
