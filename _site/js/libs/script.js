
var $body = $('body');


LastFMStatus.init({
    username: "mrathee"
});





// function animatedIcons() {
//   /* Icon 11 */
//   var el11 = document.querySelector('.animated-logo'), el11span = el11.querySelector('span');
//   var opacityCurve11 = mojs.easing.path('M0,0 C0,87 27,100 40,100 L40,0 L100,0');
//   var scaleCurve11 = mojs.easing.path('M0,0c0,80,39.2,100,39.2,100L40-100c0,0-0.7,106,60,106');
//   new Animocon(el11, {
//     tweens : [
//       // ring animation
//       new mojs.Transit({
//         parent: el11,
//         duration: 1000,
//         delay: 100,
//         type: 'circle',
//         radius: {0: 95},
//         fill: 'transparent',
//         stroke: '#C0C1C3',
//         strokeWidth: {50:0},
//         opacity: 0.4,
//         x: '50%',
//         y: '50%',
//         isRunLess: true,
//         easing: mojs.easing.bezier(0, 1.6, 0.5, 1)
//       }),
//       new mojs.Transit({
//         parent: el11,
//         duration: 1100,
//         delay: 100,
//         type: 'circle',
//         radius: {0: 85},
//         fill: 'transparent',
//         stroke: '#C0C1C3',
//         strokeWidth: {50:0},
//         opacity: 0.4,
//         x: '50%',
//         y: '50%',
//         isRunLess: true,
//         easing: mojs.easing.bezier(0, 0.4, 0.5, 1)
//       }),
//       new mojs.Transit({
//         parent: el11,
//         duration: 1375,
//         delay: 90,
//         type: 'circle',
//         radius: {0: 115},
//         fill: 'transparent',
//         stroke: '#C0C1C3',
//         strokeWidth: {50:0},
//         opacity: 0.4,
//         x: '50%',
//         y: '50%',
//         isRunLess: true,
//         easing: mojs.easing.bezier(0, 1, 0.5, 1)
//       }),
//       // ring animation
//       new mojs.Transit({
//         parent: el11,
//         duration: 1800,
//         delay: 300,
//         type: 'circle',
//         radius: {0: 80},
//         fill: 'transparent',
//         stroke: '#C0C1C3',
//         strokeWidth: {40:0},
//         opacity: 0.2,
//         x: '50%',
//         y: '50%',
//         isRunLess: true,
//         easing: mojs.easing.bezier(0, 1, 0.5, 1)
//       }),
//       // icon scale animation
//       new mojs.Tween({
//         duration : 2000,
//         easing: mojs.easing.ease.out,
//         onUpdate: function(progress) {
//           var opacityProgress = opacityCurve11(progress);
//           el11span.style.opacity = opacityProgress;

//           var scaleProgress = scaleCurve11(progress);
//           el11span.style.WebkitTransform = el11span.style.transform = 'scale3d(' + scaleProgress + ',' + scaleProgress + ',1)';

//           var colorProgress = opacityCurve11(progress);
//           el11.style.color = colorProgress >= 1 ? '#E87171' : '#C0C1C3';
//         }
//       })
//     ],
//     onUnCheck : function() {
//       el11.style.color = '#C0C1C3';
//     }
//   });
//   /* Icon 11 */

// }

// animatedIcons();



//  var scaleCurve = mojs.easing.path('M0,100 L25,99.9999983 C26.2328835,75.0708847 19.7847843,0 100,0');
//   var el = document.querySelector('.animated-logo'),
//   var interiorLogo = el.querySelector('.mountain-monday'),
//   // mo.js timeline obj
//   var timeline = new mojs.Timeline(),

//   // tweens for the animation:

//   // burst animation
//   tween1 = new mojs.Burst({
//     parent: el,
//     duration: 800,
//     delay: 200,
//     // shape : 'circle',
//     shape : 'star',
//     fill : [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
//     x: '50%',
//     y: '50%',
//     opacity: 0.6,
//     childOptions: { radius: {20:5} },
//     radius: {40:80},
//     count: 22,
//     // isSwirl: true,
//     isRunLess: true,
//     easing: mojs.easing.bezier(.89,0,.19,1)
//   }),
//   // ring animation
//   tween2 = new mojs.Transit({
//     parent: el,
//     duration: 800,
//     delay: 200,
//     type: 'circle',
//     radius: {0: 50},
//     fill: 'transparent',
//     stroke: '#988ADE',
//     strokeWidth: {5:0},
//     opacity: 0.6,
//     x: '50%',
//     y: '50%',
//     isRunLess: true,
//     easing: mojs.easing.bezier(.89,0,.19,1)
//   }),
//   // icon scale animation
//   tween3 = new mojs.Tween({
//     duration : 1000,
//     onUpdate: function(progress) {
//       var scaleProgress = scaleCurve(progress);
//       interiorLogo.style.WebkitTransform = interiorLogo.style.transform = 'scale3d(' + scaleProgress + ',' + scaleProgress + ',1)';
//     }
//   });

//   tween1 = new mojs.Burst({
//     parent: el,
//     duration: 1000,
//     shape : 'circle',
//     fill : [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
//     // fill : 'white',
//     x: '50%',
//     y: '50%',
//     childOptions: {
//       radius: {12:0},
//       type: 'line',
//       stroke: '#988ADE',
//       strokeWidth: 2
//     },
//     radius: {40:110},
//     count: 20,
//     isRunLess: true,
//     easing: mojs.easing.bezier(0,0,.04,1)
//   }),
//   // ring animation
//   tween2 = new mojs.Transit({
//     parent: el,
//     duration: 700,
//     type: 'circle',
//     radius: {10: 60},
//     fill: 'transparent',
//     // stroke: '#988ADE',
//     stroke : [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
//     strokeWidth: {30:0},
//     count: 3,
//     x: '50%',
//     y: '50%',
//     isRunLess: true,
//     easing: mojs.easing.bezier(0,0,.04,1)
//   }),
//   // icon scale animation
//   tween3 = new mojs.Tween({
//     duration : 700,
//     easing: mojs.easing.bezier(0,0,.04,1),
//     onUpdate: function(progress) {
//       var scaleProgress = scaleCurve(progress);
//       interiorLogo.style.WebkitTransform = interiorLogo.style.transform = 'scale3d(' + progress + ',' + progress + ',1)';
//     }
//   });


// // add tweens to timeline:
// if (el.length && interiorLogo.length) {
//   timeline.add(tween1, tween2, tween3);
//   timeline.start();
// }








// Within Viewport
// $('#main-footer').withinviewport({top: -300});






// // Twitter Button
// !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");





