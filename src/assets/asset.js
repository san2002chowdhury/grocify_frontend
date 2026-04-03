import logo from "./logo.png";
import searchIcon from "./search_icon.svg";
import cartIcon from "./nav_cart_icon.svg";
import cartIconForCard from "./cart_icon.svg";
import menuIcon from "./menu_icon.svg";
import profileIcon from "./profile_icon.png";
import mainBannerBg from "./main_banner_bg.png";
import mainBannerBgSm from "./main_banner_bg_sm.png";
import whiteArrowIcon from "./white_arrow_icon.svg";
import blackArrowIcon from "./black_arrow_icon.svg";
import starIcon from "./star_icon.svg";
import starIconDull from "./star_dull_icon.svg";
import bottomBanner from "./bottom_banner_image.png";
import bottomBannerSm from "./bottom_banner_image_sm.png";
import deliveryTruckIcon from "./delivery_truck_icon.svg"
import trustIcon from "./trust_icon.svg";
import coinIcon from "./coin_icon.svg";
import leafIcon from "./leaf_icon.svg";
import loginSvgIcon from "./loginSvg.png";
import loginSvgIcon1 from "./loginSvg1.png";
import rightArrowIcon from "./rightArrowIcon.png";
import leftArrowIcon from "./leftArrowIcon.png";
import confirmIcon from "./confirmIcon.png";
import errorIcon from "./errorIcon.png"
import mailIcon from "./mailIcon.png";
import addIcon from "./add_icon.svg";
import productlistIcon from "./product_list_icon.svg"
import orderIcon from "./order_icon.svg";
import uploadIcon from "./upload_area.png";
import boxIcon from "./box_icon.svg";
import removeIcon from "./remove_icon.svg";
import arrowIconColored from "./arrow_right_icon_colored.png";

export const assest = {
    logo,
    searchIcon,
    cartIcon,
    cartIconForCard,
    menuIcon,
    profileIcon,
    mainBannerBg,
    mainBannerBgSm,
    whiteArrowIcon,
    blackArrowIcon,
    starIcon,
    starIconDull,
    bottomBanner,
    bottomBannerSm,
    loginSvgIcon,
    loginSvgIcon1,
    leftArrowIcon,
    rightArrowIcon,
    confirmIcon,
    errorIcon,
    mailIcon,
    uploadIcon,
    boxIcon,
    removeIcon,
    arrowIconColored
}




export const features = [
    {
        icon: deliveryTruckIcon,
        title: "Fastest Delivery",
        description: "Groceries delivered in under 30 minutes.",
    },
    {
        icon: leafIcon,
        title: "Freshness Guaranteed",
        description: "Fresh produce straight from the source.",
    },
    {
        icon: coinIcon,
        title: "Affordable Prices",
        description: "Quality groceries at unbeatable prices.",
    },
    {
        icon: trustIcon,
        title: "Trusted by Thousands",
        description: "Loved by 10,000+ happy customers.",
    },
];

export const footerLinks = [
    {
        title: "Quick Links",
        links: [
            { text: "Home", url: "#" },
            { text: "Best Sellers", url: "#" },
            { text: "Offers & Deals", url: "#" },
            { text: "Contact Us", url: "#" },
            { text: "FAQs", url: "#" },
        ],
    },
    {
        title: "Need help?",
        links: [
            { text: "Delivery Information", url: "#" },
            { text: "Return & Refund Policy", url: "#" },
            { text: "Payment Methods", url: "#" },
            { text: "Track your Order", url: "#" },
            { text: "Contact Us", url: "#" },
        ],
    },
    {
        title: "Follow Us",
        links: [
            { text: "Instagram", url: "#" },
            { text: "Twitter", url: "#" },
            { text: "Facebook", url: "#" },
            { text: "YouTube", url: "#" },
        ],
    },
];

export const searchSuggestions = [
    "Tomato",
    "Onion",
    "Potato",
    "Mango",
    "Watermelon",
    "Milk",
    "Bread",
    "Ghee",
    "Paneer",
    "Coca Cola",
    "Sprite",
    "Maggi",
    "Pasta",
    "Lays",
    "Kurkure",
    "Ice Cream",
    "Wheat Atta",
    "Moong Dal",
    "Basmati Rice",
    "Mustard Oil",
    "Turmeric Powder",
    "Green Tea",
    "Nescafe coffee",
    "Shampoo",
    "Toothpaste",
    "Floor Cleaner",
    "Diapers",
    "Baby Lotion",
    "Dog Food",
    "Caty Food"
];

export const sidebarLinks = [
    { name: "Add Product", path: "/admin", icon: addIcon },
    { name: "Product List", path: "/admin/product_list", icon: productlistIcon },
    { name: "Orders", path: "/admin/orders", icon: orderIcon },
];

export const currencySign = "₹"