# -*- coding: utf-8 -*-
#################################################################################
#
#   Copyright (c) 2016-Present Webkul Software Pvt. Ltd. (<https://webkul.com/>)
#   See LICENSE file for full copyright and licensing details.
#   License URL : <https://store.webkul.com/license.html/>
#
#################################################################################
from odoo import api, fields, models, _
from odoo.exceptions import UserError
import logging
_logger = logging.getLogger(__name__)


class PosOrder(models.Model):
    _inherit = 'pos.order'

    pos_payment_ids = fields.Many2many('pos.payment.method', compute='_compute_pos_payment_ids', string='Tipo de pago')
    #pos_payment_ids = fields.Many2many('pos.payment.method', related='payment_ids.payment_method_id')
    location_origin_ids = fields.Many2many('stock.location', string=u'Ubicación origen', compute='_compute_location_origin_ids')

    @api.depends('payment_ids')
    def _compute_pos_payment_ids(self):
        for record in self:
            pos_payment_ids = self.env['pos.payment.method']
            if record.payment_ids:
                for pay in record.payment_ids:
                    if pay.payment_method_id:
                        pos_payment_ids += pay.payment_method_id

            record.pos_payment_ids = pos_payment_ids

    @api.model
    def _payment_fields(self, order, ui_paymentline):
        res = super(PosOrder, self)._payment_fields(order, ui_paymentline)
        res['bank_name'] = ui_paymentline.get('bank_name')
        res['bank_code'] = ui_paymentline.get('bank_code')
        res['bank_auth_deposit'] = ui_paymentline.get('bank_auth_deposit')
        return res

    @api.depends('picking_ids')
    def _compute_location_origin_ids(self):
        for record in self:
            location_ids = self.env['stock.location']
            if record.picking_ids:
                for pick in record.picking_ids:
                    if pick.location_id:
                        location_ids += pick.location_id

            record.location_origin_ids = location_ids
