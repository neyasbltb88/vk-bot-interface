export default class Launcher {
    running = false;
    wasStopped = false;
    tryNum = 0;

    /*  props = {
     *       condition:  @Function: должна проверять условие, необходимое для вызова callback и возвращать boolean.
     *       callback:   @Function: вызовется когда condition вернет true.
     *       arg:        @Any: один аргумент, который передастся в callback при его вызове. Необязательный.
     *       attempts:   @Number: количество попыток для проверки условия. Необязательный. 
     *                   Если не пердан, проверка будет бесконечной, пока condition не вернет true или не будет вызван метод остановки .stop()
     *   } */
    constructor(props = {}) {
        this.condition = props.condition || true;
        this.callback = props.callback || console.log.bind(this, 'В Laucher не передан callback');
        this.arg = props.arg;
        this.attempts = props.attempts || Infinity;

        if (props.autoRun) this.run();
    }

    launch = () => {
        // Если функция условия вернула true, тормозим рекурсию и выззываем callback
        if (this.condition.call(this)) {
            this.stop();
            this.callback(this.arg);

            // Если функция условия вернула false, количество попыток не исчерпано и не остановлена рекурсия,
            // то увеличиваем счетчик попыток и планируем очередной запуск 
        } else if (!this.condition.call(this) && this.tryNum < this.attempts && !this.wasStopped) {
            this.tryNum++;
            requestAnimationFrame(this.launch);

            // Если количество попыток исчерпано, тормозим рекурсию
        } else if (this.tryNum >= this.attempts) {
            this.stop();
        }
    }

    // Запуск рекурсивной проверки условия
    run = (arg) => {
        if (this.running) return;
        if (arg !== undefined) this.arg = arg;

        this.running = true;
        this.wasStopped = false;
        this.launch();

        return true;
    }

    // Остановка рекурсивной проверки условия
    stop = () => {
        if (!this.running) return;

        this.wasStopped = true;
        this.running = false;
        this.tryNum = 0;

        return true;
    }
}