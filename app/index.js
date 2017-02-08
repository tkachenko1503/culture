import _ from 'lodash';
import { View } from 'backbone';
import { Carousel } from './blocks/c-carousel-slider/c-carousel-slider';
import { SearchMap } from './blocks/c-search-map/c-search-map';

const WIDGETS = {
    carousel: Carousel,
    searchMap: SearchMap
};

const App = View.extend({
    widgets: [],

    initialize() {
        this.initializeWidgets();
    },

    initializeWidgets() {
        const nodesWithWidgets = this.$('[data-js-widget]');

        _.forEach(nodesWithWidgets, _.bind(this.initializeWidget, this));
    },

    initializeWidget(node) {
        const widgetType = node.dataset['jsWidget'];
        const widgetParams = node.dataset['jsParams'];
        const Widget = WIDGETS[widgetType];

        if (Widget) {
            this.widgets.push(new Widget({
                el: node,
                widgetParams: widgetParams && JSON.parse(widgetParams)
            }));
        }
    }
});

// start
$(function () {
    const app = new App({
        el: $('#culture-app')
    });
});