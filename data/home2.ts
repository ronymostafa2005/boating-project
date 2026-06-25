const CDN = "https://neera.wpenginepowered.com/wp-content/uploads";

export const HOME2_HERO_SLIDES = [
  {
    id: 1,
    video: `${CDN}/2023/12/Neera-Slider-video-03.mp4`,
    thumb: `${CDN}/2024/01/Neera-slider-2-img-01.png`,
    subtitleKey: "heroSlide1Subtitle",
    titleLine1Key: "heroSlide1TitleLine1",
    titleLine2Key: "heroSlide1TitleLine2",
    descKey: "heroSlide1Desc",
  },
  {
    id: 2,
    video: `${CDN}/2023/12/Neera-Slider-video-02.mp4`,
    thumb: `${CDN}/2024/01/Neera-slider-2-img-03.png`,
    subtitleKey: "heroSlide2Subtitle",
    titleLine1Key: "heroSlide2TitleLine1",
    titleLine2Key: "heroSlide2TitleLine2",
    descKey: "heroSlide2Desc",
  },
  {
    id: 3,
    video: `${CDN}/2023/12/Neera-Slider-video-01.mp4`,
    thumb: `${CDN}/2024/01/Neera-slider-2-img-02.png`,
    subtitleKey: "heroSlide3Subtitle",
    titleLine1Key: "heroSlide3TitleLine1",
    titleLine2Key: "heroSlide3TitleLine2",
    descKey: "heroSlide3Desc",
  },
] as const;

export const HOME2_FILLER_SLIDES = [
  { image: `${CDN}/2023/12/Neera-Home2-filler-carousel-img01.jpg`, titleKey: "filler1" },
  { image: `${CDN}/2024/01/home-2-filler-1.jpg`, titleKey: "filler2" },
  { image: `${CDN}/2024/01/home-2-filler-2.jpg`, titleKey: "filler3" },
] as const;

export const HOME2_ABOUT_SIDE_IMAGE = `${CDN}/2024/01/home-1-image-carousel-1.jpg`;

export const HOME2_ABOUT_LIST = [
  "aboutList1",
  "aboutList2",
  "aboutList3",
  "aboutList4",
  "aboutList5",
  "aboutList6",
] as const;

export const HOME2_TESTIMONIALS = [
  { quoteKey: "testimonial1Quote", authorKey: "testimonial1Author" },
  { quoteKey: "testimonial2Quote", authorKey: "testimonial2Author" },
  { quoteKey: "testimonial3Quote", authorKey: "testimonial3Author" },
] as const;

export const HOME2_SHIP_TYPES = [
  { key: "shipSail", image: `${CDN}/2024/02/Neera-service-listing-image-1.jpg`, descKey: "shipSailDesc" },
  { key: "shipJet", image: `${CDN}/2024/02/Neera-service-listing-image-5.jpg`, descKey: "shipJetDesc" },
  { key: "shipMotor", image: `${CDN}/2024/02/Neera-service-listing-image-4.jpg`, descKey: "shipMotorDesc" },
  { key: "shipCanoe", image: `${CDN}/2024/02/Neera-service-listing-image-3.jpg`, descKey: "shipCanoeDesc" },
  { key: "shipDeck", image: `${CDN}/2024/02/Neera-service-listing-image-2.jpg`, descKey: "shipDeckDesc" },
  { key: "shipPontoon", image: `${CDN}/2023/12/Neera-services-img-box-img-01.jpg`, descKey: "shipPontoonDesc" },
] as const;

export const HOME2_SHIPS_BG = `${CDN}/2023/12/Neera-Services-section-bg-01.jpg`;

const VBO = "https://neera.wpenginepowered.com/wp-content/plugins/vikbooking/site/resources/uploads";

