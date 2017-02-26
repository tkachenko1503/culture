import _ from 'lodash';
import { View } from 'backbone';

export const MuseumGallary = View.extend({
    initialize() {
        this.imageNodes = [
            this.$el.find('.c-museum__picture_order_first'),
            this.$el.find('.c-museum__picture_order_second'),
            this.$el.find('.c-museum__picture_order_third'),
            this.$el.find('.c-museum__picture_order_firth')
        ];
    },

    updatePictures(pictures) {
        _.forEach(this.imageNodes, (node, i) => node.attr('src', pictures[i]));
    }
});