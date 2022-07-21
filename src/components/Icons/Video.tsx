function Video({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 24 24">
      <path
        d="M21 6.0645L18 9.0645V8.25C18 7.0095 16.9905 6 15.75 6H5.25C4.0095 6 3 7.0095 3 8.25V18H18V14.9355L21 17.9355V6.0645ZM16.5 16.5H4.5V8.25C4.5 7.836 4.83675 7.5 5.25 7.5H15.75C16.164 7.5 16.5 7.836 16.5 8.25V16.5ZM19.5 14.3145L18 12.8145V11.1855L19.5 9.6855V14.3145V14.3145Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default Video
