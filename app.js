const express = require("express");
const logger = require("morgan");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3002

app.use(logger("dev"));


let artistArray = [
  {
    id: 1,
    name: "Kanye",
    albumsArray: [
      {
        id: 1,
        name: "The coding dropout",
      },
    ],
    topSongs: [
      {
        id: 1,
        name: "The Javascript State of Mind",
      },
    ],
  },
  {
    id: 2,
    name: "Chris Brown",
    albumsArray: [
      {
        id: 1,
        name: "The Greatest Algorithm",
      },
    ],
    topSongs: [
      {
        id: 1,
        name: "Wheel on the bus",
      },
    ],
  },
];

let identifier = function (thing) {
  let message = `The operation you were attempting in relation to ${thing} failed.`;
  return message
}

app.get("/", function (req, res) {
  res.status(200).json({
    artistArray
  });
});

app.get("/without", function (req, res) {
  let idAndName = [];
  
  artistArray.forEach(artist => {
    idAndName.push([artist.id, artist.name]);
  });
  res.status(200).json({
    idAndName
  });
});

app.get("/artist/:id", function (req, res) {
  let finalArtistResult = [];
  
  artistArray.forEach(artist => {
    if (req.params.id == artist.id) {
      finalArtistResult.push(artist);
    } 
  })
  
  if (finalArtistResult.length === 0){
      finalArtistResult = identifier("LOCATING ARTIST");
  }
  res.status(200).json({
    finalArtistResult
  });
});

app.get("/albums/:artistID/:albumID", function (req, res) {
  let albumIdResult = [];
  
  artistArray.forEach(artist => {
    if (req.params.artistID == artist.id) {
      artist.albumsArray.forEach(album => {
        if (req.params.albumID == album.id) {
          albumIdResult.push(album);
        }
      })
    } 
  });
  if (albumIdResult.length === 0) {
    albumIdResult = identifier("LOCATING ALBUM")
  }
  res.status(200).json({
    albumIdResult
  });
});

app.get("/songs/:artistID/:songID", function (req, res) {
  let topSongsResult = [];
  
  artistArray.forEach(artist => {
    if (req.params.artistID == artist.id) {
      artist.topSongs.forEach(song => {
        if (req.params.songID == song.id) {
          topSongsResult.push(song);
        }
      })
    } 
  });
  if (topSongsResult.length === 0) {
    topSongsResult = identifier("LOCATING SONG")
  }
  res.status(200).json({
    topSongsResult
  });
});

app.post("/new-artist", function (req, res) {
  artistArray.push({
    id: req.body.id,
    name: req.body.name,
  });
res.status(200).json({
  artistArray
});
});

app.post("/:artistID/new-album", function (req, res) {
  artistArray.forEach(artist => {
    if (artist.id == req.params.artistID) {
      artist.albumsArray.push(req.body); 
    }
  });
res.status(200).json({
  artistArray
});
});

app.post("/:artistID/new-song", function (req, res) {
  artistArray.forEach(artist => {
    if (artist.id == req.params.artistID) {
      artist.topSongs.push(req.body); 
    }
  });
res.status(200).json({
  artistArray
});
});

app.put("/:artistID/update-name", function (req, res) {
  
  counter = 0;
  
  artistArray.forEach(artist => {
    if (artist.id == req.params.artistID) {
      counter++
      artist.name = Object.values(req.query).toString()
    }
  });
  if (counter === 0) {
    artistArray = identifier("UPDATING NAME")
  }
    res.status(200).json({
    artistArray
  });
});

app.put("/:artistID/:albumID/update-album", function (req, res) {
  
  counter = 0;

  artistArray.forEach(artist => {
    if (artist.id == req.params.artistID) {
      artist.albumsArray.forEach(album => {
        if (album.id == req.params.albumID) {
          counter++
          album.name = Object.values(req.query).toString()
        }
      });
    }
  });
  if (counter === 0) {
    artistArray = identifier("UPDATING ALBUM")
  }
  res.status(200).json({
    artistArray
  });
});

app.put("/:artistID/:songID/update-song", function (req, res) {
  
  counter = 0;

  artistArray.forEach(artist => {
    if (artist.id == req.params.artistID) {
      artist.topSongs.forEach(song => {
        if (song.id == req.params.songID) {
          counter++
          song.name = Object.values(req.query).toString()
        }
      });
    }
  });
  if (counter === 0) {
    artistArray = identifier("UPDATING SONG")
  }
  res.status(200).json({
    artistArray
  });
});

app.delete("/:artistID/delete-artist", function (req, res) {
  
  counter = 0;
  
  artistArray.forEach(artist => {
    if (artist.id == req.params.artistID) {
      counter++
      delete artist.name
      delete artist.id
      delete artist.albumsArray
      delete artist.topSongs
    }
  });
  if (counter === 0) {      
    artistArray = identifier("DELETING ARTIST")
  }
  res.status(200).json({
    artistArray
  });
});

app.delete("/:artistID/:albumID/delete-album", function (req, res) {
  
  counter = 0

  artistArray.forEach(artist => {
    if (artist.id == req.params.artistID) {
      artist.albumsArray.forEach(album => {
        if (album.id == req.params.albumID) {
          counter++
          delete album.id
          delete album.name
        }
      })
    }
    if (counter === 0) {
      artistArray = identifier("DELETING ALBUM")
    }  
  });
  res.status(200).json({
    artistArray
  });
});

app.delete("/:artistID/:songID/delete-song", function (req, res) {
  
  counter = 0;

  artistArray.forEach(artist => {
    if (artist.id == req.params.artistID) {
      artist.topSongs.forEach(song => {
        if (song.id == req.params.songID) {
          counter++
          delete song.id
          delete song.name
        }
      });
    }
    if (counter === 0) {
      artistArray = identifier("DELETING SONGS")
    }  
  });
  res.status(200).json({
    artistArray
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
