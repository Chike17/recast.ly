describe('App', function () {
  var {
    Simulate,
    renderIntoDocument,
    findRenderedDOMComponentWithClass,
    scryRenderedDOMComponentsWithClass,
  } = React.addons.TestUtils;

  var app;

  beforeEach(function () {
    app = renderIntoDocument(<App searchYouTube={() => {}} />);
  });

  it('should be a stateful class component', function () {
    expect(React.Component.isPrototypeOf(App)).to.be.true;
  });

  it('should render a single VideoPlayer component', function () {
    var videoPlayer = findRenderedDOMComponentWithClass(app, 'video-player');
    expect(videoPlayer).to.exist;
  });

  it('should render a single VideoList component', function () {
    var videoList = findRenderedDOMComponentWithClass(app, 'video-list');
    expect(videoList).to.exist;
  });

  it("should update the video player when a video entry's title is clicked", function () {
    expect(React.Component.isPrototypeOf(App)).to.be.true;

    var videoEntryTitleElements = scryRenderedDOMComponentsWithClass(
      app,
      'video-list-entry-title'
    );

    videoEntryTitleElements.forEach((videoEntryTitle) => {
      Simulate.click(videoEntryTitle);
      var player = findRenderedDOMComponentWithClass(app, 'video-player');
      var playerTitle = player.querySelector('.video-player-details h3');

      expect(playerTitle.innerHTML).to.equal(videoEntryTitle.innerHTML);
    });
  });

  describe('when rendering live data from YouTube', function () {
    var searchYouTubeStub;

    beforeEach(function () {
      searchYouTubeStub = sinon.stub();
      searchYouTubeStub.yields(window.fakeVideoData);
      app = renderIntoDocument(<App searchYouTube={searchYouTubeStub} />);
    });

    it('should call `searchYouTube` when app is initialized', function () {
      expect(searchYouTubeStub.called).to.be.true;
    });

    it('should load live data when app is initialized', function () {
      expect(searchYouTubeStub.called).to.be.true;

      var videoEntryTitleElements = scryRenderedDOMComponentsWithClass(
        app,
        'video-list-entry-title'
      );

      videoEntryTitleElements.forEach((videoEntryTitle, i) =>
        expect(videoEntryTitle.innerHTML).to.equal(
          fakeVideoData[i].snippet.title
        )
      );
    });
  });
});
