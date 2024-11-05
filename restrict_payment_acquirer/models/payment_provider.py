# -*- coding: utf-8 -*-

from odoo import models, fields, api
from odoo.exceptions import UserError, ValidationError


class PaymentProvider(models.Model):
    _inherit = 'payment.provider'

    minimum_amount = fields.Monetary(
        string="Minimum Amount",
        help="The minimum payment amount that this payment provider is available for. Leave blank "
             "to make it available for any payment amount.",
        currency_field='main_currency_id',
    )

    @api.model
    def error_popup_demo(self,min_max_value):
        """To raise error inside the shop/payment while clicking 'pay now' button """
        print(min_max_value)
        if (min_max_value == "min"):
            raise (ValidationError("Order amount is smaller than the Provider's Minimum Amount"))
        if (min_max_value == "max"):
            raise (ValidationError("Order amount is greater than the Provider's Maximum Amount"))

