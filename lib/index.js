class SimpleJQuery {
    constructor(input) {
        if (typeof input == 'string') {
            this.elements = document.querySelectorAll(input)
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

    text(value) {
        if (value) {
            this.elements.forEach(el => el.innerText = value)
            return this;
        }

        return this.elements[0] ? this.elements[0].innerText : null;
    }

    show() {
        this.elements.forEach(el => el.style.display = 'block');
    }

    hide() {
        this.elements.forEach(el => el.style.display = 'none');
    }

    on(eventName, target, callback) {
        if (!eventName) {
            throw new Error('Missing eventName');
        }

        if (!target) {
            throw new Error('Missing target or callback');
        }

        if (!callback) {
            callback = target;
            target = null;
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


export default function $(input) {
    return new SimpleJQuery(input)
};