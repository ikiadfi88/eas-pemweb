import payload from "payload";
/** @type {import('payload/types').CollectionConfig} */
const Account = {
  slug: "Account",
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
      label: "Nama",
      type: "text",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      required: true,
    },
    {
      name: "password",
      label: "Password",
      type: "text",
      required: true,
    },
  ],
};

export default Account;
