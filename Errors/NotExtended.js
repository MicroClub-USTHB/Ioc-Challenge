/**
 * An Error class that get thrown when an abstract class has been called without extending it.
 */
class NotExtended extends Error {
    /**
     * Create NotExtended Error that Add the layer of abstraction;
     * @param {String} [className=""] the name of the class that has thrown the Error;
     */
    constructor(className = "\b") {
        super(`This ${className} is an abstract class you can't create an instance of it.`);
    }
}
export default NotExtended;
