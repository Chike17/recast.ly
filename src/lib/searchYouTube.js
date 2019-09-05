async function searchYouTube (options, callback) {
  try {
    let d = await $.ajax(`https://www.googleapis.com/youtube/v3/search`, {
        type: 'GET',
        data: {
          q: options.query,
          maxResults: options.max,
          part: 'snippet',
          type: 'video',
          key: options.key
      },
      contentType: 'application/json',
    });
    callback(d.items);
  }
  catch(err) {
    console.log(err)
  }
}
window.searchYouTube = searchYouTube;

