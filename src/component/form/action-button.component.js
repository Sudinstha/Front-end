import { Button } from "react-bootstrap";
import { FaTrash, FaPaperPlane } from "react-icons/fa";

const ActionButtons = ({ cancelText = "Reset", submitText = "Submit" }) => {
  return (
    <>
      <Button variant="danger" size="sm" type="reset" className="me-3">
        <FaTrash />
        {cancelText}
      </Button>
      <Button variant="success" size="sm" type="submit">
        <FaPaperPlane />
        {submitText}
      </Button>
    </>
  );
};
export default ActionButtons;
