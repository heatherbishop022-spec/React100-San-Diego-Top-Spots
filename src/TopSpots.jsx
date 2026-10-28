import TopSpot from './TopSpot';

function TopSpots({ spots }) {
  return (
    <div className="list-group" data-testid="topspots">
      {spots.map((topspot) => (
        <TopSpot
          key={topspot.id}
          name={topspot.name}
          description={topspot.description}
          location={topspot.location}
          distance={topspot.distance}
        />
      ))}
    </div>
  );
}

export default TopSpots;