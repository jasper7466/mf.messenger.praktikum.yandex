import { assert } from "chai"
import xssEscape from "./xssEscape";

describe('xssEscape: Black Box Testing', () => {
    it('Экранирование тега <script>', () => {
        assert.strictEqual(
            xssEscape('<SCRIPT SRC=xss.js></SCRIPT>'),
            '&lt;SCRIPT SRC=xss.js&gt;&lt;/SCRIPT&gt;'
        );
    });
});
