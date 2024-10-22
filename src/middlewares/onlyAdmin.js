import verifyIsAdmin from "../utils/verifyIsAdmin.js";
import ResponseDataBuilder from "../models/ResponseData.js";

const onlyAdmin = async (req, res, next) => {
    const isAdmin = await verifyIsAdmin(req, res);
    
    if (!isAdmin) {
        const data = new ResponseDataBuilder()
        .setData(null)
        .setStatus(401)
        .setMsg("Unauthorized")
        .build();
    
        return res.json(data);
    }
    
    next();
}

export default onlyAdmin;
