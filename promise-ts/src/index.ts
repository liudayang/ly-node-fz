const enum STATUS {
    pending = 'PENDING',
    fulfilled = 'FULFILLED',
    rejected = 'REJECTED'
}
class Promise {
    status: STATUS
    value: any
    reason: any
    constructor() {
        this.status = STATUS.pending
        this.value = undefined
        this.reason = undefined
    }

    
}

export default Promise