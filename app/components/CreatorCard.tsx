import { Link } from "react-router";
import type { Creator } from "../types/Creator";

// create a component for the creator card withthe props
const CreatorCard = (props: Creator) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      {props.imageURL && (
        <figure>
          <Link to={`/creators/${props.id}`}>
            <img
              src={props.imageURL}
              alt={props.name}
              className="w-96 h-96 object-cover"
            />
          </Link>
        </figure>
      )}

      <div className="card-body">
        <h2 className="card-title">{props.name}</h2>

        <p>{props.description}</p>

        <div className="card-actions items-center justify-between">
          <a
            href={props.url}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary pr-4"
          >
            Visit Creator
          </a>

          <Link
            to={`/creators/${props.id}/edit`}
            aria-label={`Edit ${props.name}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white border border-white/20 transition-all duration-200 hover:scale-110 hover:bg-white/20"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreatorCard;
