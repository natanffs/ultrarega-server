import moment from 'moment-timezone'

export const date = moment.tz(new Date(), 'America/Sao_Paulo').format('YYYY-MM-DD')
export const datetime = moment.tz(new Date(), 'America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss')
export const time = moment.tz(new Date(), 'America/Sao_Paulo').format('HH:mm:ss')

