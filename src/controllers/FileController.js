import excelToJson from "../utils/excelToJson.js";
import ResponseDataBuilder from "../models/ResponseData.js";
import FileService from "../services/FileService.js";
import ProductionOrderService from "../services/ProductionOrderService.js";

class FileController {
    constructor() {
        this.fileService = new FileService();
        this.productionOrderService = new ProductionOrderService();
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
        const formattedData = this.getFromExcel(excelData);
        const order = this.getOrder(formattedData);
        const productionOrder = await this.productionOrderService.findOne(order);

        if(productionOrder){
            const data = new ResponseDataBuilder()
            .setData(null)
            .setStatus(400)
            .setMsg("Order already exists")
            .build();
            return res.json(data);
        }

        const result = await this.fileService.create(formattedData, order, req.id);
        const data = new ResponseDataBuilder()
        .setData(result)
        .setStatus(200)
        .setMsg("File uploaded")
        .build();
        res.json(data);
    };

    getFromExcel(data){
        let category, order;
        let datos = [];
        for(let row in data) {
            for(let key in data[row]) {
                if(data[row][key].Orden) order = data[row][key].Orden;
                if(data[row][key].Categoria) category = data[row][key].Categoria;
                datos.push({
                    production_id: order,
                    name: data[row][key].Nombre,
                    category_name: category,
                    subcategory_name: data[row][key].Subcategoria,
                    size: "" + data[row][key].Talla,
                    color: data[row][key].Color,
                    sku: data[row][key].Nombre + " " + category + " " + data[row][key].Talla + " " + data[row][key].Color,
                    quantity: data[row][key].Cantidad,
                    price: data[row][key].Precio,
                });
            }
        }
        return datos;
    }

    getOrder(data){
        let order;
        for(let row in data) {
            order = data[row].production_id;
            break;
        }
        return "" + order;
    }
}


export default FileController;