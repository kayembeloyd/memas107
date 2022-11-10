import MiddleMan from "../MiddleMan"

export default class MaintenanceLogInfo {
    constructor(){
        this.data = {}
    }

    async load(mli_id){
        this.data = await MiddleMan.getMaintenanceLogInfo(mli_id)
    }

    async save() {
        this.data.mli_id = await MiddleMan.saveMaintenanceLogInfo(this.data)
        return this.data.mli_id
    }
}