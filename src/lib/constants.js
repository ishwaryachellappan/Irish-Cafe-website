export const CAFE = {
  name: "The Irish Cafe",
  rating: 4.2,
  reviews: 453,
  address: "558 4th, Karumbalai Main Rd, Mellur, KK Nagar, Madurai, Tamil Nadu 625020",
  phoneDisplay: "081489 87007",
  tel: "tel:+918148987007",
  whatsapp: "https://wa.me/918148987007",
};

const enc = encodeURIComponent(CAFE.address);
export const MAP_EMBED = `https://www.google.com/maps?q=${enc}&output=embed`;
export const DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${enc}`;

// Search links until the cafe gives you its real listing URLs
export const SWIGGY = "https://www.swiggy.com/search?query=The%20Irish%20Cafe%20Madurai";
export const ZOMATO = "https://www.zomato.com/madurai/restaurants?q=The+Irish+Cafe";


export const NAV_LINKS = [
  { label: "Menu", id: "menu" },
  { label: "The Hearth", id: "hearth" },
  { label: "Reviews", id: "reviews" },
  { label: "Visit", id: "visit" },
];