const { json } = require('express');

const db = require('../config/db').connect();

exports.getItems = async () => {
    console.log(db)
    return [{
        "_id": "5f0bf3a4b35fbb494ccff5b0",
        "name": "TOM AND JERRY",
        "price": 100,
        "type": "TEE",
        "size": ["S", "M", "L"],
        "color": ["Black", "Red"],
        "images": ["https://ae01.alicdn.com/kf/Hff205c13b2cb409393595c7d71aea9438/2020-Summer-t-shirt-women-clothes-Korean-rainbow-striped-tshirt-Short-Sleeve-Hong-Kong-Style-Casual.jpg", "https://ae01.alicdn.com/kf/H4faa76372a814b709b7b0e6f32499eabj/2020-Summer-t-shirt-women-clothes-Korean-rainbow-striped-tshirt-Short-Sleeve-Hong-Kong-Style-Casual.jpg", "https://ae01.alicdn.com/kf/H12b7b5153e834e729f2d059286e92bb0O/2020-Summer-t-shirt-women-clothes-Korean-rainbow-striped-tshirt-Short-Sleeve-Hong-Kong-Style-Casual.jpg", "https://ae01.alicdn.com/kf/H166548002739476998a5d383e782a6248/2020-Summer-t-shirt-women-clothes-Korean-rainbow-striped-tshirt-Short-Sleeve-Hong-Kong-Style-Casual.jpg", "https://ae01.alicdn.com/kf/H052c9c600d0c4055b65c43669481a3d6P/2020-Summer-t-shirt-women-clothes-Korean-rainbow-striped-tshirt-Short-Sleeve-Hong-Kong-Style-Casual.jpg", "https://ae01.alicdn.com/kf/H052c9c600d0c4055b65c43669481a3d6P/2020-Summer-t-shirt-women-clothes-Korean-rainbow-striped-tshirt-Short-Sleeve-Hong-Kong-Style-Casual.jpg"]
    },
    {
        "_id": "5f0bf3a4b35fbb494ccff5b0",
        "name": "TOM AND JERRY",
        "price": 100,
        "type": "TEE",
        "size": ["S", "M", "L"],
        "color": ["Black", "Red"],
        "images": ["https://ae01.alicdn.com/kf/Hff205c13b2cb409393595c7d71aea9438/2020-Summer-t-shirt-women-clothes-Korean-rainbow-striped-tshirt-Short-Sleeve-Hong-Kong-Style-Casual.jpg", "https://ae01.alicdn.com/kf/H4faa76372a814b709b7b0e6f32499eabj/2020-Summer-t-shirt-women-clothes-Korean-rainbow-striped-tshirt-Short-Sleeve-Hong-Kong-Style-Casual.jpg", "https://ae01.alicdn.com/kf/H12b7b5153e834e729f2d059286e92bb0O/2020-Summer-t-shirt-women-clothes-Korean-rainbow-striped-tshirt-Short-Sleeve-Hong-Kong-Style-Casual.jpg", "https://ae01.alicdn.com/kf/H166548002739476998a5d383e782a6248/2020-Summer-t-shirt-women-clothes-Korean-rainbow-striped-tshirt-Short-Sleeve-Hong-Kong-Style-Casual.jpg", "https://ae01.alicdn.com/kf/H052c9c600d0c4055b65c43669481a3d6P/2020-Summer-t-shirt-women-clothes-Korean-rainbow-striped-tshirt-Short-Sleeve-Hong-Kong-Style-Casual.jpg", "https://ae01.alicdn.com/kf/H052c9c600d0c4055b65c43669481a3d6P/2020-Summer-t-shirt-women-clothes-Korean-rainbow-striped-tshirt-Short-Sleeve-Hong-Kong-Style-Casual.jpg"]
    }
    ]
};