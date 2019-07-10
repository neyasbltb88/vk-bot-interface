export default class Launcher {
    running = false;
    wasStopped = false;
    tryNum = 0;

    constructor(props = {}) {
        this.condition = props.condition || true;
        this.callback = props.callback || console.log.bind(this, 'В Laucher не передан callback');
        this.arg = props.arg;
        this.attempts = props.attempts || Infinity;

        if (props.autoRun) this.run();
    }

    launch = () => {
        if (!this.condition.call(this) && this.tryNum < this.attempts && !this.wasStopped) {
            this.tryNum++;

            requestAnimationFrame(this.launch);
        } else if (this.condition.call(this) && this.tryNum < this.attempts && !this.wasStopped) {
            this.stop();
            this.callback(this.arg);
        } else if (this.tryNum >= this.attempts && !this.wasStopped) {

            this.stop();
        } else if (this.wasStopped) {}
    }

    run = (arg) => {
        if (this.running) return;
        if (arg !== undefined) this.arg = arg;

        this.running = true;
        this.wasStopped = false;
        this.launch();

        return true;
    }

    stop = () => {
        if (!this.running) return;

        this.wasStopped = true;
        this.running = false;
        this.tryNum = 0;

        return true;
    }
}