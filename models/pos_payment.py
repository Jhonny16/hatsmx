# -*- coding: utf-8 -*-

from odoo import api, fields, models, _
from odoo.exceptions import UserError
import logging
_logger = logging.getLogger(__name__)

CARD = [
    ('C','Crédito'),
    ('D','Débito'),
]

class PosPayment(models.Model):
    _inherit = 'pos.payment'

    is_bank = fields.Boolean(related='payment_method_id.is_bank', string='Pagado por banco')
    is_card = fields.Boolean(related='payment_method_id.is_card', string='Pagado por tarjeta')
    bank_name = fields.Char('Nombre del banco')
    bank_code = fields.Char('Número de cuenta')
    bank_auth_deposit = fields.Char(string='Autorizo el depósito')
