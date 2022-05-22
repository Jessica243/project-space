# the-space

[github codebase](https://github.com/Jessica243/the-space)

[prototype deployed on expo](https://expo.dev/@jess243/the-space?serviceType=classic&distribution=expo-go)

## Getting Started

Prerequisites:

1. Install Node
2. Install Expo CLI `npm install -g expo-cli`
3. Register for an expo account https://expo.dev/

Run the project:

1. `npm install`
2. Run app
   * `npm run android`
   * `npm run ios`
   * `npm run web` - FYI: the map is not supported by the browser

Note:

* Add a new NPM packages
  * `expo install <insert name of package>`

## Linting

1. `npm run lint:fix`

## Publish

1. (First time only) Login to expo in your terminal `npm run loginToExpo`
2. Publish `npm run publish`

## View

1. Download the `expo go` app on your phone
2. Go to this link and scan the QR code on your phone to view the app https://expo.dev/@jess243/the-space?serviceType=classic&distribution=expo-go

## Development Libraries

* [Get location data from phone](https://www.npmjs.com/package/expo-location)
* [Map](https://www.npmjs.com/package/react-native-maps)
* [Voice input](https://www.npmjs.com/package/@react-native-voice/voice)
* [Sound output](https://www.npmjs.com/package/react-native-sound)
* [DB](https://www.npmjs.com/package/@realm/react)

## Open Source Images

* [Svg](https://freesvg.org/search/)
* [Image](https://unsplash.com/)
* [Image](https://depositphotos.com/?gclsrc=aw.ds&&utm_source=google&utm_medium=cpc&utm_campaign=DP_English_EN_Image_Free_Search&utm_term=free%20images&adCampaign=trial&trial=2&gclid=Cj0KCQjwsdiTBhD5ARIsAIpW8CJpdrpWevpQmjpKGLi__B7nuzNWfGh1_FDvLEaYr6Ij9O5-BhQ1GoAaAm9qEALw_wcB)

## TODO

- [x] Create basic app
- [x] Learn how to publish app on expo
- [x] Change function component to class components
- [x] Mobile features
  - [x] Add map
  - [x] Add settings
  - [x] Add registration
  - [x] Add login
  - [x] Add password reset
  - [x] Add dummy database
  - [x] Add search for locations on the map
  - [x] Add parking information map overlay
  - [x] Add parking detail page
  - [x] Add prices and other parking details and show on the map
  - [x] Add tags to show what is currently searched
  - [x] Set details to show in map view based on user settings
  - [x] Add parking list view (same info as the map search results)
  - [x] Add filtering and sorting parking locations
  - [x] Add initial preference selection
  - [x] Add logout button
  - [x] Add drive to parking dummy
  - [x] Get height of car in user settings
  - [x] Make settings page more readable
  - [x] Refactor so only 1 set of search logic
  - [x] Add more loading time
  - [x] Filter parking by location
  - [x] Make search tags have larger padding
- [x] Voice features
  - [x] Drive to destination flow (dummy flow)
  - [x] Adjust voice playback speed to allow user time to speak
  - [x] Voice should search change view and filter
- [ ] Add more parking spots
- [ ] Publish the final app on expo for hand in
