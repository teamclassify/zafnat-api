import excelToJson from "../utils/excelToJson.js";
import ResponseDataBuilder from "../models/ResponseData.js";
import FileService from "../services/FileService.js";

class FileController {
    constructor() {
        this.fileService = new FileService();
    }
    
    upload = async (req, res) => {
        const file = req.file;
        if (!file) {
        const data = new ResponseDataBuilder()
            .setData(null)
            .setStatus(400)
            .setMsg("File not found")
            .build();
    
        return res.json(data);
    }
    
        const excelData = excelToJson(file);
        const result = this.fileService.create(excelData);
        const data = new ResponseDataBuilder()
        .setData(result)
        .setStatus(200)
        .setMsg("File uploaded")
        .build();
    
        res.json(data);
    };
}

export default FileController;