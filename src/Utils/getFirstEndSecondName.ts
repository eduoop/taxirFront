export default (name: string) => {
    if (name.split(' ').length > 2) {
        return `${name.split(' ')[0]} ${name.split(' ')[1]}`
    } else {
        return name
    }
}