
# Project TrybeTunes

For this project at [Trybe](https://www.betrybe.com/), I developed a music preview application in [React js](https://reactjs.org/),
which has features such as searching for various artists and bands, creating a favorites list, and editing a user profile.
## Lessons Learned

In this project, I developed skills such as how to request and consume data coming from an API, use the life cycles of a React application, create and navigate to pages within the application with BrowserRouter, Route and Switch.
## Tech Stack

**Client:** React, Html, CSS and JavaScript.



## Demo




## API Reference

#### Get all albums of searched artist/band:

```http
  https://itunes.apple.com/search?entity=album&term=artistNameURL&attribute=allArtistTerm`
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `artistNameURL` | `string` | **Required**. Your API key to fetch |

#### Get musics from selected album:

```http
  https://itunes.apple.com/lookup?id=id&entity=song
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of the album to fetch |



## Run Locally

Clone the project

```bash
  git clone git@github.com:PhilipLages/trybetunes.git
```

Go to the project directory

```bash
  cd trybetunes
```

Install dependencies

```bash
  npm install
```


