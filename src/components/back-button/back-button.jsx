import { useNavigate } from "react-router-dom"
import Button from "react-bootstrap/Button";

export const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button variant="link" onClick={() => navigate(-1)} className="back-button link-secondary p-0">
      🠈
    </Button>
  );
}
