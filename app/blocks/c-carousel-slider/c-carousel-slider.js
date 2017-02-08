import _ from 'lodash';
import { View } from 'backbone';

export const Carousel = View.extend({
    initialize({ widgetParams }) {
        const slides = this.$el.find('.c-carousel-slider__slides');
        const nav = this.$el.find('.c-carousel-slider__nav-buttons');

        $(slides).slick(_.defaults(
            widgetParams, 
            {
                infinite: false,
                variableWidth: true,
                prevArrow: nav.find('.c-carousel-slider__nav-previous'),
                nextArrow: nav.find('.c-carousel-slider__nav-next')
            }
        ));
    }
});
