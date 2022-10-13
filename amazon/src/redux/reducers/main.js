import {getProductReducer} from "./Productreducer"
import {combineReducers} from "redux"

const rootreducers = combineReducers({
    getproductdata:getProductReducer
    // agar humare pass or bhi jyda reducer honge to hum use pehle import krenge or fir , kom dekar key and value pair me daal dengey 
})

export default rootreducers;