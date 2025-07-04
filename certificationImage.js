import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getCertificate from '@salesforce/apex/Gettingcertificate.getCertificate';
//lwc:import image from '@salesforce/resourceUrl/blockchain';
 

export default class certificationImage extends NavigationMixin(LightningElement) {
    //photo = image;
    certifications;
    error;
 
    @wire(getCertificate)
    wiredCertifications({ data, error }) {
        if (data) {
            this.certifications = data;
           
           
        } else if (error) {
            this.error = error;
            this.certifications = [];
        }
    }
 
    handleClick(event) {
        var recordId = event.target.dataset.id;
        console.log('Navigating to recordId: ', recordId);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
                objectApiName: 'Certification__c',
                actionName: 'view'
            }
        });
       
    }
}