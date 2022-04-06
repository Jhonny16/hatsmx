odoo.define('l10n_cr_hatsmx.FinancialEntityPopupWidget', function (require) {
    "use strict";
    var core = require('web.core');
    var rpc = require('web.rpc');
    var _t  = core._t;
    var models = require('point_of_sale.models');
    const AbstractAwaitablePopup = require('point_of_sale.AbstractAwaitablePopup');
    const ProductScreen = require('point_of_sale.ProductScreen');
    const PosComponent = require('point_of_sale.PosComponent');
    const Registries = require('point_of_sale.Registries');

    const { useListener } = require('web.custom_hooks');

    class FinancialEntityPopupWidget extends AbstractAwaitablePopup {
        constructor() {
			super(...arguments);
		}

        click_confirm(event){
            var self = this;
            var order = self.env.pos.get_order();
            var paymentlines = self.env.pos.get_order().get_paymentlines();
            var cid = self.props.paymentline_cid;
            var type = self.props.type;

            if(paymentlines){
                var paymentline = false;
                for(var i = 0; i < paymentlines.length; i++){
                    paymentline = false;
                    if(paymentlines[i].cid == cid ){
                        paymentline = paymentlines[i];
                        break;
                    }
                }

                if(paymentline){
                    if(type == 'card'){
                        paymentline.card_type = $("#card_type").val();
                        if($("#card_type").val() == ""){
                             swal('Aviso.','Complete todos los campos!','info');
                             return false;
                        }

                    }
                    paymentline.bank_name = $("#bank_name").val();
                    if($("#bank_name").val() == "" ){
                         swal('Aviso.','Complete todos los campos!','info');
                         return false;
                    }
                    paymentline.bank_code = $("#bank_code").val();
                    if($("#bank_code").val() == "" ){
                         swal('Aviso.','Complete todos los campos!','info');
                         return false;
                    }
                    paymentline.transaction_id = $("#transaction_id").val();
                    if($("#transaction_id").val() == "" ){
                         swal('Aviso.','Complete todos los campos!','info');
                         return false;
                    }
                     if(type == 'bank'){
                        paymentline.bank_auth_deposit = $("#bank_auth_deposit").val();
                        paymentline.cardholder_name = $("#cardholder_name").val();
                        if($("#bank_auth_deposit").val() == "" ){
                             swal('Aviso.','Complete todos los campos!','info');
                             return false;
                        }
                        if($("#cardholder_name").val() == "" ){
                             swal('Aviso.','Complete todos los campos!','info');
                             return false;
                        }

                    }

                    paymentline.complete_data = true;

                    self.trigger('close-popup');


                }

            }
        }
    }

    FinancialEntityPopupWidget.template = 'FinancialEntityPopupWidget';
    Registries.Component.add(FinancialEntityPopupWidget);



})
