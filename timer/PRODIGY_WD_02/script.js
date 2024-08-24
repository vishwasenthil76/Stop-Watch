<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stopwatch</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f0f0f0;
        }

        .stopwatch {
            text-align: center;
        }

        #display {
            font-size: 3em;
            margin-bottom: 20px;
        }

        .controls {
            margin-bottom: 20px;
        }

        button {
            font-size: 1em;
            padding: 10px 20px;
            margin: 5px;
            cursor: pointer;
        }

        #lap-list {
            list-style: none;
            padding: 0;
            margin-top: 20px;
        }

        #lap-list li {
            padding: 5px 0;
            border-bottom: 1px solid #ddd;
        }
    </style>
</head>
<body>
    <div class="stopwatch">
        <div id="display">00:00:00</div>
        <div class="controls">
            <button id="start">Start</button>
            <button id="pause">Pause</button>
            <button id="reset">Reset</button>
            <button id="lap">Lap</button>
        </div>
        <div id="laps">
            <h3>Lap Times</h3>
            <ul id="lap-list"></ul>
        </div>
    </div>
    <script>
        let timer;
        let elapsedTime = 0;
        let isRunning = false;

        const display = document.getElementById('display');
        const lapList = document.getElementById('lap-list');

        document.getElementById('start').addEventListener('click', start);
        document.getElementById('pause').addEventListener('click', pause);
        document.getElementById('reset').addEventListener('click', reset);
        document.getElementById('lap').addEventListener('click', recordLap);

        function start() {
            if (!isRunning) {
                isRunning = true;
                timer = setInterval(updateTime, 1000);
            }
        }

        function pause() {
            clearInterval(timer);
            isRunning = false;
        }

        function reset() {
            clearInterval(timer);
            isRunning = false;
            elapsedTime = 0;
            display.innerText = formatTime(elapsedTime);
            lapList.innerHTML = '';
        }

        function updateTime() {
            elapsedTime++;
            display.innerText = formatTime(elapsedTime);
        }

        function formatTime(seconds) {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const secs = seconds % 60;
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }

        function recordLap() {
            if (isRunning) {
                const lapTime = formatTime(elapsedTime);
                const lapItem = document.createElement('li');
                lapItem.textContent = `Lap ${lapList.children.length + 1}: ${lapTime}`;
                lapList.appendChild(lapItem);
            }
        }
    </script>
</body>
</html>
