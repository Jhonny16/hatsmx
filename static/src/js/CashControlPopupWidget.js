odoo.define('l10n_cr_hatsmx.CashControlPopupWidget', function (require) {
    'use strict';

    var rpc = require('web.rpc');
    const { useListener } = require('web.custom_hooks');
	const AbstractAwaitablePopup = require('point_of_sale.AbstractAwaitablePopup');
	const Registries = require('point_of_sale.Registries');

    class CashControlPopupWidget extends AbstractAwaitablePopup {
        click_cash_in(event){
            this.showPopup('CashInPopupWidget', {
                'title': this.env._t('Cash IN'),
            });
        }
        click_cash_out(event){
            this.showPopup('CashOutPopupWidget', {
                'title': this.env._t('Cash OUT'),
            });
        }
        click_set_closing_cash(event){
            this.showPopup('SetClosingBalancePopupWidget', {
                'title': this.env._t('Set Closing Balance'),
            });
        }
        click_show_payments(event){
            var self = this;
            var session_details = {
                'pos_session_id' : self.env.pos.pos_session.id,
            }
            rpc.query({
                model: 'pos.session',
                method: 'get_payments',
                args: [session_details],
            }).then(function (result) {
                self.showPopup('PaymentsPopupWidget', {
                    'title': self.env._t('Payments'),
                    'payments': result
                });
            }).catch(function (error) {
                console.log("---fail---",error)
                self.showPopup('ErrorPopup', {
                    title: self.env._t('Unable to Show Payments'),
                    body: self.env._t('Unable to show Payments, due to some error. Please check internet connection.'),
                });
            });
        }
    }
    CashControlPopupWidget.template = 'CashControlPopupWidget';
    Registries.Component.add(CashControlPopupWidget);
});

