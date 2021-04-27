export default {
  configuration: {
    interaction: {
      pano: {
        showZoomUI: false,
        autoHideZoomUI: 2500,

        disablePan: false,
        disableZoom: false,
        disableXAxisPan: false,
        disableYAxisPan: false,

        minZoom: 1,
        maxZoom: 7,
        defaultZoom: 1,
        zoomPoint: 0.1,

        contain: 'outside',
        canvas: true
      },
      hd: {
        showZoomUI: false,
        autoHideZoomUI: 2500,

        disablePan: true,
        disableZoom: true,
        disableXAxisPan: true,
        disableYAxisPan: true,

        minZoom: 1,
        maxZoom: 7,
        defaultZoom: 1,
        zoomPoint: 0.1,

        contain: 'outside',
        canvas: false
      }
    }
  },
  zoomPointOptions: [
    { value: 0.01, title: '1%' },
    { value: 0.05, title: '5%' },
    { value: 0.1, title: '10%' },
    { value: 0.2, title: '20%' },
    { value: 0.25, title: '25%' },
    { value: 0.5, title: '50%' },
    { value: 0.75, title: '75%' },
    { value: 1, title: '100%' },
    { value: 1.25, title: '125%' },
  ],
  zoomOptions: [
    { value: 0.25, title: '25%' },
    { value: 0.5, title: '50%' },
    { value: 0.75, title: '75%' },
    { value: 1, title: '100%' },
    { value: 1.25, title: '125%' },
    { value: 1.5, title: '150%' },
    { value: 2, title: '200%' },
    { value: 2.5, title: '250%' },
    { value: 3, title: '300%' },
    { value: 3.5, title: '350%' },
    { value: 4, title: '400%' },
    { value: 4.5, title: '450%' },
    { value: 5, title: '500%' },
    { value: 5.5, title: '550%' },
    { value: 6, title: '600%' },
    { value: 6.5, title: '650%' },
    { value: 7, title: '700%' },
    { value: 8, title: '800%' },
    { value: 9, title: '900%' },
    { value: 10, title: '1000%' },
  ],
}
