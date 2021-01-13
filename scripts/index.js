const parser = new DOMParser();

const parseDOM = (domString) => {
    const html = parser.parseFromString(domString, 'text/html');

    return html.body.firstChild;
};

window.addEventListener('load', () => {
    const messageContainer = document.getElementById('message-list');

    const addMessage = (message) => {
        const li = document.createElement('li');
        li.innerText = message;

        messageContainer.appendChild(li);
    };

    const viewData = {
        src: './pano-copied_Trim.mp4',
        eventId: '5c36fed232ee4b7e85a82e0d',
        preRoll: null,
        midRolls: [],
        tags: []
    };

    const PixellotWebSDK = window['pixellot-web-sdk'];
    const { PanoPlugin } = PixellotWebSDK.Plugins;

    const createPixellotPlayer = () => {
        const player = PixellotWebSDK.Player(document.getElementById('player'));
        const panoPlugin = {
            name: 'pano',
            plugin: PanoPlugin,
            options: {},
        }

        player.setTitle('Pano POC Demo');
        player.setStreamNames(['hd', 'pano']);
        player.setActiveStreamName('hd');
        player.setSwitchSelectCallback((streamName) => {
            resetPlayer(() => {
                if (streamName === 'hd') {
                } else {
                    window.player.pluginManager.registerPlugin(panoPlugin);
                }

                window.player.setActiveStreamName(streamName);
                playSource();
                player.vdjsPlayer.getChild('Canvas').handleResize();
            });
        })


        return player;
    };

    const handlePlayerResize = () => {
        const canvas = window.player && window.player.vdjsPlayer.getChild('Canvas');

        if (canvas) {
            canvas.handleResize();
        }
    };

    window.addEventListener('resize', handlePlayerResize);

    const resetPlayer = (callback) => {
        const inFullScreen = window.player.vdjsPlayer.isFullscreen();
        const playTime = window.player.currentTime;

        window.player.pause();
        window.player.vdjsPlayer.dispose();


        setTimeout(() => {
            const player = createPixellotPlayer();
            window.player = player;
            window.player.currentTime = playTime;

            if (inFullScreen) {
                window.player.vdjsPlayer.requestFullscreen();
            }
            handlePlayerResize();
            callback && callback();
        }, 100);
    }

    PixellotWebSDK.Auth.setSession(
        token,
        signature
    );

    const player = createPixellotPlayer();
    window.player = player;

    const playSource = () => {
        setSource();
        window.player.play();
    }
    const setSource = () => {
        const source = viewData.src;
        const preroll = viewData.preRoll;
        const midrolls = viewData.midRolls;

        window.player.setSource(source, preroll, midrolls);
    }
    setSource();

    const sourceInput = document.getElementById('stream-source-input');
    const sourceSelect = document.getElementById('stream-source-select');

    sourceInput.value = viewData.src;

    sourceSelect.addEventListener('change', event => {
        event.preventDefault();
        viewData.src = event.target.value;

        sourceInput.value = event.target.value;
    });

    sourceInput.addEventListener('input', event => {
        event.preventDefault();
        viewData.src = event.target.value;

        if (event.target.value !== sourceSelect.value) {
            sourceSelect.value = '';
        }
    });

    document.getElementById('source-form').addEventListener('submit', event => {
        event.preventDefault();

        playSource();
    });
});
