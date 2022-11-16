export default class DatesHelper {
    static getSQLCompatibleDate(d) {
        const vf = new Date();
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
            (d.getSeconds() < 10 ? 
                '0' + d.getSeconds() : 
                (d.getSeconds()))
        )
    }

    static greaterDate(date_one, date_two){
        return (new Date(date_one).getTime() >= new Date(date_two).getTime() ? date_one : date_two)
    }
}