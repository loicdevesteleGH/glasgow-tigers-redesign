// Content mirrored from glasgowtigers.co.uk (2026 season). In production this would come from the CMS.
const UP = "https://glasgowtigers.co.uk/wp-content/uploads/";

const TEAMS = {
  "Glasgow Tigers": UP + "2024/03/Tigers_4stars_logo_FullColour-1.svg",
  "Edinburgh Monarchs": UP + "2018/08/logo-standalone.png",
  "Berwick Bandits": UP + "2015/03/Berwick-.png",
  "Plymouth Gladiators": UP + "2015/03/logo-sq.BatYghz_-1.png",
  "Workington Comets": UP + "2015/03/Workington_comets_logo.png",
  "Scunthorpe Scorpions": UP + "2015/03/Scunthorpe.png",
  "Poole Pirates": UP + "2020/01/Poole-1.png",
  "Oxford Cheetahs": UP + "2022/01/oxford_cheetahs_300x300.png",
  "Redcar Bears": UP + "2015/03/Redcar-Bears.png"
};

const LIVEIT = "https://events.liveit.io/glasgow-tigers-speedway/";

// Each meeting: date (ISO), competition, home, away, score [home, away], optional aggregate note + match info link.
const RESULTS = [
  { date: "2026-03-28", comp: "Ben Fund Bonanza", individual: "1st Dan Thompson, 2nd Kevin Juhl Pedersen", info: LIVEIT + "ben-fund-bonanza-2026/" },
  { date: "2026-04-10", comp: "BSN Series", home: "Edinburgh Monarchs", away: "Glasgow Tigers", score: [45, 45] },
  { date: "2026-04-17", comp: "BSN Series", home: "Glasgow Tigers", away: "Berwick Bandits", score: [51, 39], info: LIVEIT + "bsn-series-glasgow-tigers-v-berwick-bandits-2/" },
  { date: "2026-04-18", comp: "BSN Series", home: "Berwick Bandits", away: "Glasgow Tigers", score: [49, 41], agg: "Aggregate 92-88 to Tigers" },
  { date: "2026-04-24", comp: "MAXiCab KO Cup", home: "Glasgow Tigers", away: "Plymouth Gladiators", score: [47, 43], info: LIVEIT + "maxicab-ko-cup-quarter-finalglasgow-tigers-v-plymo/" },
  { date: "2026-04-25", comp: "MAXiCab KO Cup", home: "Plymouth Gladiators", away: "Glasgow Tigers", score: [51, 39], agg: "Aggregate 94-86 to Plymouth" },
  { date: "2026-05-03", comp: "BSN Series", home: "Glasgow Tigers", away: "Edinburgh Monarchs", score: [41, 49], agg: "Aggregate 94-86 to Edinburgh", info: LIVEIT + "bsn-series-glasgow-tigers-v-edinburgh-monarchs-3/" },
  { date: "2026-05-08", comp: "Championship", home: "Glasgow Tigers", away: "Plymouth Gladiators", score: [49, 41], info: LIVEIT + "cab-direct-championship-glasgow-tigers-v-plymout-4/" },
  { date: "2026-05-15", comp: "Championship", home: "Glasgow Tigers", away: "Workington Comets", score: [48, 42], info: LIVEIT + "cab-direct-championship-glasgow-tigers-v-working-3/" },
  { date: "2026-05-22", comp: "Championship", home: "Scunthorpe Scorpions", away: "Glasgow Tigers", score: [49, 41] },
  { date: "2026-05-27", comp: "Championship", home: "Poole Pirates", away: "Glasgow Tigers", score: [55, 35] },
  { date: "2026-05-30", comp: "FIM SGP Qualifier", individual: "Winner: Kai Huckenbeck", info: LIVEIT + "fim-sgp-qualifier-h/" },
  { date: "2026-06-13", comp: "Championship", home: "Berwick Bandits", away: "Glasgow Tigers", score: [46, 44] },
  { date: "2026-06-17", comp: "Championship", home: "Oxford Cheetahs", away: "Glasgow Tigers", score: [41, 49] },
  { date: "2026-06-20", comp: "Championship", home: "Workington Comets", away: "Glasgow Tigers", score: [39, 51], agg: "Aggregate 99-81 to Tigers" },
  { date: "2026-07-03", comp: "Championship", home: "Glasgow Tigers", away: "Oxford Cheetahs", score: [43, 23], agg: "Aggregate 92-64 to Tigers" },
  { date: "2026-07-11", comp: "Scottish Cup", home: "Glasgow Tigers", away: "Edinburgh Monarchs", score: [42, 48], info: LIVEIT + "scottish-cup-glasgow-tigers-v-edinburgh-monarchs-3/" },
  { date: "2026-07-17", comp: "Championship", home: "Glasgow Tigers", away: "Berwick Bandits", score: [52, 38], agg: "Aggregate 96-84 to Tigers", info: LIVEIT + "cab-direct-championship-glasgow-tigers-v-berwick-5/" },
  { date: "2026-07-31", comp: "Championship", home: "Glasgow Tigers", away: "Edinburgh Monarchs", score: [45, 45], info: LIVEIT + "cab-direct-championship-glasgow-tigers-v-edinbur-4/" },
  { date: "2026-08-07", comp: "Championship", home: "Edinburgh Monarchs", away: "Glasgow Tigers", score: [45, 45], agg: "Aggregate 90-90, Tigers win super heat 7-2" },
  { date: "2026-08-14", comp: "Championship", home: "Glasgow Tigers", away: "Redcar Bears", score: [48, 42], info: LIVEIT + "cab-direct-championship-glasgow-tigers-v-redcar--3/" },
  { date: "2026-08-21", comp: "Championship", home: "Glasgow Tigers", away: "Poole Pirates", score: [47, 43], agg: "Aggregate 98-82 to Poole", info: LIVEIT + "cab-direct-championship-glasgow-tigers-v-poole-p-4/" },
  { date: "2026-08-25", comp: "Championship", home: "Plymouth Gladiators", away: "Glasgow Tigers", score: [49, 41], agg: "Aggregate 95-94 to Tigers" },
  { date: "2026-08-28", comp: "Championship", home: "Redcar Bears", away: "Glasgow Tigers", score: [51, 39], agg: "Aggregate 93-87 to Redcar" },
  { date: "2026-09-04", comp: "Championship", home: "Glasgow Tigers", away: "Scunthorpe Scorpions", score: [50, 40], agg: "Aggregate 91-89 to Tigers", info: LIVEIT + "cab-direct-championship-glasgow-tigers-v-scuntho-5/" },
  { date: "2026-09-11", comp: "Play-Off Semi-Final", home: "Scunthorpe Scorpions", away: "Glasgow Tigers", score: [53, 37], agg: "1st leg" },
  { date: "2026-09-25", comp: "Play-Off Semi-Final", home: "Glasgow Tigers", away: "Scunthorpe Scorpions", score: [51, 39], agg: "Aggregate 92-88 to Scunthorpe", info: LIVEIT + "cab-direct-championship-semi-finalglasgow-tigers-2/" },
  { date: "2026-10-09", comp: "Scottish Cup", home: "Edinburgh Monarchs", away: "Glasgow Tigers", score: [47, 42], agg: "Aggregate 95-84 to Edinburgh" }
];

