function RemoveCircleOutline({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 12C3 7.03111 7.03111 3 12 3C16.9689 3 21 7.03111 21 12C21 16.9689 16.9689 21 12 21C7.03111 21 3 16.9689 3 12ZM12 4.38462C7.79581 4.38462 4.38462 7.79581 4.38462 12C4.38462 16.2042 7.79581 19.6154 12 19.6154C16.2042 19.6154 19.6154 16.2042 19.6154 12C19.6154 7.79581 16.2042 4.38462 12 4.38462Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.8457 11.9999C7.8457 11.6176 8.15566 11.3076 8.53801 11.3076H15.4611C15.8434 11.3076 16.1534 11.6176 16.1534 11.9999C16.1534 12.3823 15.8434 12.6922 15.4611 12.6922H8.53801C8.15566 12.6922 7.8457 12.3823 7.8457 11.9999Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default RemoveCircleOutline
