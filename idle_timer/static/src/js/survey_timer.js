/** @odoo-module **/
import SurveyFormWidget from '@survey/js/survey_form';

SurveyFormWidget.include({

    init() {
        this._super(...arguments);
        this.orm = this.bindService("orm");
    },

    _onSubmit: function (event) {
        this._super(...arguments)
        this.button = event.currentTarget.value
        console.log(this.button,'finish')
        if (event.currentTarget.value == 'start') {
            this.initIdleTimer();
        }
    },

// Idle time from configuration
    async initIdleTimer() {
        var self = this;
        const res_one = await this.orm.call("ir.config_parameter","get_param",['idle_time'])
//        self.idleTime = parseInt(res_one) || 60;
//        const res_two = await this.orm.call("ir.config_parameter","get_param",['timer_time'])
//        self.timeoutDuration = parseInt(res_two) || 60;
        self.idleTime = 3;
        self.timeoutDuration = 4;
        self.timeoutSeconds = self.idleTime + self.timeoutDuration;
        console.log(self.timeoutSeconds)
        $(document).on('mousemove keydown',resetTimer);

        function resetTimer() {
           console.log('RESET')
           self.timeoutSeconds = self.idleTime + self.timeoutDuration;
           document.querySelector('.o_survey_idle_timer').innerHTML = ""

        }

        var interval = setInterval(async () => {
            var questionRequired
            var $form = this.$('form');
            $form.find('[data-question-type]').each(function () {
               questionRequired = $(this).closest(".js_question-wrapper").data('required');
               console.log(questionRequired,'---------')
            })
            if(questionRequired){
                clearInterval(this.interval);
            }
            else{
                if (self.button !== 'finish'){
                   self.timeoutSeconds--;
                   console.log(self.timeoutSeconds,'first-')
                   if (self.timeoutSeconds <= self.timeoutDuration ) {
                       document.querySelector('.o_survey_idle_timer').innerHTML = self.timeoutSeconds + " " + "seconds left"
                   }
                   if (!self.timeoutSeconds){
                     resetTimer();
                     var nextButton = document.querySelector('button[type="submit"]');
                     if (nextButton) {
                        nextButton.click();
                     }
                   }
                }
            }
         }, 2000);
    }
})



//     _showErrors: function (errors) {
//        this._super(...arguments)
//        console.log('++++++++++++++++++++++++++++++=')
//        var self = this;
//        var errorKeys = Object.keys(errors || {});
//        var errorValues = Object.values(errors || {});
//        if (errorKeys){
//            console.log(errors,errorKeys,'-------------')
//        }
//    },
//    _validateForm: function ($form, formData) {
//        this._super(...arguments)
//        console.log($form, formData,'-----')
//    },
