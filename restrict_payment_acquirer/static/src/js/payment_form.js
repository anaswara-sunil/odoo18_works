/** @odoo-module **/

import PaymentForm from "@payment/js/payment_form";
import { useService } from "@web/core/utils/hooks";
import { _t } from "@web/core/l10n/translation";


PaymentForm.include({
//"""Overriding the Submit action of the payment inside website shop.Checking min and max inside the
//   selected provider and raising error according to the check function"""

    async _submitForm(ev) {
    // """pay now button action"""

        ev.stopPropagation();
        ev.preventDefault();

        const checkedRadio = this.el.querySelector('input[name="o_payment_radio"]:checked');
        const totalAmount = this.paymentContext.amount;
        const providerId = this._getProviderId(checkedRadio)
        console.log(totalAmount,providerId,'--------------')
        const providerInfo = await this.orm.searchRead(
             "payment.provider",
            [["id", "=", providerId]],
            ["minimum_amount", "maximum_amount"]
            );
        console.log(providerInfo)

        if (providerInfo[0].minimum_amount){
            console.log(providerInfo[0].minimum_amount)
            const min_max_value = "min"
            if(providerInfo[0].minimum_amount >= totalAmount ){
                await this.orm.call("payment.provider","error_popup_demo",[min_max_value],{})
        }
        };
        if (providerInfo[0].maximum_amount){
            console.log(providerInfo[0].maximum_amount)
            const min_max_value = "max"
            if(providerInfo[0].maximum_amount <= totalAmount ){
                await this.orm.call("payment.provider","error_popup_demo",[min_max_value],{})
        }
        }

        // Block the entire UI to prevent fiddling with other widgets.
        this._disableButton(true);

        // Initiate the payment flow of the selected payment option.
        const flow = this.paymentContext.flow = this._getPaymentFlow(checkedRadio);
        const paymentOptionId = this.paymentContext.paymentOptionId = this._getPaymentOptionId(
            checkedRadio
        );

        if (flow === 'token' && this.paymentContext['assignTokenRoute']) { // Assign token flow.
            await this._assignToken(paymentOptionId);
        }else { // Both tokens and payment methods must process a payment operation.
            const providerCode = this.paymentContext.providerCode = this._getProviderCode(
                checkedRadio
            );
            const pmCode = this.paymentContext.paymentMethodCode = this._getPaymentMethodCode(
                checkedRadio
            );
            this.paymentContext.providerId = this._getProviderId(checkedRadio);
            if (this._getPaymentOptionType(checkedRadio) === 'token') {
                this.paymentContext.tokenId = paymentOptionId;
            } else { // 'payment_method'
                this.paymentContext.paymentMethodId = paymentOptionId;
            }
            const inlineForm = this._getInlineForm(checkedRadio);
            this.paymentContext.tokenizationRequested = inlineForm?.querySelector(
                '[name="o_payment_tokenize_checkbox"]'
            )?.checked ?? this.paymentContext['mode'] === 'validation';
            await this._initiatePaymentFlow(providerCode, paymentOptionId, pmCode, flow);
        }
    },

});


