(function (window) {
    var YouTubeIframeLoader = {
        src: 'https://www.youtube.com/iframe_api',
        loading: false,
        loaded: false,
        listeners: [],

        load: function (callback) {
            var _this = this;
            this.listeners.push(callback);

            if (this.loaded) {
                setTimeout(function () {
                    _this.done();
                });
                return;
            }

            if (this.loading) {
                return;
            }

            this.loading = true;

            window.onYouTubeIframeAPIReady = function () {
                _this.loaded = true;
                _this.done();
            };

            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = this.src;
            document.body.appendChild(script);
        },

        done: function () {
            delete window.onYouTubeIframeAPIReady;

            while (this.listeners.length) {
                this.listeners.pop()(window.YT);
            }
        }
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = YouTubeIframeLoader;
    } else {
        window.YouTubeIframeLoader = YouTubeIframeLoader;
    }

    //populate with videos based on an array

    var arr = ["PK0uTzr7kKQ", "f1_n-EmMlLQ", "Rqq81gCe0fg", "p6j8fuvQICI", "ZOJA8gtNdBQ", "PxtSfY6h6AM"];
    var cList = $('#gallery-video');

    $.each(arr, function (key, value) {
        var li = $('<li>').appendTo(cList);
        var div = $('<div>').appendTo(li).attr('id', value);
    });

    $('#gallery-video').find('div').each(function () {
        video_id = $(this).attr('id')
        get_video(video_id);
    });

    function get_video(video_id) {
        YouTubeIframeLoader.load(function (YT) {
            new YT.Player(video_id, {
                height: '390',
                width: '640',
                videoId: video_id
            });
        });
    }


}(window));
//retrive videos
// Your use of the YouTube API must comply with the Terms of Service:
// https://developers.google.com/youtube/terms
// Helper function to display JavaScript value on HTML page.
function showResponse(response) {
    var responseString = JSON.stringify(response, '', 2);
    document.getElementById('response').innerHTML += responseString;
}

// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    // This API key is intended for use only in this lesson.
    // See https://goo.gl/PdPA1 to get a key for your own applications.
    gapi.client.setApiKey('AIzaSyBmxr740XlhTT1kJQ07QNv6Oti8P3Lptew');

    //search();
}

function search() {
    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q:'ronaldo'

    });

    // Send the request to the API server,
    // and invoke onSearchRepsonse() with the response.
    request.execute(onSearchResponse);
}

// Called automatically with the response of the YouTube API request.
function onSearchResponse(response) {
    showResponse(response);
}
