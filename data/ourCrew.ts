const CDN = "/images/neera";

export type CrewMember = {
  id: string;
  nameKey: string;
  roleKey: string;
  image: string;
};

export type CrewTestimonial = {
  id: string;
  nameKey: string;
  roleKey: string;
  image: string;
  quoteKey: string;
  rating: number;
};

/** Row 1 — leadership (swap `image` paths when assets are ready) */
export const OUR_CREW_ROW_1: CrewMember[] = [
  {
    id: "crew-1",
    nameKey: "crew1Name",
    roleKey: "crew1Role",
    image: `${CDN}/2023/12/Neera-team-img-07.jpg`,
  },
  {
    id: "crew-2",
    nameKey: "crew2Name",
    roleKey: "crew2Role",
    image: `${CDN}/2023/12/Neera-team-img-01.jpg`,
  },
  {
    id: "crew-3",
    nameKey: "crew3Name",
    roleKey: "crew3Role",
    image: `${CDN}/2023/12/Neera-team-img-02.jpg`,
  },
  {
    id: "crew-4",
    nameKey: "crew4Name",
    roleKey: "crew4Role",
    image: `${CDN}/2023/12/Neera-team-img-03.jpg`,
  },
];

/** Row 2 — officers & crew */
export const OUR_CREW_ROW_2: CrewMember[] = [
  {
    id: "crew-5",
    nameKey: "crew5Name",
    roleKey: "crew5Role",
    image: `${CDN}/2023/12/Neera-team-img-04.jpg`,
  },
  {
    id: "crew-6",
    nameKey: "crew6Name",
    roleKey: "crew6Role",
    image: `${CDN}/2023/12/Neera-Home2-filler-carousel-img01.jpg`,
  },
  {
    id: "crew-7",
    nameKey: "crew7Name",
    roleKey: "crew7Role",
    image: `${CDN}/2023/12/Neera-insta-img-03.jpg`,
  },
  {
    id: "crew-8",
    nameKey: "crew8Name",
    roleKey: "crew8Role",
    image: `${CDN}/2023/12/Neera-insta-img-05.jpg`,
  },
];

export const OUR_CREW_TESTIMONIAL_BG = `${CDN}/2023/12/Neera-Services-section-bg-01.jpg`;

export const OUR_CREW_TESTIMONIALS: CrewTestimonial[] = [
  {
    id: "testimonial-1",
    nameKey: "testimonial1Name",
    roleKey: "testimonial1Role",
    image: `${CDN}/2023/12/Neera-team-img-01.jpg`,
    quoteKey: "testimonialQuote",
    rating: 5,
  },
  {
    id: "testimonial-2",
    nameKey: "testimonial2Name",
    roleKey: "testimonial2Role",
    image: `${CDN}/2023/12/Neera-team-img-02.jpg`,
    quoteKey: "testimonialQuote",
    rating: 4,
  },
  {
    id: "testimonial-3",
    nameKey: "testimonial3Name",
    roleKey: "testimonial3Role",
    image: `${CDN}/2023/12/Neera-team-img-03.jpg`,
    quoteKey: "testimonialQuote",
    rating: 4,
  },
  {
    id: "testimonial-4",
    nameKey: "testimonial4Name",
    roleKey: "testimonial4Role",
    image: `${CDN}/2023/12/Neera-team-img-04.jpg`,
    quoteKey: "testimonialQuote",
    rating: 5,
  },
];
