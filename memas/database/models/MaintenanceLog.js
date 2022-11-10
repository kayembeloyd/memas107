export default class MaintenanceLog {
    constructor(){
        this.data = {}
    }

    async load(ml_id){
        this.data = await MiddleMan.getMaintenanceLog(ml_id)
    }

    async save() {
        this.data.ml_id = await MiddleMan.saveMaintenanceLog(this.data)
        return this.data.ml_id
    }

    static async getMaintenanceLogs(lastIndex, size){
        return await MiddleMan.getMaintenanceLogs(lastIndex, size)
    }
}