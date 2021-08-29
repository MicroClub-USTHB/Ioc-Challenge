/**
 * @typedef {Number|String} NS
 */
/**
 * @typedef {object} I_O the inputs and the output of the challenge to be set if its already generated.
 * @property {any[]} [inputs] the inputs of the challenge to be set if its already generated.
 * @property {NS} [output] the output of the challenge to be set if its already generated.
 */
/**
 * @typedef {object} Result
 * @property {string} message
 * @property {boolean} result
 */
/**
 * An Error class that get thrown when an abstract method has been called without re-implementing it.
 */
class NotImplemented extends Error {
    /**
     * Create a not implemented method
     * @param {string} message the name of the method that is not implemented
     */
    constructor(message = "") {
        super(`Method not implemented "${message}"`);
    }
}
/**
 * An Error class that get thrown when an abstract class has been called without extending it.
 */
class NotExtended extends Error {
    /**
     * Create NotExtended Error that Add the layer of abstraction;
     * @param {String} className the name of the class that has thrown the Error;
     */
    constructor(className = "\b") {
        super(`This ${className} is an abstract class you can't create an instance of it.`);
    }
}
/**
 * An abstract Class representing the base challenge that allow us create uniformed challenges
 * @property {Boolean} [_InputGenerated=false] check if the input has been assigned
 * @property {Boolean} [_OutputGenerated=false] check if the output has been assigned
 * @property {any[]} [_Inputs=[]] the input of the challenge
 * @property {NS} [_Output=0] the output of the challenge
 */
class Challenge {
    _InputGenerated = false;
    _OutputGenerated = false;
    _Inputs = [];
    _Output = 0;
    /**
     * Create a challenge that randomly create a number of inputs with size between [MinInput,MaxInput] if you don't provide a set of inputs before. and then create the output corresponded to the input generated or set.
     * @param {I_O} [I_O={}] the inputs and the output of the challenge to be set if its already generated.
     * @param {Number} [MinInput=100] minimum number of inputs to generate.
     * @param {Number} [MaxInput=150] maximum number of inputs to generate.
     */
    constructor({ inputs, output } = {}, MinInput = 100, MaxInput = 150) {
        if (this.constructor === Challenge) throw new NotExtended("Challenge");
        if (inputs) this.#SetInput(inputs);
        else this.InputGenerator(this.Random(MinInput, MaxInput));
        if (output) this.#SetOutput(output);
        else this.OutputGenerator();
    }
    /**
     * Random : Creates a random number in [min,max] range
     * @param {Number} minmax the minimum of the Random number if max exist else its the maximum and the min became 0
     * @param {Number}  [max] the maximum of the Random number
     * @returns {Number} a Random integer number between [min,max]
     */
    Random(minmax, max) {
        if (max) return Math.round(Math.random() * (max - minmax)) + minmax;
        else return Math.round(Math.random() * minmax);
    }
    /**
     * abstract method to remake when extended made for Generating Inputs for the challenges
     * @param {Number} InputNum Number of inputs to generate
     * @abstract
     * @throws {NotImplemented} throws an error if this method not re-implemented after extending.
     * @returns {void}
     */
    InputGenerator(InputNum) {
        throw new NotImplemented("InputGenerator");
    }
    /**
     * a private method to set the input of the challenges
     * @param {Number} inputs to set in the challenge to get the corresponded output
     */
    #SetInput(inputs) {
        if (!this._InputGenerated) {
            this._Inputs = inputs;
            this._InputGenerated = true;
        }
    }
    /**
     * a private method to set the output of the challenges
     * @param {Number} output to set in the challenge to compare the Answers
     */
    #SetOutput(output) {
        if (!this._OutputGenerated) {
            this._Output = output;
            this._OutputGenerated = true;
        }
    }
    /**
     * this method checks if the answer given is the correct one
     * @param {NS} answer the answer of the challenger
     * @returns {Result} the message and the result of the answer
     */
    CheckOutput(answer) {
        if (!this._OutputGenerated) this.OutputGenerator();
        let b = answer === this._Output;
        return {
            message: b
                ? "Correct answer"
                : typeof this._Output === "string"
                ? "Not Correct Try Again"
                : this._Output > output
                ? "Answer is Lower than what we expected."
                : "Answer is higher than what we expected.",
            result: b,
        };
    }
    /**
     * an abstract method to remake when extended made for Generating an Output for the challenges
     * @abstract
     * @throws {NotImplemented} throws an error if this method not re-implemented after extending.
     * @returns {void}
     */
    OutputGenerator() {
        throw new NotImplemented("OutputGenerator");
    }
    /**
     * an abstract method to remake when extended made for Generating text version of the inputs for the challenges
     * @abstract
     * @throws {NotImplemented} throws an error if this method not re-implemented after extending.
     * @returns {String} the inputs in a string form to be sent to the challenger.
     */
    GetInputs() {
        throw new NotImplemented("GetInputs");
    }
}

export default Challenge;
