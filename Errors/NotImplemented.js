/**
 * An Error class that get thrown when an abstract method has been called without re-implementing it.
 */
class NotImplemented extends Error {
    /**
     * Create a not implemented method
     * @param {string} message the name of the method that is not implemented
     */
    constructor(message) {
        super(`Method not implemented "${message}"`);
    }
}
export default NotImplemented;
