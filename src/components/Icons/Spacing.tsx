function Spacing({ size }: { size: number }) {
  return (
    <svg height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 6.7959H10.5V8.2959H21V6.7959Z" fill="currentColor" />
      <path d="M21 12.0459H10.5V13.5459H21V12.0459Z" fill="currentColor" />
      <path d="M21 17.2959H10.5V18.7959H21V17.2959Z" fill="currentColor" />
      <path
        d="M9 8.29579L6.53025 5.82604C6.3896 5.68543 6.19887 5.60645 6 5.60645C5.80113 5.60645 5.6104 5.68543 5.46975 5.82604L3 8.29579H5.25V17.2958H3L5.46975 19.7655C5.6104 19.9061 5.80113 19.9851 6 19.9851C6.19887 19.9851 6.3896 19.9061 6.53025 19.7655L9 17.2958H6.75V8.29579H9Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default Spacing
