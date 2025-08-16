import { useEffect, useState } from "react";
import "./PopularPeople.css";

export default function PopularPeople() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/person/popular?api_key=7d9969ab4156d9f0eb56a1e38298be66`
    )
      .then((res) => res.json())
      .then((data) => setPeople(data.results || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <h2 className="popular-people__loading">Loading Popular People...</h2>
    );

  return (
    <section
      className="popular-people"
      aria-label="Popular People Section"
      role="region"
    >
      <div className="popular-people__scroll" role="list">
        {people.map((person) => {
          const imgSrc = person.profile_path
            ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
            : "https://via.placeholder.com/150x150?text=No+Image";

          return (
            <div
              className="popular-people__item"
              key={person.id}
              role="button"
              tabIndex={0}
              aria-label={`Person: ${person.name}, known for ${person.known_for_department}`}
              onClick={() => setSelectedPerson(person)}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  setSelectedPerson(person);
              }}
            >
              <img
                className="popular-people__avatar"
                src={imgSrc}
                alt={person.name}
                loading="lazy"
              />
              <p className="popular-people__name">{person.name}</p>
              <p className="popular-people__dept">
                {person.known_for_department}
              </p>
            </div>
          );
        })}
      </div>

      {selectedPerson && (
        <div
          className="popular-people__detail"
          role="dialog"
          aria-modal="true"
          aria-labelledby="person-name"
        >
          <button
            className="popular-people__close"
            aria-label="Close detail"
            onClick={() => setSelectedPerson(null)}
          >
            ✕
          </button>
          <h2 className="detail-person" id="person-name">
            {selectedPerson.name}
          </h2>
          <h3 className="detail-person">Known for:</h3>
          <div className="popular-people__works">
            {selectedPerson.known_for?.map((work) => {
              const poster = work.poster_path
                ? `https://image.tmdb.org/t/p/w200${work.poster_path}`
                : "https://via.placeholder.com/100x150?text=No+Image";

              return (
                <div
                  className="popular-people__work-card"
                  key={work.id}
                  role="group"
                  aria-label={`${work.title || work.name}, type ${
                    work.media_type
                  }`}
                >
                  <img
                    src={poster}
                    alt={work.title || work.name}
                    className="popular-people__work-poster"
                  />
                  <div className="popular-people__work-info">
                    <h4>{work.title || work.name}</h4>
                    <p className="popular-people__work-type">
                      {work.media_type.toUpperCase()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
