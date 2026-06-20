import { defineField, defineType } from "sanity";

export const pageContent = defineType({
  name: "pageContent",
  title: "Page Content",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "string",
      options: {
        list: [
          { title: "About", value: "about" },
          { title: "Safety", value: "safety" },
          { title: "Terms", value: "terms" },
          { title: "Privacy", value: "privacy" },
        ],
      },
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "object",
      fields: [
        { name: "ar", title: "Arabic", type: "string" },
        { name: "en", title: "English", type: "string" },
      ],
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "object",
      fields: [
        { name: "ar", title: "Arabic", type: "text" },
        { name: "en", title: "English", type: "text" },
      ],
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              type: "object",
              fields: [
                { name: "ar", type: "string" },
                { name: "en", type: "string" },
              ],
            },
            {
              name: "content",
              type: "object",
              fields: [
                { name: "ar", type: "text" },
                { name: "en", type: "text" },
              ],
            },
          ],
        },
      ],
    }),
  ],
});
