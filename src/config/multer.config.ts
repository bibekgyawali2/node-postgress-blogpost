import multer, { StorageEngine } from 'multer';
import path from 'path';

class MulterConfig {
    private storage: StorageEngine;

    constructor() {

        this.storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, path.join(__dirname, '../uploads'));
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
            },
        });
    }


    public getUploadInstance() {
        return multer({
            storage: this.storage,
            fileFilter: (req, file, cb) => {

                const allowedTypes = /jpeg|jpg|png|gif|pdf/;
                const isValidExt = allowedTypes.test(path.extname(file.originalname).toLowerCase());
                const isValidMime = allowedTypes.test(file.mimetype);

                if (isValidExt && isValidMime) {
                    cb(null, true);
                } else {
                    cb(new Error('File type not allowed!'));
                }
            },
            limits: { fileSize: 5 * 1024 * 1024 }, // File size limit: 5MB

        });

    }
}

export default MulterConfig;
