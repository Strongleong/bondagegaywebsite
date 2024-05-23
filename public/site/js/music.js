const music_state = {
    background_music: null,
    playing_music: false,
    is_music_ready: false,
}

function music_setup() {
    music_state.is_music_ready   = false;
    music_state.background_music = createAudio('/audio/background.mp3', () => music_state.is_music_ready = true);
    music_state.background_music.volume(0.8);
    music_state.playing_music    = false;
}

function music_update() {
    if (!start_gachi) {
        if (music_state.is_music_ready) music_state.background_music.pause();
        music_state.playing_music = false;
        return;
    }

    if (music_state.is_music_ready && !music_state.playing_music) {
        music_state.background_music.loop()
        music_state.playing_music = true;
    };
}
