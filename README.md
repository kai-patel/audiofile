# Audiofile

A playlist manager for Spotify

![Showcase](https://user-images.githubusercontent.com/57713705/184241082-c2b17ee1-7851-4586-a99b-85f9c39fc9a2.PNG)

## Development Status

This project is **functional**, but still a **Work in Progress**

- [x] User Auth
  - [x] Send user to Spotify to retrieve auth code
  - [x] Call API endpoint /authorize and retrieve tokens
  - [x] Handle token refreshing to prevent premature deauthentication
- [x] UI
  - [x] Allow user to login
  - [x] Show user playlists
  - [x] Show songs from selected playlists
  - [x] Show which songs belong to which playlists
  - [x] Add songs between playlists
- [x] API
  - [x] Endpoint to handle authorization code flow
  - [x] Endpoint to handle token refreshing
- [x] Migration to Next.js
  - [x] Migrate client
  - [x] Migrate backend

## Development Stack

- ~~React~~ **Now Next.js**
- ~~Express~~
- Spotify Web API Node (<https://github.com/thelinmichael/spotify-web-api-node>)
- ~~Material UI~~
- Tailwind CSS

## **Known Issues**

- Songs common between playlists show up as separate listings (*this will be fixed soon*)
