import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      Sorry, the page you are looking for does not exist. You can go back to the
      <Link to="/"> Home</Link> page.
    </div>
  );
}
