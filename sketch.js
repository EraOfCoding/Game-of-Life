function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function create2DArray(columns, rows) {
    let array = new Array(columns)

    for (let i = 0; i < array.length; i++) {
        array[i] = new Array(rows)
    }

    return array
}

let grid
let columns
let rows
let resolution = 10
let start = false
let bgSong

function preload() {
    soundFormats('mp3')
    bgSong = loadSound('ward')
}

function setup() {
    let canvas = createCanvas(1500, 710)
    canvas.mousePressed(canvasPressed)
    canvas.text('Tap to start', 710, 200)

    canvas.text('')

    columns = width / resolution
    rows = height / resolution

    grid = create2DArray(columns, rows)

    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = Math.floor(Math.random() * 2)
        }
    }
}

function draw() {
    if (start) {

        background(255)

        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                let x = i * resolution
                let y = j * resolution

                if (grid[i][j] == 1) {
                    fill(0)
                    stroke(255)
                    rect(x, y, resolution, resolution)
                }
            }
        }

        let next = create2DArray(columns, rows)
        let nSum = 0

        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                if (j + 1 < rows) {
                    nSum += grid[i][j + 1]
                }
                if (j - 1 >= 0) {
                    nSum += grid[i][j - 1]
                }
                if (i + 1 < columns) {
                    nSum += grid[i + 1][j]
                }
                if (i + 1 < columns && j + 1 < rows) {
                    nSum += grid[i + 1][j + 1]
                }
                if (i + 1 < columns && j - 1 >= 0) {
                    nSum += grid[i + 1][j - 1]
                }
                if (i - 1 >= 0) {
                    nSum += grid[i - 1][j]
                }
                if (i - 1 >= 0 && j + 1 < rows) {
                    nSum += grid[i - 1][j + 1]
                }
                if (i - 1 >= 0 && j - 1 >= 0) {
                    nSum += grid[i - 1][j - 1]
                }

                if (grid[i][j] == 0) {
                    if (nSum == 3) next[i][j] = 1
                    else next[i][j] = 0
                }
                else {
                    if (nSum > 3 || nSum < 2) next[i][j] = 0
                    else next[i][j] = 1
                }
                nSum = 0

            }
        }

        grid = next
        sleep(100)
    }
}

function canvasPressed() {
    if (!start) {
        start = true
        bgSong.play()
        bgSong.setLoop(true)
    }
    else if (start) {
        start = false
        bgSong.pause()
        bgSong.setLoop(false)
    }
}
