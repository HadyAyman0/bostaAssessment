import { Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <Typography variant="h1" className="text-9xl font-bold text-gray-300 mb-4">
        404
      </Typography>
      <Typography variant="h3" color="blue-gray" className="mb-2">
        Page Not Found
      </Typography>
      <Typography color="gray" className="mb-8 max-w-md">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </Typography>
      <div className="flex gap-4">
        <Button
          onClick={() => navigate(-1)}
          variant="outlined"
          color="gray"
          className="flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          Go Back
        </Button>
        <Link to="/">
          <Button color="red" className="flex items-center gap-2">
            <Home size={18} />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
