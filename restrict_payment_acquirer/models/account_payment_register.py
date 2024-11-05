# -*- coding: utf-8 -*-

from odoo import models, fields, api


class AccountPaymentRegister(models.TransientModel):
    _inherit = 'account.payment.register'

    @api.depends('payment_type', 'journal_id', 'currency_id','amount')
    def _compute_payment_method_line_fields(self):
        """restrict methods inside the many-2-one of payment methods in the wizard for payment reg. inside sales"""
        print(self.amount, 'wizard.amount')
        for wizard in self:
            print(wizard.journal_id._get_available_payment_method_lines(wizard.payment_type)    , 'manual')
            if wizard.journal_id:
                for rec in wizard.journal_id._get_available_payment_method_lines(wizard.payment_type):
                    print(rec.name,wizard.available_payment_method_line_ids,'rec')
                    if(rec.name == "Manual Payment"):
                        wizard.available_payment_method_line_ids = rec
                    if (rec.payment_provider_id.maximum_amount >= wizard.amount and rec.payment_provider_id.minimum_amount <= wizard.amount):
                        wizard.available_payment_method_line_ids += rec

            else:
                wizard.available_payment_method_line_ids = False
            print(wizard.available_payment_method_line_ids, 'rec')





