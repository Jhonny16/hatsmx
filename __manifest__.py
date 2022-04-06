# -*- coding: utf-8 -*-
{
    "name": "HATSMX",
    'summary': """
            Módulo HATSMX""",
    'description': """
           1. Personalizaciones.
        """,
    'version': '14.0.0.1',
    "author": "Jhonny Mack Merino Samillán",
    'license': 'LGPL-3',
    "depends": ['base', 'pos_cash_control', 'point_of_sale'],
    'data': [
        #'security/ir.model.access.csv',
        'views/assets.xml',
        'views/pos_order_views.xml',
        'views/pos_payment_method_views.xml',
        'views/pos_payment_views.xml',
    ],
    'qweb': [
        'static/src/xml/CashControlPopupWidget.xml',
        'static/src/xml/FinancialEntityPopupWidget.xml',
    ],
}
