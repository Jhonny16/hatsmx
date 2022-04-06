# -*- coding: utf-8 -*-

from odoo import fields, models, _

CARD = [
    ('C','Crédito'),
    ('D','Débito'),
]

class PosPaymentFinancialEntity(models.Model):
    _name = "pos.payment.financial.entity"
    _description = "Entidad financiera: tarjeta - banco"
    _order = 'id desc'
    _rec_name = 'name'

    card_type = fields.Selection(CARD, string='Tipo tarjeta')
    bank_name = fields.Char(string='Nombre de banco')
    name = fields.Char(string='Nombre')
    authorization = fields.Char(string='Autorización')
    owner = fields.Char('Propietario')

