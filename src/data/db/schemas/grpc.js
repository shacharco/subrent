class Query{
    query
    constructor(query){
        this.query = query;
    }

    toJson(){
        return {
            query: this.query,
        }
    }

    toString(){
        return JSON.stringify(this.toJson());
    }
}
class Response{
    value
    constructor(value){
        this.value = !!value;
    }

    toJson(){
        return {
            value: this.value,
        }
    }

    toString(){
        return JSON.stringify(this.toJson());
    }
}

module.exports = { 
    Query, Response
}