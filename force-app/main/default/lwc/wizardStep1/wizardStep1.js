import { LightningElement } from 'lwc';

export default class WizardStep1 extends LightningElement {
    
    handleSuccess(event) {
        const leaId = event.detail.id;
        this.dispatchEvent(new CustomEvent('next', {detail: leaId}));
    }

}