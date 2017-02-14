import _ from 'lodash';
import { View } from 'backbone';
import { Carousel } from '../c-carousel-slider/c-carousel-slider';

export const SearchMap = View.extend({
    events: {
        'click .c-search-map-point-snippet': 'attachPoint'
    },

    initialize({ widgetParams }) {
        this.points = widgetParams.points;

        ymaps.ready(_.bind(this.initializeMap, this));

        this.slider = new Carousel({
            el: this.$('.c-carousel-slider'),
            widgetParams: widgetParams.slider
        });
    },

    initializeMap() {
        const mapContainer= this.$('.c-search-map__container')[0];
        const myCollection = new ymaps.GeoObjectCollection({}, {});
        const coords = _.map(this.points, 'coords');
                
        this.map = new ymaps.Map(mapContainer, {
            center: [55.76, 37.64],
            zoom: 15,
            controls: []
        });
        
        _.each(this.points, point => {
            const placemark = createPlacemark(point);

            point.placemark = placemark;
            myCollection.add(placemark);
        });

        this.map.behaviors.disable(['scrollZoom']);
        this.map.geoObjects.add(myCollection);
        this.map.setBounds(coords, {
            checkZoomRange: true
        });
    },

    attachPoint(event) {
        const pointId = event.currentTarget.dataset['pointId'];
        const point = _.find(this.points, {id: Number(pointId)});

        this.map.setCenter([
            point.coords[0] - 0.02,
            point.coords[1] + 0.02
        ]);
        point.placemark.balloon.open();
    }
});

function createPlacemark(point) {
    return new ymaps.Placemark(point.coords, {
        balloonContentHeader: point.title,
        balloonContentBody: point.address
    }, {
        iconLayout: 'default#image',
        iconImageHref: '/images/map-point.svg',
        iconImageSize: [20, 28],
        iconOffset: [3, 35],
        hideIconOnBalloonOpen: false
    });
}