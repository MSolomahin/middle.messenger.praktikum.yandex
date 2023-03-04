import Templator from "./templator";
import {expect} from "chai";

describe("Templator", () => {
    const ctx = {
        name: "test",
        isShow: false,
        src: {
            image: {
                url: 'https://ya.ru'
            },
            width: '',
            height: 100,
        },
    }

    describe("Should handle intersection", () => {
        it("positive condition", () => {
            const template = `{% name && <img src="{{ name }}" class="avatar__img"/> %}`

            const result = new Templator(template).compile(ctx)

            expect(result).to.eq('<img src="test" class="avatar__img"/>')
        });

        it("negative condition", () => {
            const template = `{% src.width && <img src="{{ src.width }}" class="avatar__img"/> %}`

            const result = new Templator(template).compile(ctx)

            expect(result).to.eq('')
        });
    })

    describe('Should handle union', () => {
        it("positive condition", () => {
            const template = '{% name || <img src="{{ name }}" class="avatar__img"/> %}'

            const result = new Templator(template).compile(ctx)

            expect(result).to.eq('test')
        });

        it("negative condition", () => {
            const template = '{% isShow || name %}'

            const result = new Templator(template).compile(ctx)

            expect(result).to.eq('test')
        });
    })


    it("Should insert args", () => {
        const template = '{{ src.image.url }}'

        const res = new Templator(template).compile(ctx)

        expect(res).to.eq('https://ya.ru')
    });

    describe("Should handle ternary", () => {
        it("positive condition", () => {
            const template = '{% src.height ? <img src="{{ src.height }}" class="avatar__img"/> : <p></p> %}'

            const result = new Templator(template).compile(ctx)

            expect(result).to.eq('<img src="100" class="avatar__img"/>')
        });

        it("negative condition", () => {
            const template = '{% src.width ? <img src="{{ src.width }}" class="avatar__img"/> : <p></p> %}'

            const result = new Templator(template).compile(ctx)

            expect(result).to.eq('<p></p>')
        });
    })
})
