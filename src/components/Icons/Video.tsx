function Video({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 24 24">
      <path
        d="M22 5.07167L18.6667 8.405V7.5C18.6667 6.12167 17.545 5 16.1667 5H10.3333H4.5C3.12167 5 2 6.12167 2 7.5V18.3333H18.6667V14.9283L22 18.2617V5.07167ZM17 16.6667H3.66667V7.5C3.66667 7.04 4.04083 6.66667 4.5 6.66667H16.1667C16.6267 6.66667 17 7.04 17 7.5V16.6667ZM20.3333 14.2383L18.6667 12.5717V10.7617L20.3333 9.095V14.2383Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default Video
