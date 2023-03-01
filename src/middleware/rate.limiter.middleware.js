const rateLimiter = require('express-rate-limit');

const uploadLimiter = rateLimiter({
    windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
    max: 10000,
    message: {
        message: 'Too many upload requests maid from this IP. You have exceeded the 10000 requests in 24 hrs limit!',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

const downloadLimiter = rateLimiter({
    windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
    max: 10000,
    message: {
        message: 'Too many download requests maid from this IP. You have exceeded the 10000 requests in 24 hrs limit!',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = {
    uploadLimiter,
    downloadLimiter,
}
