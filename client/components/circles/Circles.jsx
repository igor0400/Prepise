import * as PIXI from 'pixi.js';
import { KawaseBlurFilter } from '@pixi/filter-kawase-blur';
import { createNoise2D } from 'simplex-noise';
import { debounce } from 'debounce';
import { useEffect } from 'react';

function random(min, max) {
   return Math.random() * (max - min) + min;
}

function map(n, start1, end1, start2, end2) {
   return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
}

const Circles = () => {
   useEffect(() => {
      const simplex = new createNoise2D();

      // Orb class
      class Orb {
         constructor(fill = 0x000000) {
            this.bounds = this.setBounds();
            this.x = random(this.bounds['x'].min, this.bounds['x'].max);
            this.y = random(this.bounds['y'].min, this.bounds['y'].max);

            this.scale = 1;

            this.fill = fill;

            this.radius = random(
               window.innerHeight / 6,
               window.innerHeight / 3
            );

            this.xOff = random(0, 1000);
            this.yOff = random(0, 1000);
            this.inc = 0.002;

            this.graphics = new PIXI.Graphics();
            this.graphics.alpha = 0.825;

            window.addEventListener(
               'resize',
               debounce(() => {
                  this.bounds = this.setBounds();
               }, 250)
            );
         }

         setBounds() {
            const maxDist =
               window.innerWidth < 750
                  ? window.innerWidth
                  : window.innerWidth < 1000
                  ? window.innerWidth / 1.5
                  : window.innerWidth / 3;
            const originX = window.innerWidth / 2;
            const originY = window.innerHeight / 2;

            return {
               x: {
                  min: originX - maxDist,
                  max: originX + maxDist,
               },
               y: {
                  min: originY - maxDist,
                  max: originY + maxDist,
               },
            };
         }

         update() {
            const xNoise = simplex(this.xOff, this.xOff);
            const yNoise = simplex(this.yOff, this.yOff);
            const scaleNoise = simplex(this.xOff, this.yOff);

            this.x = map(
               xNoise,
               -1,
               1,
               this.bounds['x'].min,
               this.bounds['x'].max
            );
            this.y = map(
               yNoise,
               -1,
               1,
               this.bounds['y'].min,
               this.bounds['y'].max
            );
            this.scale = map(scaleNoise, -1, 1, 0.5, 1);

            this.xOff += this.inc;
            this.yOff += this.inc;
         }

         render() {
            this.graphics.x = this.x;
            this.graphics.y = this.y;
            this.graphics.scale.set(this.scale);

            this.graphics.clear();

            this.graphics.beginFill(this.fill);
            this.graphics.drawCircle(0, 0, this.radius);
            this.graphics.endFill();
         }
      }

      const app = new PIXI.Application({
         view: document.querySelector('.orb-canvas'),
         resizeTo: window,
         transparent: true,
         backgroundColor: 0xf7f8fa,
      });

      app.stage.filters = [new KawaseBlurFilter(30, 10, true)];

      const orbs = [];
      const colors = [
         '0x33D833',
         '0x00FF00',
         '0x30FA44',
         '0x6FD83B',
         '0x16C172',
         '0x1FEE53',
         '0x26C90C',
         '0x2CCC3C',
         '0x00D559',
         '0x0ACDFF',
         '0x0BC9CD',
         '0x00A7E1',
         '0x01BAEF',
      ];

      for (let i = 0; i < 10; i++) {
         const orb = new Orb(colors[Math.floor(Math.random(0, 11) * 10)]);

         app.stage.addChild(orb.graphics);

         orbs.push(orb);
      }

      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
         app.ticker.add(() => {
            orbs.forEach((orb) => {
               orb.update();
               orb.render();
            });
         });
      } else {
         orbs.forEach((orb) => {
            orb.update();
            orb.render();
         });
      }
   }, []);

   return (
      <div className="absolute top-0 left-0 -z-10">
         <div className="relative">
            <div className="background"></div>
            <canvas className="orb-canvas"></canvas>
         </div>
      </div>
   );
};

export default Circles;
