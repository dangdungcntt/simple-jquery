class SimpleJQuery {
    constructor(input) {
        if (typeof input == 'string') {
            this.elements = Array.from(document.querySelectorAll(input));
            return;
        }

        if (typeof input == 'function') {
            if (document.readyState == 'complete') {
                input();
            } else {
                document.addEventListener('DOMContentLoaded', input);
            }
            return;
        }

        if (input instanceof SimpleJQuery) {
            this.elements = input.elements;
            return;
        }

        if (input instanceof HTMLElement) {
            this.elements = [input];
            return;
        }

        this.elements = [];
    }

    text(...args) {
        if (args.length == 0) {
            return this.elements.map(el => el.innerText).join('');
        }

        this.elements.forEach(el => el.innerText = args[0]);
        return this;
    }

    show() {
        this.elements.forEach(el => el.style.display = 'block');
    }

    hide() {
        this.elements.forEach(el => el.style.display = 'none');
    }

    on(eventName, ...args) {
        if (!eventName) {
            throw new Error('Missing eventName');
        }

        if (args.length == 0) {
            throw new Error('Missing target or callback');
        }

        let target = null;
        let callback = null;

        if (args.length == 1) {
            callback = args[0];
        } else {
            target = args[0];
            callback = args[1];
        }

        this.elements.forEach(el => {
            el.addEventListener(eventName, (e) => {
                if (target && !e.target.matches(target)) {
                    return;
                }
                callback.bind(e.target)(e);
            });
        });

        return this;
    }
}

const $ = (input) => {
    return new SimpleJQuery(input);
};

$.ajax = async (options) => {
    const res = await fetch(options.url, {
        method: options.method,
        mode: options.mode,
        headers: options.headers,
        body: options.body,
    });
    return await (options.json ? res.json() : res.text());
};

export default $;