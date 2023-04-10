export const isValidTextField = (value) => {
   return (value !== undefined && value !== null && value.trim().length !== 0)
}

export const isValidUsername = (value) => {
    return (/^[a-z0-9_]+$/i).test(value);
}

export const isValidEmail = (value) => {
    // eslint-disable-next-line
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) return true;
    return false;
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const formatDate = (value) => {
    let dt = new Date(value);
    let res = `${dt.getDate()} ${months[dt.getMonth()]}, ${dt.getFullYear()}`;
    return res;
}