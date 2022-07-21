function Loading() {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100">
        <circle cx="30" cy="50" fill="#000">
          <animate attributeName="r" values="0;5;0" dur="1.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="50" cy="50" fill="#000">
          <animate attributeName="r" values="0;5;0" dur="1.2s" begin="0.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="70" cy="50" fill="#000">
          <animate attributeName="r" values="0;5;0" dur="1.2s" begin="0.8s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  )
}

export default Loading
