/**
 * An Error class that get thrown when a challenge hasn't been implemented .
 */
class NoChallenge extends Error {
    /**
     * Create a not implemented challenge Error
     * @param {string} message the name of the challenge that is not implemented
     */
    constructor(message = "No challenge has been found") {
        super(`Challenge not implemented "${message}"`);
    }
}
export default NoChallenge;
