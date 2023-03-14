function FeaturesIcon({ product }) {
  return (
    <div className="features">
      <h2 className="features__title">What features does this vehicle have?</h2>
      <div className="features__container">
        {product?.featuresProducts.map((feature) => (
          <div key={feature.url} className="features__card">
            <div
              className="features__img"
              style={{ backgroundImage: `url(${feature.url})` }}
            ></div>
            <span>{feature.nameFeature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturesIcon;
