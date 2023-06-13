const db = require('../../../db-config');

// ----------------------------------------------------------------------------------------

const findAll = () => {
  return db.execute('SELECT * FROM track').then(([data]) => {
    return data;
  });
};

// ----------------------------------------------------------------------------------------

const findById = (id) => {
  return db
    .execute('SELECT * FROM track WHERE track.id = ?', [id])
    .then(([data]) => {
      return data;
    });
};

// ----------------------------------------------------------------------------------------

const insertTrack = (track) => {
  const { title, youtube_url, id_album } = track;
  return db
    .execute(
      'INSERT INTO track ( title, youtube_url, id_album) VALUES (?, ?, ?)',
      [title, youtube_url, id_album]
    )
    .then(([data]) => {
      return data;
    });
};

// ----------------------------------------------------------------------------------------

const deleteTrack = (id) => {
  return db
    .execute('DELETE FROM track WHERE track.id = ?', [id])
    .then(([data]) => {
      return data;
    });
};

// ----------------------------------------------------------------------------------------

const updateTrack = (track, id) => {
  const { title, youtube_url, id_album } = track;
  return db
    .execute(
      'UPDATE track SET title=?, youtube_url=?, id_album=?  WHERE track.id = ?',
      [title, youtube_url, id_album, id]
    )
    .then(([data]) => {
      return data;
    });
};

module.exports = { findAll, findById, insertTrack, deleteTrack, updateTrack };
