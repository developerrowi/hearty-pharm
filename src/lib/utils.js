import moment from 'moment'


export function getToday() {
    
    let m = moment().utcOffset(0);
    m.set('hour', 6).set("minute", 0).set("second", 0)
    return m.format('YYYY-MM-DD')

}

export function getTomorrow() {
    let m = moment().utcOffset(0)
    m.add(1, 'day')
    m.set('hour', 6).set("minute", 0).set("second", 0)
    return m.format('YYYY-MM-DD')
}