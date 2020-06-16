var VideoList = (props) => (
  <div className="video-list-media">
    {props.videos.map((video, index) => (
      <VideoListEntry key={index} video={video} play={props.playVideo} />
    ))}
  </div>
);

VideoList.propTypes = {
  videos: React.PropTypes.array.isRequired,
};

window.VideoList = VideoList;
