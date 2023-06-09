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
    modal: {
        backdrop: 'rgba(10, 10, 10, 0.9)', // TODO "transparentize(palette.EERIE_BLACK)"
        background: palette.EERIE_BLACK,
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
    inputField: {
        text: {
            idle: palette.LIGHT_GRAY,
            active: palette.AUREOLIN_YELLOW,
            selected: palette.EERIE_BLACK,
            selectedOutline: palette.JONQUIL_ORANGE,
        },
        border: {
            idle: palette.LIGHT_GRAY,
            active: palette.AUREOLIN_YELLOW,
        },
        background: {
            idle: palette.EERIE_BLACK,
            active: palette.JET,
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
        textLabel: palette.JONQUIL_ORANGE,
        textHighlighted: palette.AUREOLIN_YELLOW,
        highlightedBackground: palette.JONQUIL_ORANGE,
        textOnHighlightedBackground: palette.JET,
    },
}

export default colors
