export default class DatesHelper {
    static getSQLCompatibleDate(d) {
        return (
            d.getFullYear() + '-' + 
            (d.getMonth() + 1) + '-' + 
            d.getDate() + ' ' + 
            (d.getHours() < 10 ? (
                '0' + d.getHours()) 
                : d.getHours()) + ':' + 
            (d.getMinutes() < 10 ? 
                '0' + d.getMinutes() 
                : d.getMinutes()) + ':' + 
            (d.getMilliseconds() < 10 ? 
                '00' + d.getMilliseconds() : 
                (d.getMilliseconds() < 100 ? 
                    '0' + d.getMilliseconds(): 
                    d.getMilliseconds()))
        )
    }

    static greaterDate(d1, d2){
        return (new Date(date_one).getTime() >= new Date(date_two).getTime() ? date_one : date_two)
    }
}