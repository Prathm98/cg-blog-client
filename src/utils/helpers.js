// Validates text field
export const isValidTextField = (value) => {
   return (value !== undefined && value !== null && value.trim().length !== 0)
}

// Validated username
export const isValidUsername = (value) => {
    return (/^[a-z0-9_]+$/i).test(value);
}

// Validated email adress
export const isValidEmail = (value) => {
    // eslint-disable-next-line
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) return true;
    return false;
}

// Month array to get formatted date
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// Formates date into required format
export const formatDate = (value) => {
    let dt = new Date(value);
    let res = `${dt.getDate()} ${months[dt.getMonth()]}, ${dt.getFullYear()} -
         ${dt.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
    return res;
}

// Returns first character of username
export const getFirstChar = (value) => {
    return (value[0]+"").toLocaleUpperCase()
}

// Truncates text 
export const truncateText = (content) => {
    if(content.length > 100) return content.substr(0, 100) + "...";
    return content;
}