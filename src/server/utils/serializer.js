class Context{
    constructor(req, res){
        this.req = req;
        this.res = res;
    }
    
    deserializeRes(){
        return this.res;
    }
    deserializeReq(){
        return this.req;
    }
}



