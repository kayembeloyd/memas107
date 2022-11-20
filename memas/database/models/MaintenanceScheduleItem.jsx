import MiddleMan from "../MiddleMan"
export default class MaintenanceScheduleItem {
    constructor(){
        this.data = {}
    }

    async load(msi_id){
        this.data = await MiddleMan.getMaintenanceScheduleItem(msi_id)
    }

    async save() {
        this.data.msi_id = await MiddleMan.saveMaintenanceScheduleItem(this.data)
        this.data.msi_idx = await MiddleMan.saveMaintenanceScheduleItemIndex(this.data)
        return this.data.msi_id
    }

    async delete(){
        await MiddleMan.deleteMaintenanceScheduleItem(this.data.msi_id)
    }

    /*static async getMaintenanceScheduleItems(lastDate, size, maintenanceScheduleItemsFilterOptions){
        return await MiddleMan.getMaintenanceScheduleItems(lastDate, size, maintenanceScheduleItemsFilterOptions)
    }*/
}