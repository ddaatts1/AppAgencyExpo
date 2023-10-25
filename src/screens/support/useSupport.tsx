import SupportService from "../../services/support.service";
import {useState} from "react";


export  default function useSupport(){
    const {feedback} = SupportService()


    const [feedbackData, setFeedbackData] :any= useState()
    const [isFeedback,setIsFeedback] = useState(false)



    const Feedback = async (data:any)=>{


        try {
            setIsFeedback(true)
            const  result =await feedback(data)
            setFeedbackData(result)
        }catch (e){
            setFeedbackData(e)
        }finally {
            setIsFeedback(false)
        }
    }

    return{
        Feedback,
        isFeedback,
        feedbackData
    }

}
