odoo.define('l10n_cr_hatsmx.model', function (require) {
    "use strict";

    var models = require('point_of_sale.models');
    var SuperPaymentline = models.Paymentline.prototype;

    models.load_fields('pos.payment.method', ['is_bank','is_card']);

    models.Paymentline = models.Paymentline.extend({
        initialize: function () {
            SuperPaymentline.initialize.apply(this, arguments);
            this.bank_name = '';
            this.bank_code = '';
            this.bank_auth_deposit = '';
            this.complete_data = false;
        },

        export_as_JSON: function () {
            var Payment = SuperPaymentline.export_as_JSON.apply(this, arguments);
            Payment.bank_name = this.bank_name
            Payment.bank_code = this.bank_code
            return Payment;
        },

         set_complete_data: function(value){
            this.complete_data = value
         }

     });
});