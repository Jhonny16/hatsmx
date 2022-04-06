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


class PosSession(models.Model):
    _inherit = 'pos.session'

    @api.model
    def get_payments(self, kwargs):
        results = {}
        if kwargs.get('pos_session_id'):
            pos_session_id = self.search([('id', '=', kwargs.get('pos_session_id'))])
            if pos_session_id:
                results['cash_register_balance_start'] = pos_session_id.cash_register_balance_start
                results['cash_register_total_entry_encoding'] = pos_session_id.cash_register_total_entry_encoding
                results['cash_register_balance_end'] = pos_session_id.cash_register_balance_end
                results['cash_register_balance_end_real'] = pos_session_id.cash_register_balance_end_real
            payments = self.env['pos.payment'].search([('session_id', '=', kwargs.get('pos_session_id'))])
            if payments and len(payments):
                values = []
                for payment in payments:
                    result = {}
                    result['payment_name'] = payment.payment_method_id.name
                    result['pos_order_name'] = payment.pos_order_id.name
                    result['amount'] = payment.amount
                    result['payment_date'] = payment.payment_date.date()
                    values.append(result)
                results['values'] = values
            results['totales'] = self._get_total_payments(pos_session_id)
        return results



    def _get_total_payments(self,sessions):
        for session in sessions:
            payments_session = self.env['pos.payment'].search([('session_id', '=', session.id)])
            array = []
            if payments_session:
                query = """ select 
                              ppp.id as ide, ppp."name", sum(pp.amount) as total
                              from pos_payment pp inner join pos_payment_method ppp on pp.payment_method_id = ppp."id"
                              where pp.id """
                if len(payments_session.ids) > 1:
                    ids = tuple(payments_session.ids)
                    query += """  in {0} """.format(ids)
                else:
                    id = payments_session.id
                    query += """  = {0} """.format(id)
                query += """ group by ppp.id, ppp.name"""
                self.env.cr.execute(query)
                q = self.env.cr.fetchall()
                if q:
                    for res in q:
                        data_json = {
                            'ide': res[0],
                            'name': res[1],
                            'total': res[2],
                            'session_id': session.id,
                        }
                        array.append(data_json)

            return array
