const db = require('../../../db-config');

// ----------------------------------------------------------------------------------------

const findAll = () => {
  return db.execute('SELECT * FROM albums').then(([data]) => {
    return data;
  });
};

// ----------------------------------------------------------------------------------------

const findById = (id) => {
  return db
    .execute('SELECT * FROM albums WHERE albums.id = ?', [id])
    .then(([data]) => {
      return data;
    });
};

// ----------------------------------------------------------------------------------------

const findTracks = (id) => {
  return db
    .execute('SELECT t.title FROM track t WHERE id_album = ?', [id])
    .then(([data]) => {
      return data;
    });
};

// ----------------------------------------------------------------------------------------

const insertAlbum = (album) => {
  const { title, genre, picture, artist } = album;
  return db
    .execute(
      'INSERT INTO albums (title, genre, picture, artist) VALUES (?, ?, ?, ?)',
      [title, genre, picture, artist]
    )
    .then(([data]) => {
      return data;
    });
};

module.exports = { findAll, findById, findTracks, insertAlbum };
