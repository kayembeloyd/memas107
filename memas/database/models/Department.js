import MiddleMan from "../MiddleMan"
export default class Department {
    static async getDepartments(options){
        return await MiddleMan.getDepartments(options)
    }
}