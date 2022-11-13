import MiddleMan from "../MiddleMan"
export default class Equipment {
    constructor(){
        this.data = {}
    }

    async load(e_id){
        this.data = await MiddleMan.getEquipment(e_id)
    }

    async loadWithCode(asset_tag){
        this.data = await MiddleMan.getEquipmentWithCode(asset_tag)
    }

    async save() {
        this.data.e_id = await MiddleMan.saveEquipment(this.data)
        return this.data.e_id
    }

    static async getEquipments(lastIndex, size, equipmentFilterOptions){
        return await MiddleMan.getEquipments(lastIndex, size, equipmentFilterOptions)
    }
}