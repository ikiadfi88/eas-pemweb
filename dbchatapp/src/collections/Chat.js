/** @type {import('payload/types').CollectionConfig} */
const Chat = {
  slug: "Chat",
  access: {
    create: () => true,
    read: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "message",
      label: "pesan",
      type: "textarea",
      required: true,
    },
    {
      name: "channel",
      label: "Channel",
      type: "relationship",
      relationTo: "Channel",
    },
  ],
};

export default Chat;
