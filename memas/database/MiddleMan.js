import LocalDatabase from "./LocalDatabase"

export default class MiddleMan {
    static API_ADDRESS = 'localhost/memas107'

    static async getEquipment(e_id){
        return JSON.parse(
            await LocalDatabase.getItem('e_id' + e_id)
        )
    }

    static async getEquipments(lastIndex, size){
        let iStart = lastIndex
        let iSize = size

        let equipments = []
        let iCount = 1
        let iMore = true
        
        while (iCount < iSize) {
            const eq = {}
            eq.data = await this.getEquipment(iStart)

            if (eq.data){
                equipments.push(eq)
                iCount++
            }

            let lastEID = await LocalDatabase.getItem('last_e_id')

            iStart++
            iStart > Number.parseInt(lastEID) ? iCount = iSize + 1 : iMore = false 
        }

        const returnData = {
            data: equipments, 
            meta: {
                lastIndex: equipments[equipments.length - 1].data.e_id,
                more: iMore
            }
        }

        return returnData
    }

    static async saveEquipment(equipmentData){
        if (equipmentData.e_id){
            if (await this.getEquipment(equipmentData.e_id)){
                await LocalDatabase.setItem('e_id' + equipmentData.e_id, `${JSON.stringify(equipmentData)}`)
                return equipmentData.e_id
            }

            return undefined
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