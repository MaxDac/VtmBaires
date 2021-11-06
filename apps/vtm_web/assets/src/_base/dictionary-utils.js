// @flow

/**
 * Tries to translate english error message to italian.
 * This function is called in the notification system to try to translate back end error messages.
 * @param error The error message.
 * @return {string} The translated error message if the translation succeeded, the error itself otherwise.
 */
export const tryTranslateError = (error: string): string => {
    if (error === "name: has already been taken") {
        return "Il nome è già stato preso, prova a mettere anche il cognome del personaggio";
    }

    return error;
};

export const translateAttributeSection = (attributeSection: string): string => {
    switch (attributeSection) {
        case "Physical": return "Fisici";
        case "Mental": return "Mentali";
        default: return "Sociali";
    }
}
