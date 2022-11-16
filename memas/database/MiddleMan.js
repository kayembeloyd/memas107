import DatesHelper from "../helper_classes/DatesHelper"
import LocalDatabase from "./LocalDatabase"

export default class MiddleMan {
    static API_ADDRESS = 'http://192.168.155.58/memas107api'

    // Simple equality filter test
    static seft(model_property, filter_property){
        if (filter_property === 'All') return true
        return (model_property === filter_property)
    }

    // Simple Search filter test
    static ssft(model_property, filter_property){
        String.prototype.like = function(search) {
            if (typeof search !== 'string' || this === null) {return false; }
            // Remove special chars
            search = search.replace(new RegExp("([\\.\\\\\\+\\*\\?\\[\\^\\]\\$\\(\\)\\{\\}\\=\\!\\<\\>\\|\\:\\-])", "g"), "\\$1");
            // Replace % and _ with equivalent regex
            search = search.replace(/%/g, '.*').replace(/_/g, '.');
            // Check matches
            return RegExp('^' + search + '$', 'gi').test(this);
        }

        return model_property.like('%' + filter_property + '%')
    }

    // ONLINE
    static async sync(){
        // Get largest uploaded_at date
        var thereIsMore = true
        var lastIndex = 0
        var greaterDate = '2022-11-06 17:43:21';
        while(thereIsMore){
            var equipmentResults = await this.getEquipments(lastIndex + 1, 10)
            var equipments = equipmentResults.data

            equipments.forEach(equipment => {
                greaterDate = DatesHelper.greaterDate(equipment.data.uploaded_at, greaterDate)
            });

            thereIsMore = equipmentResults.meta.more
            lastIndex = equipmentResults.meta.lastIndex
        }

        // Fetch the equipments
        thereIsMore = true
        var page = 1
        while(thereIsMore){
            try{
                const response = await fetch(
                    this.API_ADDRESS + '/equipments?number_of_equipments=' + 10 + '&page=' + page + '&uploaded_at=' + greaterDate
                );
        
                const data = await response.json();
                data.forEach(async equipmentData => { 
                    equipmentData.technical_specification.technical_specification = JSON.parse(equipmentData.technical_specification.technical_specification) 
                    
                    const tss_id = await this.saveTechnicalSpecification(equipmentData.technical_specification)
                    delete equipmentData.technical_specification
                    delete equipmentData.e_id

                    equipmentData.technical_specification_id = tss_id
                    
                    console.log('data:', equipmentData)
                    
                    await this.saveEquipment(equipmentData)
                })
                    
                thereIsMore = data.length > 0
                page++ 

            } catch (error){
                console.error(error);
                thereIsMore = false
            }
        } 

        // Upload equipments
        var equipmentsToUpload = [];
        thereIsMore = true
        lastIndex = 0
        
        const upload = async (eqsToUpload) => {
            try {
                eqsToUpload.forEach(async eq => {
                    const technicalSpecificationData = await this.getTechnicalSpecification(eq.data.technical_specification_id);
                    eq.data.technical_specification = JSON.stringify(technicalSpecificationData.technical_specification)

                    const response = await fetch(this.API_ADDRESS + '/equipments', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        },
                        body: new URLSearchParams(eq.data).toString()
                    })

                    const data = await response.json();
                    
                    await this.saveEquipment(data);
                });
            } catch (error) {
                console.error(error)
            }    
        }

        while(thereIsMore){
            var equipmentResults = await this.getEquipments(lastIndex + 1, 10)
            var equipments = equipmentResults.data

            equipments.forEach(async equipment => {
                if (equipment.data.e_oid === 0){
                    equipmentsToUpload.push(equipment);

                    if (equipmentsToUpload.length >= 10){
                        await upload(equipmentsToUpload)
                        equipmentsToUpload = []
                    }
                } 
            });

            thereIsMore = equipmentResults.meta.more
            lastIndex = equipmentResults.meta.lastIndex
        }

        if (equipmentsToUpload.length > 0) await upload(equipmentsToUpload)

        // Update equipments
        thereIsMore = true
        lastIndex = 0
        while(thereIsMore){
            var equipmentResults = await this.getEquipments(lastIndex + 1, 10)
            var equipments = equipmentResults.data
            var equipmentsData = []

            equipments.forEach( equipment => {
                equipmentsData.push(equipment.data)    
            });

            try {
                const response = await fetch(this.API_ADDRESS + '/equipments/update', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    },
                    body: new URLSearchParams({
                        'equipments' : JSON.stringify(equipmentsData)
                    }).toString()
                })

                const data = await response.json();
                data.forEach(async equipmentData => { 
                    await this.saveEquipment(equipmentData)
                })
            } catch (error) {
                console.error(error)
            }

            thereIsMore = equipmentResults.meta.more
            lastIndex = equipmentResults.meta.lastIndex
        }
    }

    // LOCAL
    // For equipments
    static async getEquipment(e_id){
        return JSON.parse(
            await LocalDatabase.getItem('e_id' + e_id)
        )
    }

    static async getEquipmentWithCode(asset_tag){
        let i = 0;
        let size = Number.parseInt(await LocalDatabase.getItem('last_e_id'))

        while (i <= size) {
            let eq_data = await this.getEquipment(i)

            if (eq_data){
                if (this.seft(asset_tag, eq_data.asset_tag)) {
                    return eq_data
                }
            }

            i++
        }

        return undefined
    }

    static async getEquipments(lastIndex, size, equipmentFilterOptions){
        let iStart = lastIndex
        let iSize = size

        let equipments = []
        let iCount = 1
        let iMore = true
        
        while (iCount < iSize) {
            const eq = {}
            eq.data = await this.getEquipment(iStart)

            if (eq.data){
                if (equipmentFilterOptions){
                    // Department Filter
                    let departmentFilterTestResult = equipmentFilterOptions.department ? this.seft(eq.data.department, equipmentFilterOptions.department) : true
                    
                    // Status Filter
                    let statusFilterTestResult = equipmentFilterOptions.status ? this.seft(eq.data.status, equipmentFilterOptions.status) : true 
                
                    // Search Filter
                    let searchFilterTestResult = equipmentFilterOptions.searchTerm ? this.ssft(eq.data.name, equipmentFilterOptions.searchTerm) : true

                    if (departmentFilterTestResult && statusFilterTestResult && searchFilterTestResult){
                        equipments.push(eq)
                        iCount++                        
                    }
                } else {
                    equipments.push(eq)
                    iCount++                    
                }
            }

            let lastEID = await LocalDatabase.getItem('last_e_id')
            lastEID ? 0 : lastEID = 0
            iStart++

            if (iStart > Number.parseInt(lastEID)) {
                iMore = false
                iCount = iSize + 1
            }
        }

        return {
            data: equipments, 
            meta: {
                lastIndex: equipments.length >= 1 ? equipments[equipments.length - 1].data.e_id : undefined,
                more: iMore
            }
        }
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

    // For technical specifications
    static async getTechnicalSpecification(tss_id){
        return JSON.parse(
            await LocalDatabase.getItem('tss_id' + tss_id)
        )
    }

    static async saveTechnicalSpecification(technicalSpecificationData){
        if (technicalSpecificationData.tss_id){
            if (await this.getEquipment(technicalSpecificationData.tss_id)){
                await LocalDatabase.setItem('tss_id' + technicalSpecificationData.tss_id, `${JSON.stringify(technicalSpecificationData)}`)
                return technicalSpecificationData.tss_id
            }

            return undefined
        }
        
        
        let lastTSSID = await LocalDatabase.getItem('last_tss_id')
        let newTSSID = 0

        lastTSSID ? newTSSID = Number.parseInt(lastTSSID) + 1 : newTSSID = 1

        technicalSpecificationData.tss_id = newTSSID
        
        await LocalDatabase.setItem('last_tss_id', `${newTSSID}`)
        await LocalDatabase.setItem('tss_id' + `${newTSSID}`, JSON.stringify(technicalSpecificationData))

        return newTSSID
    }

    // For maintenanceLogs
    static async getMaintenanceLog(ml_id){
        return JSON.parse(
            await LocalDatabase.getItem('ml_id' + ml_id)
        )
    }

    static async getMaintenanceLogs(lastIndex, size, maintenanceLogsFilterOptions){
        let iStart = lastIndex
        let iSize = size

        let maintenanceLogs = []
        let iCount = 1
        let iMore = true
        
        while (iCount < iSize) {
            const ml = {}
            ml.data = await this.getMaintenanceLog(iStart)

            if (ml.data){
                if (maintenanceLogsFilterOptions) {
                    // Getting the equipment
                    const eq = {}
                    eq.data = await this.getEquipment(ml.data.equipment_id)
                    
                    // Department Filter
                    let departmentFilterTestResult = maintenanceLogsFilterOptions.department ? this.seft(eq.data.department, maintenanceLogsFilterOptions.department) : true
                       
                    // Maintenance Log type Filter
                    let maintenanceTypeFilterTestResult = maintenanceLogsFilterOptions.type ? this.seft(ml.data.type, maintenanceLogsFilterOptions.type) : true

                    // Equipment Filter
                    let equipmentFilterTestResult = maintenanceLogsFilterOptions.asset_tag ? this.seft(eq.data.asset_tag, maintenanceLogsFilterOptions.asset_tag) : true

                    // Search Filter
                    let searchFilterTestResult = maintenanceLogsFilterOptions.searchTerm ? this.ssft(eq.data.name, maintenanceLogsFilterOptions.searchTerm) : true

                    if (departmentFilterTestResult && 
                        maintenanceTypeFilterTestResult && 
                        equipmentFilterTestResult && 
                        searchFilterTestResult){
                            maintenanceLogs.push(ml)
                            iCount++
                    }
                } else {
                    maintenanceLogs.push(ml)
                    iCount++
                }
            }

            let lastMLID = await LocalDatabase.getItem('last_ml_id')
            lastMLID ? 0 : lastMLID = 0
            iStart++

            if (iStart > Number.parseInt(lastMLID)) {
                iMore = false
                iCount = iSize + 1
            }
        }

        return {
            data: maintenanceLogs, 
            meta: {
                lastIndex: maintenanceLogs.length >= 1 ? maintenanceLogs[maintenanceLogs.length - 1].data.ml_id : undefined,
                more: iMore
            }
        }
    }

    static async saveMaintenanceLog(maintenanceLogData){
        if (maintenanceLogData.ml_id){
            if (await this.getMaintenanceLog(maintenanceLogData.ml_id)){
                await LocalDatabase.setItem('ml_id' + maintenanceLogData.ml_id, `${JSON.stringify(maintenanceLogData)}`)
                return maintenanceLogData.ml_id
            }

            return undefined
        }
        
        
        let lastMLID = await LocalDatabase.getItem('last_ml_id')
        let newMLID = 0

        lastMLID ? newMLID = Number.parseInt(lastMLID) + 1 : newMLID = 1

        maintenanceLogData.ml_id = newMLID
        
        await LocalDatabase.setItem('last_ml_id', `${newMLID}`)
        await LocalDatabase.setItem('ml_id' + `${newMLID}`, JSON.stringify(maintenanceLogData))

        return newMLID
    }

    // For maintenance log info
    static async getMaintenanceLogInfo(mli_id){
        return JSON.parse(
            await LocalDatabase.getItem('mli_id' + mli_id)
        )
    }

    static async saveMaintenanceLogInfo(maintenanceLogInfoData){
        if (maintenanceLogInfoData.mli_id){
            if (await this.getEquipment(maintenanceLogInfoData.mli_id)){
                await LocalDatabase.setItem('mli_id' + maintenanceLogInfoData.mli_id, `${JSON.stringify(maintenanceLogInfoData)}`)
                return maintenanceLogInfoData.mli_id
            }

            return undefined
        }
        
        
        let lastMLIID = await LocalDatabase.getItem('last_mli_id')
        let newMLIID = 0

        lastMLIID ? newMLIID = Number.parseInt(lastMLIID) + 1 : newMLIID = 1

        maintenanceLogInfoData.mli_id = newMLIID
        
        await LocalDatabase.setItem('last_mli_id', `${newMLIID}`)
        await LocalDatabase.setItem('mli_id' + `${newMLIID}`, JSON.stringify(maintenanceLogInfoData))

        return newMLIID
    }

    // For Depatment
    static async getDepartments(options){
        if (options.with_all) {
            return ([
                {id: 0, name:'All'}, 
                {id: 1, name:'Department 1'}, 
                {id: 2, name:'Department 2'}, 
                {id: 3, name:'Department 3'}, 
                {id: 4, name:'Department 4'}, 
                {id: 5, name:'Department 5'}, 
                {id: 6, name:'Department 6'}, 
                {id: 7, name:'Department 7'}, 
                {id: 8, name:'Department 8'}, 
                {id: 9, name:'Department 9'},
                {id: 10, name:'Department 10'}, 
                {id: 11, name:'Department 11'}, 
                {id: 12, name:'Department 12'}, 
                {id: 13, name:'Department 13'}, 
                {id: 14, name:'Department 14'}, 
                {id: 15, name:'Department 15'}, 
                {id: 16, name:'Department 16'}, 
                {id: 17, name:'Department 17'}, 
            ])
        } else {
            return ([
                {id: 1, name:'Department 1'}, 
                {id: 2, name:'Department 2'}, 
                {id: 3, name:'Department 3'}, 
                {id: 4, name:'Department 4'}, 
                {id: 5, name:'Department 5'}, 
                {id: 6, name:'Department 6'}, 
                {id: 7, name:'Department 7'}, 
                {id: 8, name:'Department 8'}, 
                {id: 9, name:'Department 9'},
                {id: 10, name:'Department 10'}, 
                {id: 11, name:'Department 11'}, 
                {id: 12, name:'Department 12'}, 
                {id: 13, name:'Department 13'}, 
                {id: 14, name:'Department 14'}, 
                {id: 15, name:'Department 15'}, 
                {id: 16, name:'Department 16'}, 
                {id: 17, name:'Department 17'}, 
            ])
        }
    }

    // For Status
    static async getStatuses(options){
        if (options.with_all) {
            return ([
                {id: 0, name:'All'},
                {id: 1, name:'Operational'},
                {id: 2, name:'Idle'},
                {id: 3, name:'Broken'},
            ])
        } else {
            return ([
                {id: 1, name:'Operational'},
                {id: 2, name:'Idle'},
                {id: 3, name:'Broken'}, 
            ])
        }
    }

    // For MaintenanceType
    static async getMaintenanceTypes(options){
        if (options.with_all) {
            return ([
                {id: 0, name:'All'},
                {id: 1, name:'Corrective Maintenance'},
                {id: 2, name:'Preventive Maintenance'}
            ])
        } else {
            return ([
                {id: 1, name:'Corrective Maintenance'},
                {id: 2, name:'Preventive Maintenance'}
            ])
        }
    }
}