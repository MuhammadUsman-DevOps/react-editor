function Compress({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 24 24">
      <path fill="currentColor" d="M5.5,5.5H0v3H6A2.5,2.5,0,0,0,8.5,6V0h-3Z" />
      <path fill="currentColor" d="M15.5,18v6h3V18.5H24v-3H18A2.5,2.5,0,0,0,15.5,18Z" />
      <path fill="currentColor" d="M18.5,5.5V0h-3V6A2.5,2.5,0,0,0,18,8.5h6v-3Z" />
      <path fill="currentColor" d="M6,15.5H0v3H5.5V24h3V18A2.5,2.5,0,0,0,6,15.5Z" />
    </svg>
  )
}

export default Compress
