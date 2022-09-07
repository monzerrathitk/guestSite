import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class TestWizard extends NavigationMixin(LightningElement) {
    steps = [{label: "Personal Information", value: "1"}, {label: "Requiered Information", value: "2"}, {label: "Upload File", value: "3"}];
    current = "1";
    currentIndex = 0;
    leadId;

    get step1() {
        return this.current == this.steps[0].value;
    }

    get step2() {
        return this.current == this.steps[1].value;
    }

    get step3() {
        return this.current == this.steps[2].value;
    }

    handleNext(event) {
        this.leadId = event.detail;
        if(this.currentIndex + 1 == this.steps.length) {
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: this.leadId,
                    actionName: 'view'
                }
            });
        } else {
            this.currentIndex++;
            this.current = this.steps[this.currentIndex].value;
        }
        
    }

    handleBack(event){
        this.leadId = event.detail;
        if(this.currentIndex + 1 == this.steps.length) {
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: this.leadId,
                    actionName: 'view'
                }
            });
        } else {
            this.currentIndex--;
            this.current = this.steps[this.currentIndex].value;
        }
    }

}