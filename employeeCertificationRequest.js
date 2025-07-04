import { LightningElement, track, wire } from 'lwc';
import getEmployees from '@salesforce/apex/EmployeeCertificationRequestController.getEmployees';
import getCertifications from '@salesforce/apex/EmployeeCertificationRequestController.getCertifications';
 
import createCertificationRequest from '@salesforce/apex/EmployeeCertificationRequestController.createCertificationRequest';
import submitForApproval from '@salesforce/apex/CertificationRequestApproval.submitForApproval';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
 
export default class EmployeeCertificationRequest extends LightningElement {
    @track isModalOpen = false;
    @track employeeOptions = [];
    @track certificationOptions = [];
    selectedEmployeeName;
    selectedCertificationName;
 
    // Fetch Employee Options
    @wire(getEmployees)
    wiredEmployees({ data, error }) {
        if (data) {
            this.employeeOptions = data.map(emp => ({ label: emp.Name, value: emp.Name }));
        } else if (error) {
            console.error(error);
        }
    }
 
    // Fetch Certification Options
    @wire(getCertifications)
    wiredCertifications({ data, error }) {
        if (data) {
            this.certificationOptions = data.map(cert => ({ label: cert.Name, value: cert.Name }));
        } else if (error) {
            console.error(error);
        }
    }
 
    handleOpenModal() {
        this.isModalOpen = true;
    }
 
    handleCloseModal() {
        this.isModalOpen = false;
    }
 
    handleEmployeeChange(event) {
        this.selectedEmployeeName = event.detail.value;
    }
 
    handleCertificationChange(event) {
        this.selectedCertificationName = event.detail.value;
    }
 
    async handleRequest() {
        try {
            // Validate selected names
            if (!this.selectedEmployeeName || !this.selectedCertificationName) {
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Error',
                    message: 'Please select both Employee and Certification before requesting.',
                    variant: 'error',
                }));
                return;
            }
 
            // Submit for Approval
            const result = await submitForApproval({
                employeeName: this.selectedEmployeeName,
                certificationName: this.selectedCertificationName
            });
 
            // Success Toast
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success',
                message: result,
                variant: 'success',
            }));
 
            // Close the modal
            this.isModalOpen = false;
        } catch (error) {
            console.error('Error:', error);
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error',
                message: error.body ? error.body.message : 'An error occurred while processing the request.',
                variant: 'error',
            }));
        }
    }
}