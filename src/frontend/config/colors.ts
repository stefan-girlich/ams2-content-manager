// src: https://coolors.co/d6d6d6-ffee32-ffd100-202020-333533 ♥️

const palette = {
    WHITE: '#fff',
    LIGHT_GRAY: '#D6D6D6',
    AUREOLIN_YELLOW: '#FFEE32',
    JONQUIL_ORANGE: '#FFD100',
    EERIE_BLACK: '#202020',
    JET: '#333533',
}

const colors = {
    menu: {
        text: palette.LIGHT_GRAY,
        textActive: palette.AUREOLIN_YELLOW,
        textHover: palette.WHITE,
        background: palette.JET,
    },
    common: {
        background: palette.EERIE_BLACK,
        text: palette.WHITE,
        textSecondary: palette.LIGHT_GRAY,
        textHighlighted: palette.AUREOLIN_YELLOW,
        highlightedBackground: palette.JONQUIL_ORANGE,
        textOnHighlightedBackground: palette.JET,
    },
}

export default colors
