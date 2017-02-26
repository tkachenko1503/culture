import _ from 'lodash';
import { View } from 'backbone';

export const Slider = View.extend({
    SLIDER_NAME: '',

    initialize({ widgetParams }) {
        const slides = this.$el.find(`.${this.SLIDER_NAME}__slides`);
        const nav = this.$el.find(`.${this.SLIDER_NAME}__nav-buttons`);

        $(slides).slick(_.defaults(
            widgetParams, 
            {
                infinite: false,
                variableWidth: true,
                prevArrow: nav.find(`.${this.SLIDER_NAME}__nav-previous`),
                nextArrow: nav.find(`.${this.SLIDER_NAME}__nav-next`)
            }
        ));

        this.slider = $(slides);
    }
});
