const { app, BrowserWindow } = require('electron')
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

/**
 * Creates a new BrowserWindow and loads the application at http://localhost:3013.
 * @async
 * @returns {Promise<void>}
 */
async function createWindow() {
    await startNextServer().catch((err) => {
        console.error(err)
        app.quit()
    })

    const mainWindow = new BrowserWindow({
        width: 1440,
        height: 800,
    })

    mainWindow.loadURL(`http://localhost:3013`)
    mainWindow.webContents.openDevTools()
    mainWindow.setMenu(null)
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})


/**
 * Starts a Next.js server with the given options.
 * @returns {Promise<void>}
 */
async function startNextServer() {
    // TODO: Use process.env.NODE_ENV instead of hardcoded value.
    // const dev = process.env.NODE_ENV !== 'production'
    const dev = true
    const hostname = 'localhost'
    const port = 3013

    const nextApp = next({ dev, hostname, port })
    const handle = nextApp.getRequestHandler()

    await nextApp.prepare()

    createServer((req, res) => {
        const parsedUrl = parse(req.url, true)
        handle(req, res, parsedUrl)
    }).listen(port, hostname, (err) => {
        if (err) throw err
        console.log(`> Ready on http://${hostname}:${port} as ${dev ? 'development' : process.env.NODE_ENV}`)
    })
}
