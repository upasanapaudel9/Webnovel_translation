const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../public/novelCovers');
        
        // Ensure the directory exists or create it
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    
    filename: function (req, file, cb) {
        // Validate if the file is provided
        if (!file) {
            const errorMessage = 'Cover file is required';
            console.log(errorMessage);
            return cb(new Error(errorMessage));
        }

        // Validate if the title is provided
        if (!req.body.title) {
            const errorMessage = 'Title is required in the request body';
            console.log(errorMessage);
            return cb(new Error(errorMessage));
        }

        // Dynamically determine file extension based on MIME type
        const fileExtension = file.mimetype.split('/')[1];
        const novelFileName = `${req.body.title}.${fileExtension}`;
        
        console.log('File name:', novelFileName);
        cb(null, novelFileName);
    }
});

// Set file size limit (e.g., 5MB)
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

module.exports = upload;
