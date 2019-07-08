export default function launcher(params = {}) {
    let { condition, callback, arg, attempts } = params;
    let try_num = 0;

    requestAnimationFrame(function launch(arg) {
        if (!condition.call() && try_num < attempts) {
            try_num++;
            requestAnimationFrame(launch.bind(this, arg));
        } else if (condition.call()) {
            callback.call(this, arg);
        } else {
            // console.log('Превышено количество попыток launcher');
        }
    }.bind(this, arg))
}