var React = require("react-native");

var { RNiTunes } = require("react-native").NativeModules;

module.exports = {
  getPlaylists: function(params) {
    return new Promise(resolve => {
      RNiTunes.getPlaylists(params || {}, playlists => {
        resolve(playlists);
      });
    });
  },

  getTracks: function(params) {
    return new Promise(resolve => {
      RNiTunes.getTracks(params || {}, tracks => {
        resolve(tracks);
      });
    });
  },

  getArtists: function(params) {
    return new Promise(resolve => {
      RNiTunes.getArtists(params || {}, tracks => {
        resolve(tracks);
      });
    });
  },

  getAlbums: function(params) {
    return new Promise(resolve => {
      RNiTunes.getAlbums(params || {}, tracks => {
        resolve(tracks);
      });
    });
  },

  getCurrentPlayTime: function(params, useSystemPlayer) {
    return new Promise(resolve => {
      RNiTunes.getCurrentPlayTime(useSystemPlayer || false, currentPlayTime => {
        resolve(currentPlayTime);
      });
    });
  },

  getCurrentTrack: function(useSystemPlayer) {
    return new Promise((resolve, reject) => {
      RNiTunes.getCurrentTrack(useSystemPlayer || false, (err, track) => {
        if (!err) {
          resolve(track);
        }
        reject(err);
      });
    });
  },

  pause: function(useSystemPlayer) {
    RNiTunes.pause(useSystemPlayer || false);
  },

  play: function(loop, useSystemPlayer) {
    RNiTunes.play(loop || false, useSystemPlayer || false);
  },

  previous: function(useSystemPlayer) {
    RNiTunes.previous(useSystemPlayer || false);
  },

  next: function(useSystemPlayer) {
    RNiTunes.next(useSystemPlayer || false);
  },

  playTrack: function(trackItem, loop, useSystemPlayer) {
    return new Promise((resolve, reject) => {
      if (
        !trackItem.hasOwnProperty("title") ||
        !trackItem.hasOwnProperty("albumTitle")
      ) {
        reject(
          "To play a track, you need to send the [title] and the [albumTitle] properties"
        );
        return;
      }
      RNiTunes.playTrack(trackItem || {}, loop || false, useSystemPlayer || false, err => {
        if (!err) {
          resolve();
        } else {
          reject(err);
        }
      });
    });
  },

  playTracks: function(trackItems, loop, useSystemPlayer) {
    return new Promise((resolve, reject) => {
      if (Array.isArray(trackItems) === false || trackItems.length === 0) {
        reject("No track item have been found");
        return;
      }
      const isValid = trackItems.every(
        t => t.hasOwnProperty("title") && t.hasOwnProperty("albumTitle")
      );
      if (isValid === false) {
        reject(
          "All track items should have [title] and [albumTitle] properties"
        );
      }
      RNiTunes.playTracks(trackItems || [], loop || false, useSystemPlayer || false, err => {
        if (!err) {
          resolve();
        } else {
          reject(err);
        }
      });
    });
  },

  seekTo: function(playingTime, useSystemPlayer) {
    RNiTunes.seekTo(playingTime, useSystemPlayer || false);
  },

  stop: function(useSystemPlayer) {
    RNiTunes.stop(useSystemPlayer || false);
  }
};
