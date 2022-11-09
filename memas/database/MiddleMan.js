import LocalDatabase from "./LocalDatabase"

export default class MiddleMan {
    static API_ADDRESS = 'localhost/memas107'

    static async getEquipment(e_id){
        return JSON.parse(
            await LocalDatabase.getItem('e_id' + e_id)
        )
    }

    static async saveEquipment(equipmentData){
        if (equipmentData.e_id){
            if (await this.getEquipment(equipmentData.e_id)){
                await LocalDatabase.setItem('e_id' + equipmentData.e_id, `${JSON.stringify(equipmentData)}`)
                return equipmentData.e_id
            }
        }
        
        
        let lastEID = await LocalDatabase.getItem('last_e_id')
        let newEID = 0

        lastEID ? newEID = Number.parseInt(lastEID) + 1 : newEID = 1

        equipmentData.e_id = newEID
        
        await LocalDatabase.setItem('last_e_id', `${newEID}`)
        await LocalDatabase.setItem('e_id' + `${newEID}`, JSON.stringify(equipmentData))

        return newEID
    }
}