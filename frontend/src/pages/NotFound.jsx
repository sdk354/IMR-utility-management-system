import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="app-center">
      <div className="card center">
        <h3>Page not found</h3>
        <div className="mt-2 small">Try returning to the portal selection.</div>
        <div className="mt-4"><Link to="/" className="link">Go home</Link></div>
      </div>
    </div>
  );
}
