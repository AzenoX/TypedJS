class Typed{

    #timeline;

    #blink;
    #printErrors;
    #blinkClasses;
    #blinkSpeed;

    #isWriting;

    constructor(el, options = {}) {
        this.el = el;
        this.#timeline = [];


        //Blink - default: true
        this.#blink = ('blink' in options) ? options.blink : true;

        //Print Errors - default: false
        this.#printErrors = ('printErrors' in options) ? options.printErrors : false;

        //Blink Classes - default: []
        this.#blinkClasses = ('blinkClasses' in options) ? options.blinkClasses : [];

        //Blink Speed - default: 600
        this.#blinkSpeed = ('blinkSpeed' in options) ? options.blinkSpeed : 600;


        this.#isWriting = false;

        this.el.innerText = "";

        return this;
    }


    #_startBlink(){
        let span = document.createElement("span");
        for (const cl in this.#blinkClasses){
            if(this.#blinkClasses.hasOwnProperty(cl)){
                span.classList.add(this.#blinkClasses[cl]);
            }
        }
        span.innerText = '|';
        this.el.appendChild(span);

        let interval = setInterval(() => {
            if(this.#isWriting === true){
                span.style.opacity = "1";
            }
            else{
                span.style.opacity = (span.style.opacity === "0") ? "1" : "0";
            }
        }, this.#blinkSpeed);
    }

    /*
    * str: "Ceci est un texte"
    * style: {color: "red",fontWeight:bold}
    * */

    #_type(el, str, style = {}, delay){
        return new Promise((resolve, reject) => {
            let letters = str.split('');
            let counter = 0;

            if(delay < 0){
                reject("The delay cannot be negative");
                return;
            }

            let interval = setInterval(() => {
                this.#isWriting = true;
                let element = document.createElement("span");

                //Apply styles
                for (const [key, value] of Object.entries(style)){
                    if(style.hasOwnProperty(key)){
                        element.style[key] = value;
                    }
                }

                //Append SPAN to element
                element.innerText = letters[counter];
                el.appendChild(element);

                //Increment and check the end
                counter++;
                if(counter >= letters.length){
                    this.#isWriting = false;
                    resolve();
                    clearInterval(interval);
                }
            },delay);
        })

    }
    type(str, style = {}, delay = 100){
        this.#timeline.push("w^" + str + "///" + JSON.stringify(style) + "///" + delay);

        return this;
    }


    /*
    * delay: Integer (milliseconds)
    * */
    #_pause(delay){
        return new Promise(resolve => setTimeout(resolve, delay));
    }
    pause(delay){
        this.#timeline.push("p^" + delay);

        return this;
    }


    /*
    * length: Integer
    * delay: Integer (milliseconds)
    * */
    #_delete(el, length, delay){
        return new Promise((resolve) => {
            let counter = 0;
            let interval = setInterval(() => {
                this.#isWriting = true;

                //Remove last char
                el.removeChild(el.lastChild);

                //Increment and check the end of the loop
                counter++;
                if(counter > length){
                    this.#isWriting = false;
                    resolve();
                    clearInterval(interval);
                }
            }, delay);
        })
    }
    delete(length, delay = 100){
        this.#timeline.push("d^" + length + "/" + delay);

        return this;
    }



    #start(){
        return new Promise((resolve) => {
            setTimeout(async () => {
                let span = document.createElement("span");
                this.el.appendChild(span);

                if(this.#blink){
                    this.#_startBlink();
                }

                for (const instruction in this.#timeline){
                    if(this.#timeline.hasOwnProperty(instruction)){
                        const action = this.#timeline[instruction].split('^')[0];
                        const value = this.#timeline[instruction].split('^')[1];

                        //Write
                        if(action === "w"){
                            const values = value.split('///');
                            const str = values[0];
                            const style = JSON.parse(values[1]);
                            const delay = values[2];

                            try{
                                await this.#_type(span, str, style, delay);
                            }
                            catch(e){
                                (this.#printErrors) ? console.log(e) : '';
                                throw e;
                            }
                        }

                        //Pause
                        else if(action === "p"){
                            await this.#_pause(value);
                        }

                        //Delete
                        else if(action === "d"){
                            const values = value.split('/');
                            const val = values[0];
                            const delay = values[1];

                            await this.#_delete(span, val, delay);
                        }
                    }
                }

                resolve();
            }, 1)
        })
    }

    run(callback){
        if(callback != null){
            this.#start().then(() => callback());
        }
        else{
            this.#start();
        }
    }

}