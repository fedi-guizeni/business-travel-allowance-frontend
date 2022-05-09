import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AvaFe } from '../model/ava';
import {formatDate} from '@angular/common';
import { Client } from '../model/client';
import { Benef } from '../model/benef';
import { OutputStats } from '../model/Output1';


@Injectable({
  providedIn: 'root'
})
export class AvaService {

  public host=environment.apiUrl;
  constructor(private http:HttpClient) { }
  //add ava autre activite
  public addAvaFe(avafe: AvaFe): Observable<AvaFe> {
    return this.http.post<AvaFe>(`${this.host}/ava/add`, avafe);
  }
  //add ava exportateur marche a l'etrange
  public addAvaExMe(avafe: AvaFe): Observable<AvaFe> {
    return this.http.post<AvaFe>(`${this.host}/ava/addfe`, avafe);
  }
  // add beneficiare a ava exportateur marche a l'etrange
  public addBenefExMe(avafe: AvaFe): Observable<AvaFe> {
    return this.http.post<AvaFe>(`${this.host}/ava/add_benef-exp`, avafe);
  }
  //add beneficiare a  ava autre activite
  public addBenefFe(avafe: AvaFe): Observable<AvaFe> {
    return this.http.post<AvaFe>(`${this.host}/ava/add_benef`, avafe);
  }
  //list ava a Modifier
  public getavasAmendement(): Observable<AvaFe[] >{
    return this.http.get<AvaFe[]>(`${this.host}/ava/listAmendement`)
  }
  //list ava pour branch
  public getavasforBranch(): Observable<AvaFe[] >{
    return this.http.get<AvaFe[]>(`${this.host}/ava/listBranch`)
  }
  //list ava pour regulatory maker
  public getavasforRgMaker(): Observable<AvaFe[] >{
    return this.http.get<AvaFe[]>(`${this.host}/ava/listRgMaker`)
  }
  //list ava pour regulatory maker
  public getavasforRgChecker(): Observable<AvaFe[] >{
    return this.http.get<AvaFe[]>(`${this.host}/ava/listRgChecker`)
  }
  //list ava pour Renewal
  public getavasforRenewal(): Observable<AvaFe[] >{
    return this.http.get<AvaFe[]>(`${this.host}/ava/listRenewel`)
  }
  //update ava autre activite
  public UpdateAva(formData:FormData): Observable<AvaFe>{
    return this.http.post<AvaFe>(`${this.host}/ava/update`,formData)
  }
  //  update ava exportateur marche a l'etrange
  public UpdateAvaExMe(formData:FormData): Observable<AvaFe>{
    return this.http.post<AvaFe>(`${this.host}/ava/updateFmEx`,formData)
  }
  //  update Beneficiare
  public UpdateBenef(formData:FormData): Observable<Benef>{
    return this.http.post<Benef>(`${this.host}/ava/update-benef`,formData)
  }
  //renouvellement  ava autre activite
  public RenewalAva(formData:FormData): Observable<AvaFe>{
    return this.http.post<AvaFe>(`${this.host}/ava/renouveleAA`,formData)
  }
  //renouvellement ava exportateur marche a l'etrange
  public RenewalAvaExMe(formData:FormData): Observable<AvaFe>{
    return this.http.post<AvaFe>(`${this.host}/ava/RenewalFmEx`,formData)
  }
 // get client 
  public getClient(client:Client):Observable<Client>{
    return this.http.post<Client>(`${this.host}/ava/clientCheck`,client)
  }

  //get PDF list ava current month
  public getPDFAvas():Observable<Blob>{
    return this.http.get(`${this.host}/ava/export/pdf`,{responseType : 'blob'})
  }
  //get PDF list ava custom month
  public getPDFAvasCustom(formData:FormData):Observable<any>{
    return this.http.post(`${this.host}/ava/export2/pdf`,formData,{responseType: 'blob' as 'json' })
  }
   //get PDF list benef current month
   public getPDFBenefs():Observable<Blob>{
    return this.http.get(`${this.host}/ava/exportBenef/pdf`,{responseType: 'blob'  })
  }
    //get PDF list benef custom month
    public getPDFBenefCustom(formData:FormData):Observable<any>{
      return this.http.post(`${this.host}/ava/exportBenef2/pdf`,formData,{responseType: 'blob' as 'json' })
    }

   //get stats 
   public getAvaNumb():Observable<OutputStats[]>{
    return this.http.get<OutputStats[]>(`${this.host}/ava/findgroupby`)
  }
  
  public addAvasToLocalCache(ava:AvaFe[]):void{
    localStorage.setItem('avas',JSON.stringify(ava))
   }
 
   public getAvasFromLocalCache():AvaFe[]{
     if (localStorage.getItem('avas')) {
       return JSON.parse(localStorage.getItem('avas')) ;
     }
     return null;
    
    }
   
