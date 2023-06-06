import DataTable from "react-data-table-component";

const customStyles = {
  rows: {
    style: {
      minHeight: "30px", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
      background: "#000000",
      color: "#ffffff",
      maxHeight: "30px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
    },
  },
};
const TableComponent = ({ columns, data, loading }) => {
  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        progressPending={loading}
        customStyles={customStyles}
      />
    </>
  );
};
export default TableComponent;
