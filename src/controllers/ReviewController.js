import ReviewService from "../services/ReviewService.js";
import ResponseDataBuilder from "../models/ResponseData.js";

class ReviewController {
    constructor() {
        this.reviewService = new ReviewService();
    }

    findAll = async (req, res) => {
        const productId = req.query.productId;
        const userId = req.query.userId;
        const filters = req.query.filters;
        
        const query = productId ? { productId: parseInt(productId) } : {};
        const orderBy = {};
        
        if (userId) {
            query.userId = userId
        }
        
        if (filters) {
            switch (filters) {
              case "highestRating":
                orderBy.rating = "desc"
                break;  
              case "lowestRating":
                orderBy.rating = "asc"
                break;
                case "mostRecent":
                  orderBy.createdAt = "desc"
                break;
              case "oldest":
                orderBy.createdAt = "asc"
                break;
              default:  
                break;
            }
        }
      
        const reviews = await this.reviewService.find(query, orderBy);
        const count = await this.reviewService.count(query);

        const data = new ResponseDataBuilder()
          .setData({
            reviews,
            count
          })
          .setStatus(200)
          .setMsg("Reviews found")
          .build();
  
        return res.json(data);
    };
    
    findOne = async (req, res) => {
        const id = req.params.id;
        const review = await this.reviewService.findOne(id);
        res.status(200).json(review);
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