import { AppContext } from "~/contexts/AppContext"
import { useContext } from "react"

function useIsMobile() {
  const { isMobile } = useContext(AppContext)
  return isMobile
}

export default useIsMobile
