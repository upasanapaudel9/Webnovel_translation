const multer = require('multer');
const path = require('path');

// Set up multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/upload/');
    },
    filename: function (req, file, cb) {
        // Dynamically determine file extension based on MIME type
        const fileExtension = file.mimetype.split('/')[1]; // e.g., 'jpeg', 'png'
        const novelFileName = `${req.body.title}.${fileExtension}`;
        cb(null, novelFileName);
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
