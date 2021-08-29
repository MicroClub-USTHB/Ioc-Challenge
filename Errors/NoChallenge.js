/**
 * An Error class that get thrown when a challenge hasn't been implemented .
 */
class NoChallenge extends Error {
    /**
     * Create a not implemented method
     * @param {string} message the name of the method that is not implemented
     */
    constructor(message) {
        super(`Challenge not implemented "${message}"`);
    }
}
export default NoChallenge;
