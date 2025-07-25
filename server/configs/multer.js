import multer from 'multer';
const storage = multer.diskStorage({});
const upload = multer({limits: { fileSize: 25 * 1024 * 1024 }, storage });
export default upload 