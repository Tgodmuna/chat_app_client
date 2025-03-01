# Chat App

This project is a chat application built with React, TypeScript, and Tailwind CSS. It includes features such as user authentication, friend management, real-time messaging, and more.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Components](#components)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Tgodmuna/chat-app.git
   cd chat-app         
   ```

2. Install the dependencies:

```sh
npm install
```

3. Create a `.env` file in the root directory and add your environment variables.

4. Start the development server:

```sh
npm start
```

### Setting Up Environment Variables

To set up your environment variables, create a `.env` file in the root directory of your project and add the following variables:

```properties
# Development Environment Variables
REACT_APP_DEV_SERVER_URL=http://localhost:7000
REACT_APP_DEV_API_KEY=your_dev_api_key_here
REACT_APP_DEV_WEBSOCKET_URL=ws://localhost:7000

# Production Environment Variables
REACT_APP_PROD_SERVER_URL=https://your-production-server.com
REACT_APP_PROD_API_KEY=your_prod_api_key_here
REACT_APP_PROD_WEBSOCKET_URL=wss://your-production-server.com
```

Make sure to replace `your_dev_api_key_here`, `your_prod_api_key_here`, and other placeholders with your actual environment values.

## Project Structure

The project structure is as follows:

```
.env
.gitignore
package.json
public/
  _redirects
  index.html
  manifest.json
  robots.txt
README.md
src/
  App.css
  App.test.tsx
  App.tsx
  components/
   Auth/
    Authenticator.tsx
    businessLogics/
      Login.tsx
      Register.tsx
   hooks/
    UseFetchToken.ts
    useNotification.tsx
    UseSuspense.tsx
    UseWebSocket.ts
    useEnvironmentUrls.ts
   modal/
    incomingCallModal.tsx
    ...
   pages/
    CallScreen.tsx
    MessageRelatedFiles/
      Message.header.tsx
    ...
   user/
    friends-related/
      Friends.tsx
      FriendList.tsx
      FriendRequest.tsx
      DiscoverPeople.tsx
      Search.tsx
    profile.tsx
    EditProfile.tsx
    Settings.tsx
   utils/
    Button.tsx
    Spinner.tsx
    SuccessToast.tsx
    Tooltip.tsx
  index.css
  index.tsx
  reportWebVitals.ts
  setupTests.ts
  types.tsx
tailwind.config.js
```

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in the development mode.
  Open <http://localhost:3000> to view it in the browser.
- `npm test`: Launches the test runner in the interactive watch mode.
  See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

- `npm run build`: Builds the app for production to the build folder.
  It correctly bundles React in production mode and optimizes the build for the best performance.

- `npm run eject`: Removes the single build dependency from your project.

## Components

### Auth

- **Authenticator.tsx**: Handles user authentication.
- **Login.tsx**: Login form component.
- **Register.tsx**: Registration form component.

### Hooks

- **UseFetchToken.ts**: Custom hook to fetch the token from session storage.
- **useNotification.tsx**: Custom hook for displaying notifications.
- **UseSuspense.tsx**: Custom hook for handling suspense in React.
- **UseWebSocket.ts**: Custom hook for managing WebSocket connections.
- **useEnvironmentUrls.ts**: Custom hook for extracting environment variables.

### Modal

- **incomingCallModal.tsx**: Modal component for incoming calls.

### Pages

- **CallScreen.tsx**: Component for the call screen.
- **Message.header.tsx**: Header component for messages.
- **Friends.tsx**: Component for managing friends.
- **FriendList.tsx**: Component for displaying the list of friends.
- **FriendRequest.tsx**: Component for handling friend requests.
- **DiscoverPeople.tsx**: Component for discovering new people.
- **Search.tsx**: Component for searching friends.
- **profile.tsx**: Component for user profile.
- **EditProfile.tsx**: Component for editing user profile.
- **Settings.tsx**: Component for user settings.

### Utils

- **Button.tsx**: Reusable button component.
- **Spinner.tsx**: Loading spinner component.
- **SuccessToast.tsx**: Toast notification component for success messages.
- **Tooltip.tsx**: Tooltip component.

## Dependencies

- **@types/react**: TypeScript definitions for React.
- **@types/react-dom**: TypeScript definitions for React DOM.
- **Axios**: Promise-based HTTP client for the browser and Node.js.
- **Buffer**: Node.js Buffer API for the browser.
- **cra-template-typescript**: An official TypeScript template for Create React App.
- **crypto-browserify**: Implementation of Node's crypto module for the browser.
- **dotenv**: Loads environment variables from a `.env` file.
- **Joi**: Object schema validation.
- **libphonenumber-js**: Library for parsing, formatting, and validating international phone numbers.
- **Lodash**: A modern JavaScript utility library delivering modularity, performance, and extras.
- **os-browserify**: Node's `os` module for the browser.
- **path-browserify**: Node's `path` module for the browser.
- **React**: A JavaScript library for building user interfaces.
- **react-app-rewired**: Override Create React App webpack configs without ejecting.
- **React DOM**: Entry point of the DOM-related rendering paths.
- **React Icons**: Include popular icons in your React projects easily.
- **React Router DOM**: DOM bindings for React Router.
- **react-scripts**: Scripts and configuration used by Create React App.
- **stream-browserify**: Node's `stream` module for the browser.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **vm-browserify**: Node's `vm` module for the browser.
- **web-vitals**: A library for measuring essential web performance metrics.
- **wsclient**: A WebSocket client library.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

This `README.md` file provides a comprehensive overview of the project, including installation instructions, project structure, available scripts, component descriptions, dependencies, and contribution guidelines.
