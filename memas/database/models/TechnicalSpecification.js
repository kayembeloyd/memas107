import MiddleMan from "../MiddleMan"
export default class TechnicalSpecification {
    constructor(){
        this.data = {}
    }

    async load(tss_id){
        this.data = await MiddleMan.getTechnicalSpecification(tss_id)
    }

    async save() {
        this.data.tss_id = await MiddleMan.saveTechnicalSpecification(this.data)
        return this.data.tss_id
    }
}