import payload from "payload";
/** @type {import('payload/types').CollectionConfig} */
const Channel = {
  slug: "Channel",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: () => true,
    update: () => true,
    delete: () => true,
    create: () => true,
  },
  fields: [
    {
      name: "name",
      label: "Channel Name",
      type: "text",
      required: true,
    },
    {
      name: "owner",
      label: "Channel Owner",
      type: "text",
      required: true,
    },
    {
      name: "chat",
      label: "Chat",
      type: "relationship",
      relationTo: "Chat",
    },
  ],
};

export default Channel;
