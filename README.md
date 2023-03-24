# App Info

- User load the page and see the input and ‘Show location info’ button.
- User enter zip code and click ‘Show location info’ button
    - If the user submits info with empty input he gets an empty input error message.
    - If the user submits info with the correct zip he gets location info.
    - If the user submits info with incorrect zip he gets an error message. Previously rendered info will be reseted.
    - User can see ‘Show location info’ and ‘Reset’ buttons even he gets the below described errors.
- User gets location info by zip code. User see  ‘Show location info’ and ‘Reset’ buttons.
- User clicks ‘Reset’ - all data will be resetted to the start point
- User clicks ‘Show location info’
    - If there is a problem with the api he gets an error message.
    - If there is no problem he gets user info. If the URL contains utm tags they also will be added to user info. (You can test it by uncommenting the URL in getDataService.js.

# Components:

- GenericButton - styled button.
- InfoBlock - render passed data.
# Services:
- getDataService - Get data functions with requests
- api - urls, api-key, country variable.


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```


