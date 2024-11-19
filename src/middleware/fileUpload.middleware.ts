import { Request, Response, NextFunction } from "express";
import MulterConfig from "../config/multer.config";
import Print from "../utils/print";

class MulterMiddleware {
    private multerConfig: MulterConfig;

    constructor() {
        this.multerConfig = new MulterConfig();
    }

    handleSingleFile(fieldName: string) {
        const upload = this.multerConfig.getUploadInstance().single(fieldName);

        return (req: Request, res: Response, next: NextFunction) => {
            const originalBody = { ...req.body };
            upload(req, res, (err: any) => {
                if (err) {
                    return res.status(400).json({
                        status: "error",
                        message: err.message,
                    });
                }
                req.body = { ...originalBody, ...req.body };
                if (req.file) {
                    req.body[fieldName] = req.file.path;
                }

                next();
            });
        };
    }
}

export default MulterMiddleware;
