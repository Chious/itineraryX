export default function Timeline() {
  return (
    <div
      className="timeline"
      style={{
        width: '2px',
        position: 'absolute',
        top: '0',
        bottom: '20px',
        left: '50%',
        transform: 'translate(-50%, 0)',
        background:
          'radial-gradient(circle closest-side, #4b9ed9 98%, #0000) center / 100% 5px, linear-gradient(#4b9ed9 50%, #0000 0) center / 100% 10px',
      }}
    ></div>
  );
}
