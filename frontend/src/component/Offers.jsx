const Offers = () => {
  const offers = [
    {
      id: 1,
      title: "Межкомнатные двери",
      image: "/src/assets/2.jpg",
      alt: "Межкомнатные двери",
    },
    {
      id: 2,
      title: "Входные двери",
      image: "/src/assets/2.jpg",
      alt: "Входные двери",
    },
    {
      id: 3,
      title: "Металлические двери",
      image: "/src/assets/2.jpg",
      alt: "Металлические двери",
    },
    {
      id: 4,
      title: "Фурнитура",
      image: "/src/assets/2.jpg",
      alt: "Фурнитура для дверей",
    },
  ];

  return (
    <div className="offers">
      <div className="offer-content">
        <div className="carts static-overlay">
          {offers.map((offer) => (
            <div key={offer.id} className={`cart${offer.id}`}>
              <div className="cart-image">
                <img src={offer.image} alt={offer.alt} />
              </div>
              <div className="cart-overlay">
                <p className="cart-title">{offer.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offers;
