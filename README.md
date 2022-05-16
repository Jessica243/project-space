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

1. `npm run fixLint`

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
- [x] Mobile features
  - [ ] Add map
  - [x] Add settings
  - [x] Add registration
  - [x] Add login
  - [x] Add password reset
  - [x] Add dummy database
  - [ ] Add search for locations on the map (dropdown to select)
  - [ ] Add parking information map overlay
  - [ ] Add parking detail page
  - [ ] Add parking timer
  - [ ] Add drive to parking dummy video
- [ ] Voice features
  - [ ] Drive to destination flow
    - [ ] Ask the driver where they want to go
    - [ ] Listen for the location the driver want to go
    - [ ] Read the possible parkings in the area to the driver
    - [ ] Listen for the choice the driver selected
    - [ ] Ask the driver if they want to drive there
    - [ ] List for confirmation from the driver
  - [ ] Set parking timer flow
    - [ ] Listen for the user wanting to set timer
    - [ ] Confirm timer set for X minutes
- [ ] Add comments to code for hand in
- [ ] Publish the final app on expo for hand in
