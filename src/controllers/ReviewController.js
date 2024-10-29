import ReviewService from "../services/ReviewService.js";

class ReviewController {
    constructor() {
        this.reviewService = new ReviewService();
    }
    
    findByUser = async (req, res) => {
        const reviews = await this.reviewService.find({
            userId: req.id,
        });
        res.status(200).json(reviews);
    };

    create = async (req, res) => {
        const data = req.body;
    
        const review = await this.reviewService.create(data);
    
        res.status(201).json(review);
    };
    
    delete = async (req, res) => {
        const id = parseInt(req.params.id);
        const userId = req.id;
        const review = await this.reviewService.delete(id, userId);
    
        if (!review) {
        return res.status(404).json({ msg: "Review not found" });
        }
    
        res.json({ msg: "Review deleted" });
    };
    
    update = async (req, res) => {
        const id = parseInt(req.params.id);
        const userId = req.id;
        const data = req.body;
        const review = await this.reviewService.update(id, userId, data);
    
        if (!review) {
            return res.status(404).json({ msg: "Review not found" });
        }
    
        res.json(review);
    };
    
}

export default ReviewController;