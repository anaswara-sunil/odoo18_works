# -*- coding: utf-8 -*-
{
    'name': "restrict_payment_acquirer",
    'description': """ Restrict payment acquirers based on the order amount. 
                    Users should be able to set a minimum and maximum amount 
                    on which each payment acquirer applies.
                    """,
    'version': '18.0.1.0.0',
    'depends': ['base','account', 'payment','sale'],

    'data': [
        'views/payment_provider.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'restrict_payment_acquirer/static/src/js/payment_form.js',
     ],
    },
}

