const { JSDOM } = require("jsdom");
const assert = require('assert');

const $ = require('../lib/index').default;

beforeEach(() => {
    const dom = new JSDOM(
      `<html>
         <body>
         </body>
       </html>`,
    );
  
    global.window = dom.window;
    global.document = dom.window.document;
    global.HTMLElement = dom.window.HTMLElement;
    global.CustomEvent = dom.window.CustomEvent
  });

describe('SimpleJQuery', () => {
    describe('#newInstance', () => {
        it('should call callback when dom already loaded', (done) => {

            let called = false;
            $(() => {
                called = true;
            });

            setTimeout(function() {
                assert.strictEqual(true, called);
                done();
            }, 5);
        });

        it('should select all elements by css selector', () => {
            document.body.innerHTML = '<div><a>Link1</a><a>Link2</a><a>Link3</a></div>';

            let sQ = $('div a');

            assert.strictEqual(3, sQ.elements.length);
        });

        it('should clone elements from other SimpleQuery', () => {
            document.body.innerHTML = '<div><a>Link1</a><a>Link2</a><a>Link3</a></div>';

            let sQ = $('div a');
            let sQ1 = $(sQ);

            assert.strictEqual(3, sQ1.elements.length);
        });

        it('should set elements HTMLElement', () => {
            document.body.innerHTML = '<div id="div1"></div>';
           
            let sQ = $(document.getElementById('div1'));

            assert.strictEqual(1, sQ.elements.length);
        });

        it('should set empty elements for invalid input', () => {
            document.body.innerHTML = '<div id="div1"></div>';
           
            let sQ = $(document.getElementById(1));

            assert.strictEqual(0, sQ.elements.length);
        });
    });
});
