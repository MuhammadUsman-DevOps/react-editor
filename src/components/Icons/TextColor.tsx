function TextColor({ size, color = "#000000" }: { size: number; color: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 24 24">
        <path
          d="M11 2L5.5 16h2.25l1.12-3h6.25l1.12 3h2.25L13 2h-2zm-1.38 9L12 4.67 14.38 11H9.62z"
          fill="currentColor"
        ></path>
      </svg>
      <div style={{ height: "5px", width: "22px", background: color, display: "block", marginTop: "-3px" }}></div>
    </div>
  )
}

export default TextColor
