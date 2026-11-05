// Mirrored from the club's WooCommerce store (glasgowtigers.co.uk/tigers-shop). Prices in pence.
const ADULT = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"];
const KIDS = ["7-8", "9-10", "11-12", "13-14"];
const SIZE_NAMES = { XS: "Extra small", S: "Small", M: "Medium", L: "Large", XL: "Extra large", "2XL": "2X large", "3XL": "3X large", "4XL": "4X large" };
const pick = (from, keep) => from.filter(s => keep.includes(s));
const img = path => "https://glasgowtigers.co.uk/wp-content/uploads/" + path;

const PRODUCTS = [
  { id: 31766, name: "2026 Replica T-Shirt", cat: "Adults", price: 2900, was: 3600, sizes: pick(ADULT, ["S", "M", "L", "XL", "2XL", "3XL", "4XL"]), imgs: ["2026/05/Replica-front.png", "2026/05/Replica-back.png"], desc: "Your turn to be one of the team with the 2026 replicas based on the team's kevlars.", featured: 1 },
  { id: 31812, name: "2026 Replica Kids", cat: "Kids", price: 2400, was: 3000, sizes: KIDS, imgs: ["2026/05/Replica-front.png", "2026/05/Replica-back.png"], desc: "Show the team your support in a 2026 replica shirt.", featured: 2 },
  { id: 31773, name: "Red Puffer Jacket (Men's)", cat: "Adults", price: 6400, was: 8000, sizes: ADULT, imgs: ["2026/05/Red-Puffer-Jacket.jpg", "2026/05/Red-Puffer-Jacket-KJP.jpg"], desc: "Our 2026 puffer jacket with detachable hood, elastic bindings along the edges and zipped pockets.", featured: 3 },
  { id: 31795, name: "Red Puffer Jacket (Ladies)", cat: "Adults", price: 6400, was: 8000, sizes: ADULT, imgs: ["2026/05/Red-Puffer-Jacket.jpg"], desc: "Our 2026 puffer jacket with detachable hood, elastic bindings along the edges and zipped pockets.", featured: 4 },
  { id: 31786, name: "Red 1/2 Zip 2026", cat: "Adults", price: 3600, was: 4500, sizes: pick(ADULT, ["S", "M", "L", "XL", "2XL", "3XL"]), imgs: ["2026/05/1_2-ZIP.jpg", "2026/05/1_2-ZIP-back.jpg"], desc: "Red long-sleeved 1/2 zip top with Tigers branding.", featured: 5 },
  { id: 31776, name: "Tigers Scarf 2026", cat: "Accessories", price: 2000, imgs: ["2026/05/Scarf.png", "2026/05/Scarf-Bomber.jpg"], desc: "Bespoke 2026 Glasgow Tigers scarf, matching the 2026 pom pom hat.", featured: 6 },
  { id: 31775, name: "Pom Pom Hat 2026", cat: "Accessories", price: 2000, imgs: ["2026/05/Pom-Pom-beanie-2026.jpg", "2026/05/Beanie-2026.jpg"], desc: "Bespoke hat with contrasting pom pom and striped cuff.", featured: 7 },
  { id: 31772, name: "Skip Cap 2026", cat: "Accessories", price: 2000, imgs: ["2026/05/Skip-Hat.jpg", "2026/05/Skip-Hat-Sam.jpg", "2026/05/Skip-Hat-Sam-2.jpg"], desc: "Competition cap with 2026 embroidery.", featured: 8 },
  { id: 31808, name: "Red Jacket Kids 2026", cat: "Kids", price: 3200, was: 4000, sizes: ["M", "L", "XL"], sizeLabel: "Kids' size", imgs: ["2025/04/Red-jacket.jpg"], desc: "Showerproof jacket for keeping the kids dry in a downpour." },
  { id: 31314, name: "I'm a Glasgow Faithful T-Shirt (Kids)", cat: "Kids", price: 1300, was: 1600, sizes: ["M", "L"], sizeLabel: "Kids' size", imgs: ["2025/12/Traitors-Black_Front.jpg", "2025/12/Traitors-Black_Back.jpg"], desc: "Limited-edition t-shirt celebrating the launch of the 2026 Glasgow Tigers Faithful." },
  { id: 30209, name: "Tigers 1/4 Zip", cat: "Adults", price: 3600, was: 4500, sizes: pick(ADULT, ["S", "M", "L", "XL", "2XL", "3XL", "4XL"]), imgs: ["2025/04/Zip-Top.jpg", "2025/04/Zip-Top-2.jpg"], desc: "Black long-sleeved, fleece-lined 1/4 zip top with Tigers branding." },
  { id: 29098, name: "Bodywarmer", cat: "Adults", price: 4000, was: 5000, sizes: pick(ADULT, ["XS", "S", "M", "L", "XL", "2XL", "3XL"]), imgs: ["2024/04/Gilet.jpg"], desc: "Red padded bodywarmer, ideal for keeping you warm on race nights." },
  { id: 30223, name: "2025 Replica", cat: "Adults", price: 2800, was: 3500, sizes: pick(ADULT, ["S", "M", "L", "XL", "2XL", "3XL", "4XL"]), imgs: ["2025/04/REPLICA-FRONT.jpg", "2025/04/REPLICA-BACK.jpg"], desc: "The 2025 replica, based on the team's kevlars.", soldOut: true },
  { id: 29076, name: "Adults Replica 2024", cat: "Adults", price: 2500, was: 3500, sizes: pick(ADULT, ["XS", "S", "M", "L", "XL", "2XL", "3XL"]), imgs: ["2024/04/Replica-front.jpg", "2024/04/Replica-back.jpg"], desc: "The 2024 replica, based on the team's kevlars." },
  { id: 27640, name: "Plush Roary", cat: "Accessories", price: 1400, imgs: ["2024/04/Plush-Tiger.jpg"], desc: "Plush tiger teddy with a bespoke t-shirt." },
  { id: 31868, name: "Tigers Autograph Book", cat: "Accessories", price: 550, imgs: ["2026/05/Autograph-book.jpg"], desc: "Compact autograph book, perfect for race nights and fan events." },
  { id: 25897, name: "Tigers Scarf #WeAreGlasgow", cat: "Accessories", price: 1200, imgs: ["2022/05/Scarf-1.jpg", "2022/05/Broc-scarf.jpg"], desc: "Glasgow Tigers scarf featuring our slogan \"WeAreGlasgow\"." },
  { id: 27637, name: "Tigers Seat Pad", cat: "Accessories", price: 1400, imgs: ["2023/03/20.jpg"], desc: "Ideal for using both at the track and at home." },
  { id: 27643, name: "Tigers Sports Bottle", cat: "Accessories", price: 800, imgs: ["2023/03/21.jpg"], desc: "Tigers sports bottle." },
  { id: 25436, name: "Tigers Water Bottle", cat: "Accessories", price: 700, imgs: ["2022/04/bottle-wrap.jpg"], desc: "Ideal for taking to the track, work or even school." },
  { id: 26104, name: "Foam Finger", cat: "Accessories", price: 500, imgs: ["2022/05/foam-hand-Red.jpg"], desc: "Cheer on your favourite riders with this large red foam finger." },
  { id: 26389, name: "Tigers Lanyard", cat: "Accessories", price: 200, imgs: ["2022/06/tigers-lanyard.jpg"], desc: "Tigers branded lanyard.", soldOut: true },
  { id: 26387, name: "Tigers Ballpoint Pen", cat: "Accessories", price: 150, imgs: ["2022/06/tigers-pen.jpg"], desc: "Tigers branded ballpoint pen." },
  { id: 25426, name: "Gift Card", cat: "Accessories", price: 1000, amounts: [1000, 2000, 5000, 10000, 20000], imgs: ["2022/04/Gift-Cards.jpg", "2022/03/GiftCard-1.jpg"], desc: "Let them choose. Spend it on anything in the Tigers shop." }
].map(p => ({ ...p, imgs: p.imgs.map(img) }));
