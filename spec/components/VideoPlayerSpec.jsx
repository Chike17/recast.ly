describe('VideoPlayer', function () {
  var {
    renderIntoDocument,
    findRenderedDOMComponentWithClass,
  } = React.addons.TestUtils;

  var cuteCatVideo, superCuteCatVideo, hackReactorVideo;

  beforeEach(function () {
    cuteCatVideo = renderIntoDocument(
      <Wrapper>
        <VideoPlayer video={window.fakeVideoData[0]} />
      </Wrapper>
    );

    superCuteCatVideo = renderIntoDocument(
      <Wrapper>
        <VideoPlayer video={window.fakeVideoData[1]} />
      </Wrapper>
    );

    hackReactorVideo = renderIntoDocument(
      <Wrapper>
        <VideoPlayer video={window.fakeVideoData[2]} />
      </Wrapper>
    );
  });

  it('should be a stateless functional component', function () {
    expect(React.Component.isPrototypeOf(VideoPlayer)).to.be.false;
  });

  it('should dynamically render a video', function () {
    var cuteCatVideoIFrameElement = findRenderedDOMComponentWithClass(
      cuteCatVideo,
      'embed-responsive-item'
    );
    var superCuteCatVideoIFrameElement = findRenderedDOMComponentWithClass(
      superCuteCatVideo,
      'embed-responsive-item'
    );
    var hackReactorVideoIFrameElement = findRenderedDOMComponentWithClass(
      hackReactorVideo,
      'embed-responsive-item'
    );

    expect(cuteCatVideoIFrameElement.src).to.equal(
      'https://www.youtube.com/embed/000001'
    );
    expect(superCuteCatVideoIFrameElement.src).to.equal(
      'https://www.youtube.com/embed/000002'
    );
    expect(hackReactorVideoIFrameElement.src).to.equal(
      'https://www.youtube.com/embed/000003'
    );
  });

  it("should dynamically render a video's title", function () {
    var cuteCatVideoTitleElement = findRenderedDOMComponentWithClass(
      cuteCatVideo,
      'video-player-details'
    );
    var superCuteCatVideoTitleElement = findRenderedDOMComponentWithClass(
      superCuteCatVideo,
      'video-player-details'
    );
    var hackReactorVideoTitleElement = findRenderedDOMComponentWithClass(
      hackReactorVideo,
      'video-player-details'
    );

    expect(cuteCatVideoTitleElement.children[0].innerHTML).to.equal(
      'Cute cat video'
    );
    expect(superCuteCatVideoTitleElement.children[0].innerHTML).to.equal(
      'Super cute cat video'
    );
    expect(hackReactorVideoTitleElement.children[0].innerHTML).to.equal(
      'Hack Reactor opens extension school on Mars'
    );
  });

  it("should dynamically render a video's description", function () {
    var cuteCatVideoDescriptionElement = findRenderedDOMComponentWithClass(
      cuteCatVideo,
      'video-player-details'
    );
    var superCuteCatVideoDescriptionElement = findRenderedDOMComponentWithClass(
      superCuteCatVideo,
      'video-player-details'
    );

    expect(cuteCatVideoDescriptionElement.children[1].innerHTML).to.equal(
      'The best cat video on the internet!'
    );
    expect(superCuteCatVideoDescriptionElement.children[1].innerHTML).to.equal(
      'Better than the best cat video on the internet!'
    );
  });
});
