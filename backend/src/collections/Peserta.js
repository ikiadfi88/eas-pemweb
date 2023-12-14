import payload from "payload";
/** @type {import('payload/types').CollectionConfig} */
const Peserta = {
  slug: "Peserta",
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
      name: "school",
      label: "Asal Sekolah",
      type: "text",
      required: true,
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Waiting", value: "1" },
        { label: "Rejected", value: "2" },
        { label: "Accepted", value: "3" },
      ],
    },
    {
      name: "date",
      label: "Tanggal Pendaftaran",
      type: "date",
    },
  ],
};

export default Peserta;
