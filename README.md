# Audiofile

A playlist manager for Spotify

![Showcase](https://user-images.githubusercontent.com/57713705/179369123-44828584-5ea1-4676-8fbf-5341b56f05fd.PNG)

## Development Status

This project is still a **Work in Progress**

- [x] User Auth
  - [x] Send user to Spotify to retrieve auth code
  - [x] Call API endpoint /authorize and retrieve tokens
  - [ ] Handle token refreshing to prevent premature deauthentication
- [ ] UI
  - [x] Allow user to login
  - [x] Show user playlists
  - [x] Show songs from selected playlists
  - [x] Show which songs belong to which playlists
  - [ ] Add songs between playlists
- [x] API
  - [x] Endpoint to handle authorization code flow
  - [ ] Endpoint to handle token refreshing

## Development Stack

- React
- Express
- Spotify Web API Node (<https://github.com/thelinmichael/spotify-web-api-node>)
- ~~Material UI~~
- Tailwind CSS
