export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://e7.pngegg.com/pngimages/304/275/png-clipart-user-profile-computer-icons-profile-miscellaneous-logo.png"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  }
];
export const clinicColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 140,
  },
  {
    field: "type",
    headerName: "Type",
    width: 70,
  },
  {
    field: "title",
    headerName: "Title",
    width: 70,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "email",
    headerName: "Email",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  }
];
export const timeColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
];


