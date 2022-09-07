import { LightningElement, api } from 'lwc';

export default class WizardStep2 extends LightningElement {
    @api leadId;
    
    handleSuccess(event) {
        const leaId = event.detail.id;
        this.dispatchEvent(new CustomEvent('next', {detail: leaId}));
    }

    handleClick(event){
        const leaId = event.detail.id;
        this.dispatchEvent(new CustomEvent('back', {detail: leaId}));
    }
}