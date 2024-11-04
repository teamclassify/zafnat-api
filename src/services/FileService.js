import { connect } from "http2";
import prisma from "../config/prisma.js";

class FileService {

  async create(data) {
    let results = [];
    const formattedData = this.getFromExcel(data);
    formattedData.forEach(async (element) => {
        const query = prisma.productSku.findMany({
            where: {
                sku: element.sku
            }
        });
        //console.log(query);
        let product_sku;
        if(!query.data){
            product_sku = await prisma.productSku.create({
                data: {
                    product: {
                        connectOrCreate: {
                            where: { name: element.name + " " + element.category_name },
                            create: { 
                                name: element.name + " " + element.category_name,
                                product:{
                                    connectOrCreate: {
                                        where: { name: element.name },
                                        create: { name: element.name }
                                    }
                                },
                                category:{
                                    connectOrCreate: {
                                        where: { name: element.category_name },
                                        create: { name: element.category_name }
                                    }
                                }
                            }
                        }
                    },
                    size_attribute: {
                        connectOrCreate: {
                            where: { value: "" + element.size },
                            create: { 
                                type: "Talla",
                                value: "" + element.size
                            }
                        }
                    },
                    color_attribute: {
                        connectOrCreate: {
                            where: { value: element.color },
                            create: { 
                                type: "Color",
                                value: element.color
                            }
                        }
                    },
                    sku: element.sku,
                    price: element.price,
                    quantity: element.quantity,
                }
            });
        }
        results.push(product_sku);
    });
    console.log("CREADOS: ", results);
    return results;
  }

  getFromExcel(data){
    let date, category, order;
    let datos = [];
    for(let row in data) {
        for(let key in data[row]) {
            if(data[row][key].Orden) order = data[row][key].Orden;
            if(data[row][key].Fecha) date = data[row][key].Fecha;
            if(data[row][key].Categoria) category = data[row][key].Categoria;
            datos.push({
                production_id: order,
                name: data[row][key].Nombre,
                category_name: category,
                subcategory_name: data[row][key].Subcategoria,
                size: data[row][key].Talla,
                color: data[row][key].Color,
                sku: data[row][key].Nombre + " " + category + " " + data[row][key].Talla + " " + data[row][key].Color,
                quantity: data[row][key].Cantidad,
                price: data[row][key].Precio,
            });
        }
    }
    return datos;
  }

}

export default FileService;