export const HOME2_TOURS = [
  {
    nameKey: "tour1Name",
    metaKey: "tour1Meta",
    descKey: "tour1Desc",
    price: "100",
    capacity: 4,
    image: `${VBO}/neera-rooms-listing-img03.jpg`,
  },
  {
    nameKey: "tour2Name",
    metaKey: "tour2Meta",
    descKey: "tour2Desc",
    price: "200",
    capacity: 2,
    image: `${VBO}/neera-tour-listing-img-02.jpg`,
  },
  {
    nameKey: "tour3Name",
    metaKey: "tour3Meta",
    descKey: "tour3Desc",
    price: "140",
    capacity: 4,
    image: `${VBO}/tour-detail-6.jpg`,
  },
  {
    nameKey: "tour4Name",
    metaKey: "tour4Meta",
    descKey: "tour4Desc",
    price: "200",
    capacity: 2,
    image: `${VBO}/tour-detail-5.jpg`,
  },
] as const;

export const HOME2_PORTFOLIO = [
  {
    image: `${CDN}/2023/12/1.jpg`,
    locationKey: "portfolioLocCalifornia",
    nameKey: "portfolio1Name",
  },
  {
    image: `${CDN}/2023/12/2.jpg`,
    locationKey: "portfolioLocLondon",
    nameKey: "portfolio2Name",
  },
  {
    image: `${CDN}/2023/12/3.jpg`,
    locationKey: "portfolioLocNewYork",
    nameKey: "portfolio3Name",
  },
  {
    image: `${CDN}/2023/12/4.jpg`,
    locationKey: "portfolioLocMalaysia",
    nameKey: "portfolio4Name",
  },
  {
    image: `${CDN}/2023/12/5.jpg`,
    locationKey: "portfolioLocLondon",
    nameKey: "portfolio5Name",
  },
  {
    image: `${CDN}/2023/12/6.jpg`,
    locationKey: "portfolioLocCalifornia",
    nameKey: "portfolio6Name",
  },
  {
    image: `${CDN}/2023/12/7.jpg`,
    locationKey: "portfolioLocNewYork",
    nameKey: "portfolio7Name",
  },
  {
    image: `${CDN}/2023/12/8.jpg`,
    locationKey: "portfolioLocLondon",
    nameKey: "portfolio8Name",
  },
] as const;

export type PricingFeatureStatus = "included" | "excluded" | "plain";

export const HOME2_PRICING = [
  {
    nameKey: "pricingStandard",
    price: "210",
    image: `${CDN}/2024/01/home-two-pricing-image-3.jpg`,
    features: [
      { textKey: "pfPrivateExecTransfer", status: "included" },
      { textKey: "pfIntlFlights", status: "excluded" },
      { textKey: "pfAirportTransfers", status: "excluded" },
      { textKey: "pfInclusionOnBoard", status: "included" },
      { textKey: "pfFoodBeverages", status: "plain" },
      { textKey: "pfButlerService", status: "plain" },
      { textKey: "pfShoreExcursions", status: "plain" },
      { textKey: "pfExpeditionAirHotel", status: "plain" },
      { textKey: "pfAirportTransfers", status: "excluded" },
      { textKey: "pfIntlFlights", status: "excluded" },
      { textKey: "pfPrivateExecTransfer", status: "excluded" },
    ],
  },
  {
    nameKey: "pricingDeluxe",
    price: "350",
    image: `${CDN}/2024/01/home-two-pricing-image-2.jpg`,
    featured: true,
    features: [
      { textKey: "pfAirportTransfer", status: "included" },
      { textKey: "pfIntlFlights", status: "excluded" },
      { textKey: "pfPrivateExecTransfers", status: "excluded" },
      { textKey: "pfInclusionOnBoard", status: "included" },
      { textKey: "pfFoodBeverages", status: "plain" },
      { textKey: "pfButlerService", status: "plain" },
      { textKey: "pfShoreExcursions", status: "plain" },
      { textKey: "pfExpeditionAirHotel", status: "plain" },
      { textKey: "pfPrivateExecTransfers", status: "excluded" },
      { textKey: "pfIntlFlights", status: "included" },
      { textKey: "pfAirportTransfer", status: "included" },
    ],
  },
  {
    nameKey: "pricingPremium",
    price: "500",
    image: `${CDN}/2024/01/home-two-pricing-image-1.jpg`,
    features: [
      { textKey: "pfPrivateExecTransfer", status: "included" },
      { textKey: "pfIntlFlights", status: "included" },
      { textKey: "pfAirportTransfers", status: "included" },
      { textKey: "pfInclusionOnBoard", status: "included" },
      { textKey: "pfFoodBeverages", status: "plain" },
      { textKey: "pfButlerService", status: "plain" },
      { textKey: "pfShoreExcursions", status: "plain" },
      { textKey: "pfExpeditionAirHotel", status: "plain" },
      { textKey: "pfAirportTransfers", status: "included" },
      { textKey: "pfIntlFlights", status: "included" },
      { textKey: "pfPrivateExecTransfer", status: "included" },
    ],
  },
] as const;

