# Star Wars Favorites Mobile Application

## Description
The Star Wars Favorites Mobile Application is a React Native CLI-based project for iOS and Android platforms. It allows users to indicate their favorite characters across the Star Wars Universe and provides functionality to track the total amount of male, female, and other favorite characters selected by the user.

## Implemented Functionality
- Makes API requests to retrieve character information from the Star Wars API (https://swapi.dev/).
- Displays a scrollable and paginated list of elements on the main screen.
- Navigates users to a dedicated screen with additional information about the selected character when clicked.
- Allows users to add characters to favorites by clicking on the "Add to favourites" link/icon and recalculates the total votes accordingly.
- Displays the total amounts of male, female, and other characters based on the user's selection.
- Provides a "Reset" button to flush all previously added favorites and reset all total values to zero.

## Demo
The demo (screen video record) is available on YouTube [via the link](https://youtu.be/AfvoqBAqRJE)

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see the app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.
