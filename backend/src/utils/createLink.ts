

export const createLink = (len: number) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length = characters.length;
  let link_string = ''
  // console.log(length)
  // console.log('link:', Math.floor(Math.random() * length))
  for (let i = 0; i < len; i++){
    link_string=link_string + characters[Math.floor((Math.random() * length))];
  }
  // console.log('link_string: ', link_string);

  return link_string;
}