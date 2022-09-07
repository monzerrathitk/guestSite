import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import fetchFiles from '@salesforce/apex/UploadFilesCtrl.fetchFiles';
import deleteFile from '@salesforce/apex/UploadFilesCtrl.deleteFile';
export default class FileUploadExample extends LightningElement {
    @api leadId;
    @track lstAllFiles;
    @track error;

    connectedCallback() {
        fetchFiles({recordId : this.leadId})
        .then(result=>{
            this.lstAllFiles = result; 
            this.error = undefined;
        }).catch(error=>{
            this.lstAllFiles = undefined; 
            this.error = error;
        })
    }

    get acceptedFormats() {
        return ['.pdf'];
    }

    handleUploadFinished(event) {
        const uploadedFilesSize = event.detail.files.length;
        const evt = new ShowToastEvent({
            title: 'SUCCESS',
            message: uploadedFilesSize + ' File(s) uploaded successfully',
            variant: 'success',
        });

        this.dispatchEvent(evt);
        this.connectedCallback();
    }

    handleClick(event) {
        let arrayIndex = event.target.value;
        let deletedFile = this.lstAllFiles[arrayIndex];
        this.lstAllFiles.splice(arrayIndex,1);
        deleteFile({ fileId : deletedFile.Id, leadId : this.leadId })
            .then((result) => {
                this.error = undefined;
            })
            .catch((error) => {
                this.error = error;
                console.log(JSON.stringify(this.error));
            });
    }

    handleFinishClick(event){
        window.location.reload();
    }

    handleBack(event){
        const leaId = event.detail.id;
        this.dispatchEvent(new CustomEvent('back', {detail: leaId}));
    }
}