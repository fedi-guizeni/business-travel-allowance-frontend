export class Client {
    public userId: string;
    public firstName: string;
    public lastName: string;
    public address: string;
    public email: string;
    public tel: Number;
    public fax: Number;
    public account: Number;

    constructor() {
        this.userId = '';
        this.firstName = '';
        this.lastName = '';
        this.address = '';
        this.email = '';
        this.tel=null;
        this.fax=null;
        this.account=null;
    }
}