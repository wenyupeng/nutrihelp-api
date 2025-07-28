// business error
exports.clientError = (err, req, res, next) => {
    if (err) {
        res.status(400).json({ error: err.message });
    } else {
        next();
    }
};

// server error
exports.serverError = (err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal server error" });
};
