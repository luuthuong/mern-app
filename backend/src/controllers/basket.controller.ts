import {Request, Response} from "express";

class BasketController {
    async getBasketById(req: Request, res: Response) {
        return res.status(200).json({
            code: 200,
            status: 'success',
            data: {
                id: 0,
                name: "basket 1 - id:" + req.params?.id?.toString()
            }
        })
    }
}

export default new BasketController();