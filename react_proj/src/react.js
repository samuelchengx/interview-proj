/**
 *
 * @param type
 * @param config
 * @param children
 * @returns {{$$typeof: symbol, type: *, props: {children: *[]}}}
 */
export function createElement(type, config = {}, ...children) {
    return {
        $$typeof: Symbol.for('react.element'),
        type,
        props: {...config, children}
    }
}