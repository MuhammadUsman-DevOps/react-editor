function Underline({ size }: { size: number }) {
  return (
    <svg height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 19C10.4092 18.9982 8.88416 18.3655 7.75933 17.2407C6.6345 16.1158 6.00179 14.5908 6 13V4H7.5V13C7.5 14.1935 7.97411 15.3381 8.81802 16.182C9.66193 17.0259 10.8065 17.5 12 17.5C13.1935 17.5 14.3381 17.0259 15.182 16.182C16.0259 15.3381 16.5 14.1935 16.5 13V4H18V13C17.9982 14.5908 17.3655 16.1158 16.2407 17.2407C15.1158 18.3655 13.5908 18.9982 12 19V19Z"
        fill="currentColor"
      />
      <path d="M21 20.5H3V22H21V20.5Z" fill="currentColor" />
    </svg>
  )
}

export default Underline
