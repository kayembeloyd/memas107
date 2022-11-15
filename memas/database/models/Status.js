import MiddleMan from "../MiddleMan"
export default class Status {
    static async getStatuses(options){
        return await MiddleMan.getStatuses(options)
    }
}