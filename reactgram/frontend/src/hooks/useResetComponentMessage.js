//redux
import { resetMessage } from "../slices/photoSlice";

export const useResetComponentMessage = (dispatch) => {//precisa do dispatch pos ele vai retornar algo que utiliza o dispatch
    return () => {
        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)//será aguardado 2s para essa função ser executada
    }
}