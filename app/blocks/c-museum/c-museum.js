import _ from 'lodash';
import { View } from 'backbone';
import { InfoSlider } from '../c-info-slider/c-info-slider';
import { MuseumGallary } from '../c-museum/c-museum__gallary';

export const Museum = View.extend({
    initialize({ widgetParams }) {
        const infoSlider = new InfoSlider({
            el: this.$el.find('.c-info-slider'),
            widgetParams: widgetParams.infoSliderParams
        });
        const museumGallary = new MuseumGallary({
            el: this.$el.find('.c-museum__gallary')
        });

        infoSlider.slider.on('afterChange', (event, slick, currentSlide) => {
            const slide = widgetParams.slides[currentSlide];

            museumGallary.updatePictures(slide.pictures);
        });
    }
});