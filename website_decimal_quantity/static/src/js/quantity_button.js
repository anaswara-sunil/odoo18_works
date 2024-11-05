/* @odoo-module */

import { QuantityButtons } from '@sale/js/quantity_buttons/quantity_buttons';

import { patch } from "@web/core/utils/patch";

patch(QuantityButtons.prototype, {
// increase and decrease buttons inside the wizard for adding combo products
     increaseQuantity() {
        this.props.setQuantity(parseFloat((this.props.quantity + .1).toFixed(2)));
     },
     decreaseQuantity() {
        this.props.setQuantity(parseFloat((this.props.quantity - .1).toFixed(2)));
     },

});
