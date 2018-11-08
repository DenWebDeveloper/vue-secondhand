import api from './index'

export function getAllGroups() {
    return new Promise((res,rej)=> {
        this.$api('/groups').then(resp => {
            res(resp)
        }).catch(err => {
            rej
            this.$notifyError({errMsg: `Не вдалось завантажити список усіх груп. ${err.messages}`})
        })
    })
}