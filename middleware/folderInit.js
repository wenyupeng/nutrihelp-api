const fs = require("fs");
const path = require("path");

// upload directory ./upload
const uploadsDir = path.join(__dirname, "..", "uploads");
// temporary directory ./upload/tmp
const tempDir = path.join(uploadsDir, "temp");

function ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Created directory: ${dirPath}`);
    }
}

// Function to clean up old temporary files
function cleanupOldFiles() {
    const now = Date.now();
    const ONE_DAY = 24 * 60 * 60 * 1000;

    try {
        const files = fs.readdirSync(tempDir);
        let deleted = 0;

        files.forEach(file => {
            const filePath = path.join(tempDir, file);
            const stats = fs.statSync(filePath);
            if (now - stats.mtimeMs > ONE_DAY) {
                fs.unlinkSync(filePath);
                deleted++;
            }
        });

        if (deleted > 0) {
            console.log(`Cleaned up ${deleted} old files.`);
        }
    } catch (err) {
        console.error("Cleanup error:", err);
    }
}

function init() {
    ensureDirectoryExists(uploadsDir);
    ensureDirectoryExists(tempDir);
	// Clean up temporary files on startup
    cleanupOldFiles();
	// Schedule cleanup to run every 3 hours
    setInterval(cleanupOldFiles, 3 * 60 * 60 * 1000);
}

module.exports = { init };