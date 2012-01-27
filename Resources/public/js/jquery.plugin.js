/**
 * @author David Badura <badura@simplethings.de>
 */
(function($, jQuery) {
    jQuery.fn.simpleThingsFormExtraValidation = function (options) {
        options = jQuery.extend({}, jQuery.fn.simpleThingsFormExtraValidation.defaults, options);

        return $(this).each(function() {

            var objectName = $(this).data('simplethings-validation-class');

            if(typeof options.constraints[objectName] != 'undefined') {
                $(this).find('input').each(function() {

                    var $this = $(this);

                    var name = $this.attr('name');
                    name = name.substr(name.indexOf("[") + 1, name.indexOf("]") - name.indexOf("[") - 1);

                    options.onCreate($this);

                    $this.bind(options.event, function() {

                        if(typeof options.constraints[objectName][name] != 'undefined') {
                            if(options.validator.isValid($this.val(), options.constraints[objectName][name])) {
                               $this.trigger({
                                   type: 'validationSuccess'
                               });
                            } else {
                               $this.trigger({
                                   type: 'validationError',
                                   violations: options.validator.violations
                               });
                            }
                        }

                    });

                });
            }

        });
    };

    jQuery.fn.simpleThingsFormExtraValidation.defaults = {
        validator: null,
        constraints: null,
        onCreate: function(object) {},
        event: 'blur'
    };

})(jQuery, jQuery);