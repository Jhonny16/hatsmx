odoo.define('l10n_cr_hatsmx.PaymentScreen', function(require) {
	'use strict';

	const PaymentScreen = require('point_of_sale.PaymentScreen');
	const Registries = require('point_of_sale.Registries');
	const session = require('web.session');
    const { useListener } = require('web.custom_hooks');
	var models = require('point_of_sale.models');


	const PaymentScreenExtend = PaymentScreen =>
		class extends PaymentScreen {
			constructor() {
				super(...arguments);
			}

            async validateOrder(isForceValidate) {
                 var t = this;
                 //var title = if t.payment.is_card ? 'Completar datos de tarjeta' : 'Completar datos de banco'
                 var payment_lines = t.paymentLines;
                 if(payment_lines != undefined){
                    var sw = 0;
                    var paymentline;
                    var type = '';
                    for(var i=0; i<payment_lines.length; i++){
                        if ( (payment_lines[i].payment_method.is_card || payment_lines[i].payment_method.is_bank) && payment_lines[i].complete_data == false){
                            sw=1;
                            paymentline = payment_lines[i];
                            if (payment_lines[i].payment_method.is_card){
                                type = 'card'
                            }else{
                                type = 'bank'
                            }
                            break;
                        }
                    }
                    //Mostrar modal de completado de datos para tarjeta y banco
                    if(sw==1){
                         t.showPopup('FinancialEntityPopupWidget', {
                            'title': (type == 'card') ? 'Datos de Tarjeta' : 'Datos de Banco',
                            'paymentline_cid': paymentline.cid,
                            'type': type,
                         });
                    }else{
                            swal({
                                  title: "Estimado " + t.env.pos.employee.name + ', ??Seguro que deseas continuar?',
                                  text: "No podr??s deshacer este paso.. ",
                                  icon: "warning",
                                  buttons: ["No seguir??", "Adelante!"],
                                }
                             ).then((value) => {
                                 if (value) {
                                     super.validateOrder(isForceValidate);
                                  } else {
                                    console.log("No hacer nada...");
                                  }
                            });

                    }

                 }

            }

		}

	Registries.Component.extend(PaymentScreen, PaymentScreenExtend);

	return PaymentScreen;

});