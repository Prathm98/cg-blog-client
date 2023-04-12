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
    let res = `${dt.getDate()} ${months[dt.getMonth()]}, ${dt.getFullYear()} -
         ${dt.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
    return res;
}

export const getFirstChar = (value) => {
    return (value[0]+"").toLocaleUpperCase()
}

export const truncateText = (content) => {
    if(content.length > 100) return content.substr(0, 100) + "...";
    return content;
}