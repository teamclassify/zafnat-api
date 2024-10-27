import SocialMediaService from "../services/SocialMediaService.js";

class SocialMediaController {
    constructor() {
        this.socialMediaService = new SocialMediaService();
    }

    findAll = async (req, res) => {
        const socialMedia = await this.socialMediaService.find({});
        res.json(socialMedia);
    };

    findOne = async (req, res) => {
        const id = req.params.id;
        const socialMedia = await this.socialMediaService.findOne(id);
        res.json(socialMedia);
    }

    create = async (req, res) => {
        const data = req.body;
        const socialMedia = await this.socialMediaService.create(data);
        res.json(socialMedia);
    }

    update = async (req, res) => {
        const id = parseInt(req.params.id);
        const data = req.body;
        const socialMedia = await this.socialMediaService.update(id, data);
        res.json(socialMedia);
    }
}

export default SocialMediaController;