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
        text: {
            idle: palette.LIGHT_GRAY,
            active: palette.AUREOLIN_YELLOW,
            hover: palette.WHITE,
        },
        background: palette.JET,
    },
    list: {
        itemBorder: {
            active: palette.AUREOLIN_YELLOW,
        },
        itemText: {
            idle: palette.LIGHT_GRAY,
            active: palette.WHITE,
        },
        sectionTitle: palette.JONQUIL_ORANGE,
    },
    button: {
        text: {
            idle: palette.JET,
            hover: palette.EERIE_BLACK,
        },
        background: {
            idle: palette.JONQUIL_ORANGE,
            hover: palette.AUREOLIN_YELLOW,
        },
    },
    status: {
        // TODO find better colors for palette
        success: 'green',
        error: 'red',
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
