import { Benef } from "./benef";
import { User } from "./user";

export class AvaFe {
   public referenceDossierAVA:string;
    public avaType:string;
    public idClient:string;
    public naturePiece:string;
    public numCin:string;
    public codeAgence:string;
    public dateCreation:string;
    public dateValidite:Date;
    public finValidite:Date;
    public dateCloture:string;
    public compteDebit:string;
    public activiteBct:string;
    public caht:string;
    public dat:Number;
    public observation:string;
    public statutDossier:string;
    public statutValidationDossier:string;
    public numAutorBct:Number;
    public dataAutoBct:Date;
    public montantBct:Number;
    public  nompromoteurProjet:string;
    public  dateDeclarationFiscale:Date;
    public  referenceFiscale:string;
    public titulaireMarche:string;
    public montantContrat:string;
    public devise:string;
    public dateContrat:Date;
    public agent:User;
    public beneficiaries:Benef[] ;
    


    constructor(){
        this.referenceDossierAVA='';
        this.avaType='';
        this.idClient='';
        this.naturePiece='';
        this.numCin='';
        this.codeAgence='';
        this.dateCreation= null;
        this.dateValidite=null;
        this.finValidite=null;
        this.dateCloture='';
        this.compteDebit='';
        this.activiteBct='';
        this.caht='';
        this.dat=null;
        this.observation='';
        this.statutDossier='';
        this.statutValidationDossier='';
        this.numAutorBct=null;
        this.dataAutoBct=null;
        this.montantBct=null;
        this.nompromoteurProjet='';
        this.dateDeclarationFiscale=null;
        this.referenceFiscale='';
        this.titulaireMarche='';
        this.montantContrat='';
        this.devise=''
        this.dateContrat=null;
        this.agent=null;
        this.beneficiaries=[];
    }

}