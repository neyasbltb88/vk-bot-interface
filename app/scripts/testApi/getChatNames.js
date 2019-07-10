export default function getChatNames() {
    return new Promise(resolve => {
        let names = [
            'БОТ',
            'Кодеры, программисты и верстальщики'
        ];
        setTimeout(() => resolve(JSON.stringify(names)), 1000)
    })
}