import { RootState } from "~/store/rootReducer"

 export const selectPublicComponents = (state: RootState) => state.components.public
