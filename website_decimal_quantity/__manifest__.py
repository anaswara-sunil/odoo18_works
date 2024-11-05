# -*- coding: utf-8 -*-
{
    'name': "website_decimal_quantity",
    'description': """
        In the website shop, when the user clicks on the + or - button 
        to adjust quantity, It should add or deduct .1 value from it 
        """,
    'version': '18.0.1.0.0',
    'installable': True,
    # any module necessary for this one to work correctly
    'depends': ['base','website', 'sale','website_sale'],
    # always loaded
    'data': [
    ],
    'assets': {
        'web.assets_frontend': [
            'website_decimal_quantity/static/src/js/website_sale.js',
            'website_decimal_quantity/static/src/js/quantity_button.js'
    ],
    }
}

