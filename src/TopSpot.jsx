function TopSpot({ name, description, location, distance }) {
  const latitude = location[0];
  const longitude = location[1];

  return (
    <div className="list-group-item" data-testid="topspot">
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-2">
       <h4 className="mb-0">{name}</h4>

         {distance !== undefined && (
          <span className="text-muted text-end flex-shrink-0">
         📍 {distance.toFixed(1)} miles away
          </span>
          )}
      </div>
      <p>{description}</p>

      <a
        href={`https://maps.google.com/?q=${latitude},${longitude}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-outline-primary"
      >
        View on Google Maps
      </a>
    </div>
  );
}

export default TopSpot;