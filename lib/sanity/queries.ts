export const boatsQuery = `*[_type == "boat"] | order(featured desc, name.en asc) {
  _id,
  name,
  "slug": slug.current,
  type,
  capacity,
  images,
  description,
  addons,
  specs,
  bokunProductId,
  featured,
  marina,
  priceFrom
}`;

export const featuredBoatsQuery = `*[_type == "boat" && featured == true] | order(name.en asc) [0...6] {
  _id,
  name,
  "slug": slug.current,
  type,
  capacity,
  images,
  description,
  bokunProductId,
  featured,
  priceFrom
}`;

export const boatBySlugQuery = `*[_type == "boat" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  type,
  capacity,
  images,
  description,
  addons,
  specs,
  bokunProductId,
  featured,
  marina,
  priceFrom
}`;

export const faqsQuery = `*[_type == "faq"] | order(order asc) {
  _id,
  question,
  answer,
  order
}`;

export const pageContentQuery = `*[_type == "pageContent" && slug == $slug][0] {
  _id,
  slug,
  title,
  content,
  sections
}`;
