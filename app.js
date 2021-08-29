/**
 * An abstract Class representing the base challenge that allow us create uniformed challenges
 * @property {Boolean} [_InputGenerated=false]
 * @property {Boolean} [_OutputGenerated=false]
 * @property {[*]} [_Inputs=[]]
 * @property {Number} [_Output=0]
 */
export default class Challenge {
    _InputGenerated = false;
    _OutputGenerated = false;
    _Inputs = [];
    _Output = 0;
    /**
     * Create a challenge that randomly create a number of inputs with size between [MinInput,MaxInput] if you don't provide a set of inputs before. and then create the output corresponded to the input generated or set.
     * @param {I_O} [I_O={}]
     * @param {Number} [MinInput=100] minimum number of inputs to generate
     * @param {Number} [MaxInput=150] maximum number of inputs to generate
     */
    constructor({ inputs, output } = {}, MinInput = 100, MaxInput = 150) {
        if (inputs) this.#SetInput(inputs);
        else this.InputGenerator(this.Random(MinInput, MaxInput));
        if (output) this.#SetOutput(output);
        else this.OutputGenerator();
    }
    /**
     * Random : Creates a random number in [min,max] range
     * @param {Number} min
     * @param {Number}  [max]
     * @returns {Number} a Random integer number between [min,max]
     */
    Random(min, max) {
        if (max) return Math.round(Math.random() * (max - min)) + min;
        else return Math.round(Math.random() * min);
    }
    /**
     * abstract Function to remake when extended made for Generating Inputs for the challenges
     * @param {Number} InputNum Number of inputs to generate
     */
    InputGenerator(InputNum) {
        throw Error("Not implemented");
    }
    /**
     * a function to set the input of the challenges
     * @param {Number} inputs to set in the challenge to get the corresponded output
     */
    #SetInput(inputs) {
        if (!this._InputGenerated) {
            this._Inputs = inputs;
            this._InputGenerated = true;
        }
    }
    /**
     * a function to set the output of the challenges
     * @param {Number} output to set in the challenge to compare the Answers
     */
    #SetOutput(output) {
        if (!this._OutputGenerated) {
            this._Output = output;
            this._OutputGenerated = true;
        }
    }
    /**
     *
     * @param {Number|String} output
     * @returns
     */
    CheckOutput(output) {
        if (!this._OutputGenerated) this.OutputGenerator();
        let b = output === this._Output;
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
     * abstract Function to remake when extended made for Generating an Output for the challenges
     */
    OutputGenerator() {
        throw Error("Not implemented");
    }
}
