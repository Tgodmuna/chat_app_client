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
   git clone https://github.com/your-username/chat-app.git
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
      UseSuspence.tsx
      UseWebSocket.ts
    modal/
      incomingCallModal.tsx
      ...
    pages/
      CallScreen.tsx
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

- `npm run build`:Builds the app for production to the build folder.
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
- **UseSuspence.tsx**: Custom hook for handling suspense in React.
- **UseWebSocket.ts**: Custom hook for managing WebSocket connections.

### Modal

- **incomingCallModal.tsx**: Modal component for incoming calls.

### Pages

- **CallScreen.tsx**: Component for the call screen.
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

- **React**
- **TypeScript**
- **Tailwind CSS**
- **Axios**
- **React Router DOM**
- **Joi**
- **React Icons**

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

This `README.md` file provides a comprehensive overview of the project, including installation instructions, project structure, available scripts, component descriptions, dependencies, and contribution guidelines.
This `README.md` file provides a comprehensive overview of the project, including installation instructions, project structure, available scripts, component descriptions, dependencies, and contribution guidelines.
