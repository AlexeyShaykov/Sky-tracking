const FlightImage = () => {
  return (
    <div
    className="xs:h-56 xs:pt-21 w-full h-72 pt-28"
    style={{
      background: `linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/public/planes/lufthansa.png') no-repeat center center / cover)`
    }}
  >
    <img
      src="/public/planes/lufthansa.png"
      alt="Lufthansa"
      className="max-w-[95%] h-auto mx-auto"
    />
  </div>
  )
};

export default FlightImage;
