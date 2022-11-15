import MiddleMan from "../MiddleMan"
export default class MaintenanceType {
    static async getMaintenanceTypes(options){
        return await MiddleMan.getMaintenanceTypes(options)
    }
}