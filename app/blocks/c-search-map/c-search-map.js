import _ from 'lodash';
import { View } from 'backbone';

export const SearchMap = View.extend({
    initialize() {
        ymaps.ready(_.bind(this.initializeMap, this));
    },

    initializeMap() {
        const map = new ymaps.Map(this.el.id, {
            center: [55.76, 37.64], 
            zoom: 15,
            controls: []
        });
        map.behaviors
            .disable(['scrollZoom'])
    }
});