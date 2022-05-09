export class Benef {
    public idBenef: string;
    public benefCardId: Number;
    public benefCardType: string;
    public nomPrenomBenef: string;
    public adressBenef: string;
    public tel: Number;
    public qualite: string;
    public statutBenef: string;
    public dateCreation:Date;

    constructor() {
        this.idBenef = '';
        this.benefCardId = null;
        this.benefCardType = '';
        this.nomPrenomBenef = '';
        this.adressBenef = '';
        this.tel=null;
        this.qualite='';
        this.statutBenef='';
        this.dateCreation=new Date();
    }
}