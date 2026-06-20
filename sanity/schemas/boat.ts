import { defineField, defineType } from "sanity";

export const boat = defineType({
  name: "boat",
  title: "Boat",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "object",
      fields: [
        { name: "ar", title: "Arabic", type: "string" },
        { name: "en", title: "English", type: "string" },
      ],
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name.en" },
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Yacht", value: "yacht" },
          { title: "Boat", value: "boat" },
          { title: "Speedboat", value: "speedboat" },
          { title: "Catamaran", value: "catamaran" },
        ],
      },
    }),
    defineField({ name: "capacity", title: "Capacity", type: "number" }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image" }],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "object",
      fields: [
        { name: "ar", title: "Arabic", type: "text" },
        { name: "en", title: "English", type: "text" },
      ],
    }),
    defineField({
      name: "addons",
      title: "Add-ons",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              type: "object",
              fields: [
                { name: "ar", type: "string" },
                { name: "en", type: "string" },
              ],
            },
            { name: "price", type: "number" },
            { name: "currency", type: "string", initialValue: "SAR" },
          ],
        },
      ],
    }),
    defineField({
      name: "specs",
      title: "Specifications",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              type: "object",
              fields: [
                { name: "ar", type: "string" },
                { name: "en", type: "string" },
              ],
            },
            {
              name: "value",
              type: "object",
              fields: [
                { name: "ar", type: "string" },
                { name: "en", type: "string" },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "bokunProductId",
      title: "Bókun Product ID",
      type: "string",
    }),
    defineField({ name: "featured", title: "Featured", type: "boolean" }),
    defineField({ name: "marina", title: "Marina", type: "string" }),
    defineField({ name: "priceFrom", title: "Price From (SAR)", type: "number" }),
  ],
});
