import AddressService from "../services/AddressService.js";


class AddressController {
    constructor() {
        this.addressService = new AddressService();
    }
    
    findByUser = async (req, res) => {
        const addresses = await this.addressService.find({
            userId: req.id,
        });
        res.json(addresses);
    };

    create = async (req, res) => {
        const {
          address_line_1,
          country,
          city,
          postal_code,
        } = req.body;
    
        const address = await this.addressService.create({
          address_line_1,
          country,
          city,
          postal_code,
          userId: req.id,
          title: `${city} - ${address_line_1}`,
        });
    
        res.status(201).json(address);
    };
    
    delete = async (req, res) => {
        const id = parseInt(req.params.id);
        const userId = req.id;
        const address = await this.addressService.delete(id, userId);
    
        if (!address) {
        return res.status(404).json({ msg: "Address not found" });
        }
    
        res.json({ msg: "Address deleted" });
    };
    
    update = async (req, res) => {
        const id = parseInt(req.params.id);
        const userId = req.id;
        const data = req.body;
        const address = await this.addressService.update(id, userId, data);
    
        if (!address) {
            return res.status(404).json({ msg: "Address not found" });
        }
    
        res.json(address);
    };
}

export default AddressController;