export const HOME2_TEAM_BG = `${CDN}/2023/12/Neera-Services-section-bg-01.jpg`;

export const HOME2_TEAM = [
  { nameKey: "team1Name", roleKey: "team1Role", image: `${CDN}/2023/12/Neera-team-img-07.jpg` },
  { nameKey: "team2Name", roleKey: "team2Role", image: `${CDN}/2023/12/Neera-team-img-01.jpg` },
  { nameKey: "team3Name", roleKey: "team3Role", image: `${CDN}/2023/12/Neera-team-img-02.jpg` },
  { nameKey: "team4Name", roleKey: "team4Role", image: `${CDN}/2023/12/Neera-team-img-03.jpg` },
] as const;

const HOME2_MAP_IMAGE = `${CDN}/2023/12/Neera-hotspot-bg-02.png`;

export const HOME2_LOCATION_TABS = [
  {
    id: "pomza",
    labelKey: "locPomza",
    mapImage: HOME2_MAP_IMAGE,
    hotspots: [
      { labelKey: "hsPomza1", image: `${CDN}/2023/12/Neera-Hotspot-img-07.jpg`, left: "59%", top: "42%" },
      { labelKey: "hsPomza2", image: `${CDN}/2023/12/Neera-Hotspot-img-06.jpg`, left: "19%", top: "16%" },
      { labelKey: "hsPomza3", image: `${CDN}/2023/12/Neera-Hotspot-img-05.jpg`, left: "19%", top: "64%" },
    ],
    stops: [
      { type: "port", placeKey: "pomzaStop1", timeKey: "pomzaTime1", noteKey: "allAboardNote" },
      { type: "sailing" },
      { type: "port", placeKey: "pomzaStop2", timeKey: "pomzaTime2" },
      { type: "port", placeKey: "pomzaStop3", timeKey: "pomzaTime3" },
      { type: "sailing" },
      { type: "port", placeKey: "pomzaStop4", timeKey: "pomzaTime4", noteKey: "gangwayNote" },
    ],
  },
  {
    id: "italy",
    labelKey: "locItaly",
    mapImage: HOME2_MAP_IMAGE,
    hotspots: [
      { labelKey: "hsItaly1", image: `${CDN}/2024/01/travel-location-image-1.jpg`, left: "59%", top: "42%" },
      { labelKey: "hsItaly2", image: `${CDN}/2024/01/travel-location-image-2.jpg`, left: "19%", top: "16%" },
      { labelKey: "hsItaly3", image: `${CDN}/2024/01/travel-location-image-3.jpg`, left: "19%", top: "64%" },
    ],
    stops: [
      { type: "port", placeKey: "italyStop1", timeKey: "italyTime1", noteKey: "allAboardNote" },
      { type: "sailing" },
      { type: "port", placeKey: "italyStop2", timeKey: "italyTime2" },
      { type: "port", placeKey: "italyStop3", timeKey: "italyTime3" },
      { type: "port", placeKey: "italyStop4", timeKey: "italyTime4" },
      { type: "port", placeKey: "italyStop5", timeKey: "italyTime5", noteKey: "gangwayNote" },
    ],
  },
  {
    id: "corsica",
    labelKey: "locCorsica",
    mapImage: HOME2_MAP_IMAGE,
    hotspots: [
      { labelKey: "hsCorsica1", image: `${CDN}/2024/01/travel-location-image-4.jpg`, left: "59%", top: "42%" },
      { labelKey: "hsCorsica2", image: `${CDN}/2024/01/travel-location-image-5.jpg`, left: "19%", top: "16%" },
      { labelKey: "hsCorsica3", image: `${CDN}/2024/01/travel-location-image-6.jpg`, left: "19%", top: "64%" },
    ],
    stops: [
      { type: "port", placeKey: "corsicaStop1", timeKey: "corsicaTime1", noteKey: "allAboardNote" },
      { type: "sailing" },
      { type: "port", placeKey: "corsicaStop2", timeKey: "corsicaTime2" },
      { type: "port", placeKey: "corsicaStop3", timeKey: "corsicaTime3" },
      { type: "port", placeKey: "corsicaStop4", timeKey: "corsicaTime4" },
      { type: "port", placeKey: "corsicaStop5", timeKey: "corsicaTime5", noteKey: "gangwayNote" },
    ],
  },
  {
    id: "sardinia",
    labelKey: "locSardinia",
    mapImage: HOME2_MAP_IMAGE,
    hotspots: [
      { labelKey: "hsSardinia1", image: `${CDN}/2024/01/travel-location-image-7.jpg`, left: "59%", top: "42%" },
      { labelKey: "hsSardinia2", image: `${CDN}/2024/01/travel-location-image-8.jpg`, left: "19%", top: "16%" },
      { labelKey: "hsSardinia3", image: `${CDN}/2024/01/travel-location-image-9.jpg`, left: "19%", top: "64%" },
    ],
    stops: [
      { type: "port", placeKey: "sardiniaStop1", timeKey: "sardiniaTime1", noteKey: "allAboardNote" },
      { type: "sailing" },
      { type: "port", placeKey: "sardiniaStop2", timeKey: "sardiniaTime2" },
      { type: "port", placeKey: "sardiniaStop3", timeKey: "sardiniaTime3" },
      { type: "port", placeKey: "sardiniaStop4", timeKey: "sardiniaTime4" },
      { type: "port", placeKey: "sardiniaStop5", timeKey: "sardiniaTime5", noteKey: "gangwayNote" },
    ],
  },
  {
    id: "caprira",
    labelKey: "locCaprira",
    mapImage: HOME2_MAP_IMAGE,
    hotspots: [
      { labelKey: "hsCaprira1", image: `${CDN}/2024/01/travel-location-image-10.jpg`, left: "59%", top: "42%" },
      { labelKey: "hsCaprira2", image: `${CDN}/2024/01/travel-location-image-11.jpg`, left: "19%", top: "16%" },
      { labelKey: "hsCaprira3", image: `${CDN}/2024/01/travel-location-image-12.jpg`, left: "19%", top: "64%" },
    ],
    stops: [
      { type: "port", placeKey: "capriraStop1", timeKey: "capriraTime1", noteKey: "allAboardNote" },
      { type: "sailing" },
      { type: "port", placeKey: "capriraStop2", timeKey: "capriraTime2" },
      { type: "port", placeKey: "capriraStop3", timeKey: "capriraTime3" },
      { type: "port", placeKey: "capriraStop4", timeKey: "capriraTime4" },
      { type: "port", placeKey: "capriraStop5", timeKey: "capriraTime5", noteKey: "gangwayNote" },
    ],
  },
  {
    id: "egypt",
    labelKey: "locEgypt",
    mapImage: HOME2_MAP_IMAGE,
    hotspots: [
      { labelKey: "hsEgypt1", image: `${CDN}/2024/01/travel-location-image-13.jpg`, left: "59%", top: "42%" },
      { labelKey: "hsEgypt2", image: `${CDN}/2024/01/travel-location-image-14.jpg`, left: "19%", top: "16%" },
      { labelKey: "hsEgypt3", image: `${CDN}/2024/01/travel-location-image-15.jpg`, left: "19%", top: "64%" },
    ],
    stops: [
      { type: "port", placeKey: "egyptStop1", timeKey: "egyptTime1", noteKey: "allAboardNote" },
      { type: "sailing" },
      { type: "port", placeKey: "egyptStop2", timeKey: "egyptTime2" },
      { type: "port", placeKey: "egyptStop3", timeKey: "egyptTime3" },
      { type: "port", placeKey: "egyptStop4", timeKey: "egyptTime4" },
      { type: "port", placeKey: "egyptStop5", timeKey: "egyptTime5", noteKey: "gangwayNote" },
    ],
  },
  {
    id: "los-angeles",
    labelKey: "locLosAngeles",
    mapImage: HOME2_MAP_IMAGE,
    hotspots: [
      { labelKey: "hsLa1", image: `${CDN}/2024/01/travel-location-image-16.jpg`, left: "59%", top: "42%" },
      { labelKey: "hsLa2", image: `${CDN}/2024/01/travel-location-image-17.jpg`, left: "19%", top: "16%" },
      { labelKey: "hsLa3", image: `${CDN}/2024/01/travel-location-image-18.jpg`, left: "19%", top: "64%" },
    ],
    stops: [
      { type: "port", placeKey: "laStop1", timeKey: "laTime1", noteKey: "allAboardNote" },
      { type: "sailing" },
      { type: "port", placeKey: "laStop2", timeKey: "laTime2" },
      { type: "port", placeKey: "laStop3", timeKey: "laTime3" },
      { type: "port", placeKey: "laStop4", timeKey: "laTime4" },
      { type: "port", placeKey: "laStop5", timeKey: "laTime5", noteKey: "gangwayNote" },
    ],
  },
] as const;

