/**
 * This JavaScript file contains foo bar baz...
 *
 * @projectname impact-of-code
 * @version 1.0.8
 * @author shirogin
 * @copyright 2021
 */
import NotExtended from "./Errors/NotExtended.js";
import NotImplemented from "./Errors/NotImplemented.js";
/**
 * @typedef {Number|String} NS
 */
/**
 * @typedef {object} I_O the inputs and the output of the challenge to be set if its already generated.
 * @property {any[]} [inputs] the inputs of the challenge to be set if its already generated.
 * @property {NS} [output] the output of the challenge to be set if its already generated.
 */
/**
 * Enum Answers values
 * @enum {string}
 */
const Answers = {
    /** this message get send when the challenger submit the correct answer. */
    Correct: "Correct answer",
    /** this message get send when the challenger submit the wrong string answer. */
    Wrong: "Not Correct Try Again",
    /** this message get send when the challenger submit lower number as an answer. */
    Lower: "Answer is Lower than what we expected.",
    /** this message get send when the challenger submit higher number as an answer. */
    Higher: "Answer is higher than what we expected.",
};
/**
 * @typedef {object} Result
 * @property {Answers} message a message to be sent to the challenger so he can understand the result
 * @property {boolean} result a boolean to be sent with the message so it helps the client renderer to show the message correctly
 */

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
    _type = "string";
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
    InputsGenerator(InputNum) {
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
        if (answer == this._Output) return { message: Answers.Correct, result: true };
        else if (this._type === "number")
            return { message: this._Output > answer ? Answers.Lower : Answers.Higher, result: false };
        return { message: Answers.Wrong, result: false };
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

import NoChallenge from "./Errors/NoChallenge.js";
/**
 * @typedef {object} ChallengesT list of challenges (main/side)
 * @property {Challenge[]} main list of the main challenges
 * @property {Challenge[]} side list of the side challenges
 */
/**
 * list of challenges plugged
 * @type {ChallengesT}
 */
let Challenges = {},
    /**
     * if the challenge is plugged or not
     * @type {boolean}
     */
    imported = false;
/**
 * This function plug the challenges that has been declared out of this package
 * @param {ChallengesT} challenges the challenges to be plugged
 */
function plugChallenges({ main = [], side = [] } = { main: [], side: [] }) {
    Challenges = { main, side };
    if (main.length > 0 || side.length > 0) imported = true;
}
/**
 * Get the challenge using the day and the type of the challenge (main/side)
 * @param {Number} [day=1] this number represents day of the challenge
 * @param {Boolean} [main=true] this boolean represents if the challenge is main or not(side)
 * @returns {undefined|Challenge} the challenge of the day with its type requested if the challenges has been imported;
 * @throws {NoChallenge} throws an error if couldn't get the challenge or the challenges aren't plugged yet.
 */
function GetChallenge(day = 1, main = true) {
    if (imported) {
        const ch = Challenges[main ? "main" : "side"][day - 1];
        if (ch === undefined) throw new NoChallenge(main ? "main" : "side" + " challenge " + (day - 1));
        return ch;
    } else throw new NoChallenge();
}
export { plugChallenges, GetChallenge, NotExtended, NotImplemented, NoChallenge };
