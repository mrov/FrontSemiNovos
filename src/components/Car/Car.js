import "./Car.scss"

export default function Car({ car }) {
  return (
    <div className="carCard" key={car._id}>
      <img src={car.img}></img>
      <div>
        <h4>{car.announceName}</h4>
      </div>
    </div>
  );
}