export const HOME2_COUNTERS_BG = `${CDN}/2023/12/Neera-Testimonial-2-bg.jpg`;

export const HOME2_COUNTERS = [
  { value: 3000, suffix: "+", labelKey: "counterExplorers" },
  { value: 200, suffix: "+", labelKey: "counterDestinations" },
  { value: 30, suffix: "+", labelKey: "counterYears" },
] as const;

export const HOME2_GALLERY_FEATURES = [
  "galleryFeature1",
  "galleryFeature2",
  "galleryFeature3",
  "galleryFeature4",
  "galleryFeature5",
] as const;

export const HOME2_GALLERY_IMAGES = [
  `${CDN}/2024/02/Neera-masonary-banner-img-01.jpg`,
  `${CDN}/2024/02/Neera-Adv-banner-04.jpg`,
  `${CDN}/2024/02/Neera-masonary-banner-img-04.jpg`,
  `${CDN}/2024/02/Neera-masonary-banner-img-02.jpg`,
  `${CDN}/2024/02/Neera-Adv-banner-05.jpg`,
  `${CDN}/2024/02/Neera-Adv-banner-06.jpg`,
  `${CDN}/2024/02/Neera-masonary-banner-img-05.jpg`,
] as const;

export const HOME2_INSTAGRAM_URL = "https://www.instagram.com/";

export const HOME2_INSTAGRAM_IMAGES = [
  `${CDN}/2023/12/Neera-insta-img-01.jpg`,
  `${CDN}/2023/12/Neera-insta-img-02.jpg`,
  `${CDN}/2023/12/Neera-insta-img-03.jpg`,
  `${CDN}/2023/12/Neera-insta-img-04.jpg`,
  `${CDN}/2023/12/Neera-insta-img-05.jpg`,
  `${CDN}/2023/12/Neera-insta-img-06.jpg`,
  `${CDN}/2023/12/Neera-insta-img-07.jpg`,
  `${CDN}/2023/12/Neera-insta-img-08.jpg`,
] as const;

export const HOME2_NEWSLETTER_IMAGE = `${CDN}/2023/12/Neera-Newsletter-aside-img.jpg`;
