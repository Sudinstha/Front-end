//import { FaPen, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

const TableActionButtons = ({ deleteAction, id, editUrl }) => {
  const handleDelete = (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteAction(id);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="button">
        <NavLink
          to={editUrl}
          className={"btn btn-sm btn-info me-1 button-edit "}
        >
          Edit
        </NavLink>
        <NavLink
          onClick={handleDelete}
          className={"btn btn-sm btn-danger button-del"}
        >
          Delete
        </NavLink>
      </div>
    </>
  );
};
export default TableActionButtons;
