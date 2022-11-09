import MiddleMan from "../MiddleMan"
export default class Equipment {
    constructor(){
        this.data = {}
    }

    async load(e_id){
        const equipmentData = await MiddleMan.getEquipment(e_id)
        equipmentData ? this.data = equipmentData : this.data = {}
    }

    async save() {
        this.data.e_id = await MiddleMan.saveEquipment(this.data)
        return this.data.e_id
    }
}