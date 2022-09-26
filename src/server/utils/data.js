class DataHandler{
    handler
    next
    constructor(handler, next=null){
        this.handler = handler;
        this.next = next;
    }
    async handle(data){
        let handledData = await this.handler(data);
        if(this.next){
            handledData = await this.next.handle(handledData)
        }
        return handledData;

    }
    setNext(next){
        this.next = next;
    }
}


module.exports = { 
    DataHandler
}