const RIDERS = [
  { name: "Chris Harris", img: UP + "2026/04/Chris-Harris.png", url: "https://glasgowtigers.co.uk/rider/chris-harris/", captain: true },
  { name: "Mario Hausl", img: UP + "2026/04/Mario.png", url: "https://glasgowtigers.co.uk/rider/mario-hausl/" },
  { name: "Leon Flint", img: UP + "2026/04/Leon-Flint.png", url: "https://glasgowtigers.co.uk/rider/leon-flint/" },
  { name: "Kevin Juhl Pedersen", img: UP + "2026/04/Kevin.png", url: "https://glasgowtigers.co.uk/rider/kevin-juhl-pedersen/" },
  { name: "Kyle Howarth", img: UP + "2026/04/Kyle.png", url: "https://glasgowtigers.co.uk/rider/kyle-howarth/" },
  { name: "Freddy Hodder", img: UP + "2026/04/Freddy.png", url: "https://glasgowtigers.co.uk/rider/rider-six/" },
  { name: "Sam Hagon", img: UP + "2026/04/Sam.png", url: "https://glasgowtigers.co.uk/rider/sam-hagon/" }
];

const NEWS = [
  { title: "In Pictures | Edinburgh v Glasgow, 9th October 2026", tag: "In Pictures", author: "Glasgow Tigers Photographers", date: "2026-10-10", img: UP + "2026/10/Edinburgh-v-Glasgow-09.10.26-11-scaled.jpeg", url: "https://glasgowtigers.co.uk/in-pictures-edinburgh-v-glasgow-9th-october-2026/" },
  { title: "Tigers go down at Armadale", tag: "Match Report", author: "Phil Lanning", date: "2026-10-10", img: UP + "2026/10/EDGLA_8-768x489.jpg", url: "https://glasgowtigers.co.uk/tigers-go-down-at-armadale/" },
  { title: "Tigers aim to go out “on a high”", tag: "Preview", author: "Phil Lanning", date: "2026-10-09", img: UP + "2026/10/HodderLoftusHagonHt2-768x463.jpg", url: "https://glasgowtigers.co.uk/tigers-aim-to-go-out-on-a-high/" },
  { title: "In Pictures | Glasgow v Scunthorpe, 25th September 2026", tag: "In Pictures", author: "Glasgow Tigers Photographers", date: "2026-09-26", img: UP + "2026/09/Glasgow-v-Scunthorpe-25.09.26-6-768x512.jpeg", url: "https://glasgowtigers.co.uk/in-pictures-glasgow-v-scunthorpe-25th-september-2026/" },
  { title: "Tigers “gutted” by semi defeat", tag: "Match Report", author: "Phil Lanning", date: "2026-09-26", img: UP + "2026/09/GLASCUN_15-scaled-e1790414949277.jpg", url: "https://glasgowtigers.co.uk/tigers-gutted-by-semi-defeat/" },
  { title: "Tigers need “something special”", tag: "Preview", author: "Phil Lanning", date: "2026-09-24", img: UP + "2026/09/HagonBattye-scaled.jpg", url: "https://glasgowtigers.co.uk/tigers-need-something-special-3/" },
  { title: "“Mountain to climb” for Tigers", tag: "Match Report", author: "Phil Lanning", date: "2026-09-12", img: UP + "2026/09/SCUNGLA_17-scaled.jpg", url: "https://glasgowtigers.co.uk/mountain-to-climb-for-tigers/" },
  { title: "Tigers “ready” for showdown", tag: "Preview", author: "Phil Lanning", date: "2026-09-11", img: UP + "2026/09/FlintPalmToftHt4-scaled-e1789118495649.jpg", url: "https://glasgowtigers.co.uk/tigers-ready-for-showdown/" },
  { title: "In Pictures | Glasgow v Scunthorpe, 4th September 2026", tag: "In Pictures", author: "Glasgow Tigers Photographers", date: "2026-09-05", img: UP + "2026/09/Glasgow-v-Scunthorpe-04.09.26-1-scaled.jpeg", url: "https://glasgowtigers.co.uk/in-pictures-glasgow-v-scunthorpe-4th-september-2026/" }
];

const PARTNERS = [
  ["Allied Vehicles", "2016/03/AV-Reverse.svg"],
  ["DCR Jointing", "2025/04/DCRJointing51.svg"],
  ["ABR Roofing", "2025/04/ABR-Roofing23.svg"],
  ["Ride n Fit", "2023/04/Ride-n-fit.svg"],
  ["GHT", "2022/04/ght.svg"],
  ["Meru Mhor", "2022/04/MeruMhor.svg"],
  ["Ross Promo", "2026/05/Ross.Promo-PMS.svg"],
  ["Gil's Tyres", "2022/04/Gils-Tyres.svg"],
  ["LSK", "2022/04/lsk.svg"],
  ["Evans Halshaw Ford", "2021/05/Evans-Halshaw-Ford.svg"],
  ["Q'Straint", "2021/05/Q-straint.svg"],
  ["FiFab", "2021/05/FiFab.svg"]
].map(([name, path]) => ({ name, img: UP + path }));
