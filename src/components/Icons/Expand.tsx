function Expand({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 24 24">
      <path fill="currentColor" d="M21,21H16v3h5.546A2.457,2.457,0,0,0,24,21.545V16H21Z" />
      <path fill="currentColor" d="M0,2.455V8H3V3H8V0H2.454A2.457,2.457,0,0,0,0,2.455Z" />
      <path fill="currentColor" d="M3,16H0v5.545A2.457,2.457,0,0,0,2.454,24H8V21H3Z" />
      <path fill="currentColor" d="M21.546,0H16V3h5V8h3V2.455A2.457,2.457,0,0,0,21.546,0Z" />
    </svg>
  )
}

export default Expand