    public createFormDataforPdf(date:string):FormData{
      const formData = new FormData();

      formData.append('dateList',date);
      
      
   
      
      return formData;
     }
    public createBenefFromDateRenewal(currentidbenef:string , benef :Benef):FormData{
      const formData = new FormData();

      formData.append('currentidBenef',currentidbenef);
      formData.append('idBenef',benef.idBenef);
      formData.append('benefCardId', benef.benefCardId.toString());
      formData.append('benefCardType',benef.benefCardType);
      formData.append('nomPrenomBenef', benef.nomPrenomBenef);
      formData.append('adressBenef',benef.adressBenef);
      formData.append('tel', benef.tel.toString());
      formData.append('qualite',benef.qualite);
      formData.append('statutBenef',benef.statutBenef );
      
   
      
      return formData;
     }
    public createAvaFromDateRenewal(currentIdClient:string , ava :AvaFe):FormData{
      const formData = new FormData();

      formData.append('currentIdClient',currentIdClient);
      formData.append('avaType',ava.avaType);
      formData.append('idClient',ava.idClient);
      formData.append('caht', ava.caht);
      formData.append('dat',ava.dat.toString());
      formData.append('numAutorBct', ava.numAutorBct.toString() );
      formData.append('dateDeclarationFiscale', ava.dateDeclarationFiscale.toString());
      formData.append('observation', ava.observation);
      formData.append('referenceDossierAVA', ava.referenceDossierAVA);
      formData.append('dateValidite',ava.dateValidite.toString() );
      formData.append('finValidite', ava.finValidite.toString());
      formData.append('statutDossier',ava.statutDossier);
      formData.append('dataAutoBct',  ava.dataAutoBct.toString());
      formData.append('montantBct',ava.montantBct.toString());
      
      return formData;
     }
    public createAvaExMFromDateRenewal(currentIdClient:string , ava :AvaFe):FormData{
      const formData = new FormData();

      formData.append('currentIdClient',currentIdClient);
      formData.append('avaType',ava.avaType);
      formData.append('idClient',ava.idClient);
      formData.append('caht', ava.caht);
      formData.append('dat',ava.dat.toString());
      formData.append('numAutorBct', ava.numAutorBct.toString() );
      formData.append('dateValidite',ava.dateValidite.toString() );
      formData.append('finValidite', ava.finValidite.toString());
      formData.append('statutDossier',ava.statutDossier);
      formData.append('statutValidationDossier',ava.statutValidationDossier);
      formData.append('dataAutoBct',  ava.dataAutoBct.toString());
      formData.append('montantBct',ava.montantBct.toString());
      
      return formData;
     }


    public createAvaFromDate(currentIdClient:string , ava :AvaFe):FormData{
      const formData = new FormData();
      formData.append('currentIdClient',currentIdClient);
      formData.append('idClient',ava.idClient);
      formData.append('caht', ava.caht);
      formData.append('dat',ava.dat.toString());
      formData.append('numAutorBct', ava.numAutorBct.toString() );
      formData.append('dateDeclarationFiscale', ava.dateDeclarationFiscale.toString());
      formData.append('referenceFiscale', ava.referenceFiscale);
      formData.append('observation', ava.observation);
      formData.append('referenceDossierAVA', ava.referenceDossierAVA);
      formData.append('avaType',ava.avaType);
      formData.append('naturePiece',ava.naturePiece);
      formData.append('numCin', ava.numCin);
      formData.append('codeAgence', ava.codeAgence );
      formData.append('dateValidite', ava.dateValidite.toString() );
      formData.append('finValidite', ava.finValidite.toString());
      formData.append('dateCloture', ava.dateCloture);
      formData.append('compteDebit', ava.compteDebit);
      formData.append('activiteBct',ava.activiteBct);
      formData.append('statutDossier',ava.statutDossier);
      formData.append('statutValidationDossier', ava.statutValidationDossier);
      formData.append('nompromoteurProjet', ava.nompromoteurProjet);
      formData.append('dataAutoBct',  ava.dataAutoBct.toString());
      formData.append('montantBct',ava.montantBct.toString());
      return formData;
     }
    public createAvaExMeFromDate(currentIdClient:string , ava :AvaFe):FormData{
      const formData = new FormData();
      formData.append('currentIdClient',currentIdClient);
      formData.append('idClient',ava.idClient);
      formData.append('caht', ava.caht);
      formData.append('dat',ava.dat.toString());
      formData.append('numAutorBct', ava.numAutorBct.toString() );
      formData.append('observation', ava.observation);
      formData.append('referenceDossierAVA', ava.referenceDossierAVA);
      formData.append('avaType',ava.avaType);
      formData.append('naturePiece',ava.naturePiece);
      formData.append('numCin', ava.numCin);
      formData.append('codeAgence', ava.codeAgence );
      formData.append('dateValidite', ava.dateValidite.toString() );
      formData.append('finValidite', ava.finValidite.toString());
      formData.append('dateCloture', ava.dateCloture);
      formData.append('compteDebit', ava.compteDebit);
      formData.append('activiteBct',ava.activiteBct);
      formData.append('statutDossier',ava.statutDossier);
      formData.append('statutValidationDossier', ava.statutValidationDossier);
      formData.append('dataAutoBct',  ava.dataAutoBct.toString());
      formData.append('montantBct',ava.montantBct.toString());
      formData.append('titulaireMarche', ava.titulaireMarche);
      formData.append('montantContrat',  ava.montantContrat);
      formData.append('devise',ava.devise);
      formData.append('dateContrat',ava.dateContrat.toString());
      return formData;
     }
}
