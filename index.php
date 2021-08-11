<!DOCTYPE html>
<html lang="en">
<head>
    <title>bondagebondagegaywebsite.local</title>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js"
            integrity="sha512-N4kV7GkNv7QR7RX9YF/olywyIgIwNvfEe2nZtfyj73HdjCUkAfOBDbcuJ/cTaN04JKRnw1YG1wnUyNKMsNgg3g=="
            crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <link rel="stylesheet" href="css/style.css">
    <script src="js/sketch.js"></script>
    <script src="js/gachic.js"></script>
</head>
<body onclick="start_party()">
    <h1>It's bondage, gay website</h1>
    <p>Click on page to start</p>
    <main>
    </main>
    <br>
    <p>By strongleong to Kirya4444400000</p>
    <audio src="/audio/background.mp3" class="audio" id="background"></audio>
    <script>
        function start_party() {
            start_gachi = true;
            let audio = document.getElementById('background');
            audio.addEventListener('ended', function() {
                this.currentTime = 0;
                this.play();
            }, false);
            audio.volume = 0.2;
            audio.play();
        }
    </script>
</body>
</html>